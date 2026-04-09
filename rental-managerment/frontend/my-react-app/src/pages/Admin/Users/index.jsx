import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import { getUsers, deleteUserApi } from "../../../api/user.api";
import DeleteConfirmModal from "../../../components/Common/DeleteConfirmModal";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const limit = 10;
    
    const fetchUsers = async (currentPage) => {
        try {
            const res = await getUsers({ page: currentPage, limit });
            setUsers(res.data.users || res.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedUserId) return;
        try {
            await deleteUserApi(selectedUserId);
            fetchUsers(page);
        } catch (err) {
            console.error(err);
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
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Khách thuê</h2>
                        <p className="text-sm text-gray-500 mt-1">Quản lý thông tin tất cả khách thuê trong hệ thống</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <UserTable
                        users={users}
                        deleteUser={handleDeleteClick}
                        onEdit={(user) => console.log("Edit user", user)}
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
                title="Xác nhận xóa khách thuê?"
                message="Hành động này sẽ xóa vĩnh viễn thông tin khách thuê. Các hợp đồng liên quan cũng có thể bị ảnh hưởng."
            />
        </div>
    );
}