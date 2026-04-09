import { useEffect, useState } from "react";
import RoomTable from "./components/RoomTable";

import { getAdminRooms, deleteRoomApi, exportAdminRoomsApi } from "../../../api/room.api";
import DeleteConfirmModal from "../../../components/Common/DeleteConfirmModal";
import { Search, Filter, FileSpreadsheet, RefreshCcw } from "lucide-react";


export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [activeFilters, setActiveFilters] = useState({
        status: 'all',
        search: '',
        city: 'Chọn Tỉnh/Thành',
        district: 'Chọn Quận/Huyện'
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);


    const [isExporting, setIsExporting] = useState(false);
    const limit = 10;



    const fetchRooms = async (currentPage) => {
        try {
            const res = await getAdminRooms({
                page: currentPage,
                limit,
                ...activeFilters
            });
            setRooms(res.data.rooms || res.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error("Lỗi khi tải phòng", error);
        }
    };

    useEffect(() => {
        fetchRooms(page);
    }, [page, activeFilters]);


    // Fetch tỉnh thành
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await fetch('https://provinces.open-api.vn/api/p/');
                const data = await res.json();
                setProvinces(data);
            } catch (err) {
                console.error("Lỗi fetch tỉnh thành:", err);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch quận huyện khi tỉnh thay đổi (Vẫn giữ local state cho cái này vì nó cần logic phụ thuộc)
    const [selectedCity, setSelectedCity] = useState('Chọn Tỉnh/Thành');

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedCity === 'Chọn Tỉnh/Thành') {
                setDistricts([]);
                return;
            }
            try {
                const province = provinces.find(p => p.name === selectedCity);
                if (province) {
                    const res = await fetch(`https://provinces.open-api.vn/api/p/${province.code}?depth=2`);
                    const data = await res.json();
                    setDistricts(data.districts || []);
                }
            } catch (err) {
                console.error("Lỗi fetch quận huyện:", err);
            }
        };
        fetchDistricts();
    }, [selectedCity, provinces]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const formData = new FormData(e.target);
        const newFilters = {
            search: formData.get('search'),
            status: formData.get('status'),
            city: formData.get('city'),
            district: formData.get('district')
        };
        setPage(1);
        setActiveFilters(newFilters);
    };

    const handleReset = (e) => {
        const form = e.target.closest('form');
        if (form) form.reset();
        setSelectedCity('Chọn Tỉnh/Thành');
        const defaultFilters = { status: 'all', search: '', city: 'Chọn Tỉnh/Thành', district: 'Chọn Quận/Huyện' };
        setPage(1);
        setActiveFilters(defaultFilters);
    };


    const handleExport = async () => {
        try {
            setIsExporting(true);
            const response = await exportAdminRoomsApi(activeFilters);


            // Download logic
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Rooms_Export_${new Date().toLocaleDateString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Lỗi khi xuất file Excel:", error);
            alert("Xuất file thất bại!");
        } finally {
            setIsExporting(false);
        }
    };


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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Phòng trọ</h2>
                        <p className="text-sm text-gray-500 mt-1">Hệ thống toàn bộ phòng trọ đang hoạt động</p>
                    </div>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {isExporting ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                        Xuất Excel
                    </button>
                </div>

                {/* Section Bộ lọc */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            defaultValue={activeFilters.search}
                            placeholder="Tìm số phòng, tiêu đề..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    <select
                        name="status"
                        defaultValue={activeFilters.status}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="0">Còn trống</option>
                        <option value="1">Đã thuê</option>
                        <option value="2">Đang chờ duyệt</option>
                        <option value="3">Bảo trì</option>
                    </select>

                    <select
                        name="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    >
                        <option value="Chọn Tỉnh/Thành">Tất cả Tỉnh/Thành</option>
                        {provinces.map(p => (
                            <option key={p.code} value={p.name}>{p.name}</option>
                        ))}
                    </select>

                    <select
                        name="district"
                        defaultValue={selectedCity === 'Chọn Tỉnh/Thành' ? 'Chọn Quận/Huyện' : ''}
                        disabled={selectedCity === 'Chọn Tỉnh/Thành'}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium disabled:opacity-50"
                    >
                        <option value="Chọn Quận/Huyện">Tất cả Quận/Huyện</option>
                        {districts.map(d => (
                            <option key={d.code} value={d.name}>{d.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md"
                    >
                        <Filter className="w-4 h-4" />
                        Lọc tin
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Đặt lại bộ lọc"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>

                </form>

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