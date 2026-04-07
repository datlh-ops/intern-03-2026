import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getRoomsByMaster, deleteRoomApi } from '../api/room.api';

export function useMasterRooms(userProfile) {
  // Data State
  const [rooms, setRooms] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, occupied: 0, vacant: 0, pending: 0, maintenance: 0 });

  // Control State
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  // UI State: Delete Modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // 1. Core Fetching Logic
  const fetchRooms = useCallback(async () => {
    if (!userProfile?.id) return;
    try {
      const res = await getRoomsByMaster(userProfile.id, {
        page: currentPage,
        limit: limit,
        status: filterStatus
      });
      const { rooms: data, total, totalPages: pages, stats: dashboardStats } = res.data;
      setRooms(data || []);
      setTotalItems(total || 0);
      setTotalPages(pages || 1);
      setStats(dashboardStats || { total: 0, occupied: 0, vacant: 0, pending: 0, maintenance: 0 });
    } catch (err) {
      console.error("Lỗi fetch rooms:", err);
      toast.error("Không thể tải danh sách phòng.");
    }
  }, [userProfile, currentPage, filterStatus]);

  // Trigger fetch when dependency changes
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // 2. Optimized Filter Change (Prevents double fetch)
  const handleFilterChange = (newStatus) => {
    setFilterStatus(newStatus);
    setCurrentPage(1); // React 18 will batch these updates and trigger fetchRooms only once
  };

  // 3. Delete logic
  const handleConfirmDelete = async () => {
    if (!deleteModal?.id) return;
    try {
      await deleteRoomApi(deleteModal.id);
      toast.success("Đã xóa phòng khỏi hệ thống!");
      fetchRooms();
    } catch (err) {
      toast.error("Xóa thất bại! Vui lòng thử lại.");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  return {
    rooms,
    totalItems,
    totalPages,
    stats,
    filterStatus,
    handleFilterChange,
    currentPage,
    setCurrentPage,
    deleteModal,
    setDeleteModal,
    handleConfirmDelete,
    refreshRooms: fetchRooms
  };
}
