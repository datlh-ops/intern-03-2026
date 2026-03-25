import React, { useEffect, useState } from 'react';
import { getContracts, updateContractApi } from '../../../api/contract.api';
import ContractTable from './components/ContractTable';
import './master-contracts.css';

export default function MasterContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const res = await getContracts();
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleAction = async (id, status, message) => {
    if (window.confirm(message)) {
      try {
        await updateContractApi(id, { status });
        alert('Cập nhật trạng thái hợp đồng thành công!');
        fetchContracts();
      } catch (err) {
        alert(err.response?.data?.error || 'Lỗi khi cập nhật hợp đồng');
      }
    }
  };

  return (
    <div className="master-contracts-page">
      <div className="master-header-section">
        <h2 className="master-heading">Xét duyệt Hợp Đồng</h2>
        <p className="master-subheading">Quản lý các yêu cầu thuê phòng và hợp đồng đang ký kết.</p>
      </div>

      {loading ? (
        <p className="loading-text">Đang tải danh sách hợp đồng...</p>
      ) : (
        <ContractTable 
          contracts={contracts} 
          onAction={handleAction} 
        />
      )}
    </div>
  );
}
