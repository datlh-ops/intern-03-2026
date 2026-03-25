import React, { useEffect, useState } from 'react';
import { getContracts, deleteContractApi } from '../../../api/contract.api';
import ContractTable from './components/ContractTable';
import './tenant-contracts.css';

export default function TenantContracts() {
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

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn hủy yêu cầu này?')) {
      try {
        await deleteContractApi(id);
        fetchContracts();
      } catch (e) {
        alert('Lỗi khi hủy yêu cầu');
      }
    }
  };

  return (
    <div className="tenant-contracts-page">
      <h2 className="user-heading">Quản lý Hợp đồng của tôi</h2>
      <p className="user-subheading">Theo dõi trạng thái các yêu cầu thuê phòng và hợp đồng đang ký kết.</p>

      {loading ? (
        <p className="loading-text">Đang tải danh sách hợp đồng...</p>
      ) : (
        <ContractTable 
          contracts={contracts} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}
