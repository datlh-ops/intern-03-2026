import { useEffect, useState } from "react";
import RoomTable from "./components/RoomTable";
import { getAdminRooms, deleteRoomApi } from "../../../api/room.api";
import DeleteConfirmModal from "../../../components/Common/DeleteConfirmModal";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const limit = 10;
    
    const fetchRooms = async (currentPage) => {
        try {
            const res = await getAdminRooms({ page: currentPage, limit, status: 'all' });
            setRooms(res.data.rooms || res.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error("Lỗi khi tải phòng", error);
        }
    };

    useEffect(() => {
        fetchRooms(page);
    }, [page]);

    const handleDeleteClick = (id) => {
        setSelectedRoomId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedRoomId) return;
        try {
            await deleteRoomApi(selectedRoomId);
            fetchRooms(page);
        } catch (error) {
            console.error("Lỗi xóa phòng", error);
            alert("Xóa thất bại!");
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Phòng trọ</h2>
                        <p className="text-sm text-gray-500 mt-1">Hệ thống toàn bộ phòng trọ đang hoạt động</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <RoomTable
                        rooms={rooms}
                        deleteRoom={handleDeleteClick}
                        onEdit={(room) => console.log("Edit room", room)}
                    />
                    
                    {/* Component Phân trang */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-sm text-gray-500">
                            Trang <span className="font-medium text-gray-900">{page}</span> / <span className="font-medium text-gray-900">{totalPages}</span>
                        </span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${page === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                            >
                                Trang trước
                            </button>
                            <button 
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${page === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                            >
                                Trang kế
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Xác nhận xóa phòng?"
                message="Hành động này không thể hoàn tác. Dữ liệu phòng sẽ bị xóa vĩnh viễn khỏi hệ thống."
            />
        </div>
    );
}