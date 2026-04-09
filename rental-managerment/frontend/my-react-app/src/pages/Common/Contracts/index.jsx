import React, { useEffect, useState } from 'react';
import { getContracts, updateContractApi, deleteContractApi } from '../../../api/contract.api';
import ContractTable from './components/ContractTable';
import toast from 'react-hot-toast';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteConfirmModal from '../../../components/Common/DeleteConfirmModal';
import ContractModal from '../../../components/Common/Contracts/ContractModal';
import { useAuth } from '../../../context/AuthContext';

export default function SharedContractsPage() {
  const { userProfile } = useAuth();
  const userRole = userProfile?.role || 'user';
  const [contracts, setContracts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [viewerModal, setViewerModal] = useState({
    isOpen: false,
    contract: null
  });

  const fetchContracts = async (currentPage) => {
    try {
      const res = await getContracts({ page: currentPage, limit });
      setContracts(res.data.contracts || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error('Không thể tải danh sách hợp đồng');
    }
  };

  useEffect(() => {
    fetchContracts(page);
  }, [userRole, page]);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    status: null,
    title: '',
    message: ''
  });

  const handleAction = (id, status, message) => {
    setConfirmModal({
      isOpen: true,
      id,
      status,
      title: status === null ? 'Hủy yêu cầu thuê?' : status === 2 ? 'Từ chối hợp đồng?' : 'Xác nhận xử lý?',
      message: message
    });
  };

  const executeAction = async () => {
    const { id, status } = confirmModal;
    try {
      if (status === null) {
        await deleteContractApi(id);
        toast.success('Đã hủy yêu cầu thuê phòng');
      } else {
        await updateContractApi(id, { status });
        const successMsg = status === 1 ? 'Hợp đồng đã được kích hoạt!' : 'Đã từ chối hợp đồng';
        toast.success(successMsg);
      }
      fetchContracts(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Lỗi khi cập nhật hợp đồng');
    } finally {
      setConfirmModal({ ...confirmModal, isOpen: false });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-10 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
              <AssignmentIcon />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none mb-1">
                Quản lý Hợp đồng
              </h2>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] leading-none">
                {userRole === 'master' ? 'XÉT DUYỆT CÁC YÊU CẦU THUÊ PHÒNG' : 'THEO DÕI CÁC HỢP ĐỒNG HIỆN CÓ'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ContractTable
          contracts={contracts}
          role={userRole}
          onAction={handleAction}
          onView={(contract) => setViewerModal({ isOpen: true, contract })}
        />

        {/* Phân trang */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Trang <span className="text-slate-900">{page}</span> / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${page === 1 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95'}`}
            >
              Trước
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${page === totalPages ? 'bg-slate-50 text-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 active:scale-95'}`}
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>

      {/* Contract Detail Modal (Shared) */}
      <ContractModal
        isOpen={viewerModal.isOpen}
        onClose={() => setViewerModal({ ...viewerModal, isOpen: false })}
        contract={viewerModal.contract}
        role={userRole}
        onAction={handleAction}
        onSuccess={() => {
          fetchContracts();
          setViewerModal({ ...viewerModal, isOpen: false });
        }}
      />

      {/* Shared Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={executeAction}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}
