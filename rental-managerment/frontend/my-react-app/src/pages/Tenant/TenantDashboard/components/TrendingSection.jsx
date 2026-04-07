import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TrendingSection = ({ rooms, page, totalPages, onPageChange }) => {
    const navigate = useNavigate();

    return (
        <section className="space-y-10">
            <div className="flex justify-between items-end px-2">
                <div>
                    <div className="flex items-center gap-2 text-rose-500 mb-2">
                        <LocalFireDepartmentIcon className="text-xl" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Hệ thống đề xuất</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        PHÒNG <span className="text-emerald-600 underline decoration-4 underline-offset-4">SĂN ĐÓN</span> NHẤT
                    </h2>
                </div>
            </div>

            {/* Grid Layout: Hiển thị 5 cột trên màn hình rộng (xl) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {rooms && rooms.map(room => (
                    <div
                        key={room.id}
                        onClick={() => navigate(`/user/rooms/${room.id}`)}
                        className="group cursor-pointer bg-white rounded-[24px] border border-slate-50 shadow-lg shadow-slate-200/20 overflow-hidden hover:-translate-y-1.5 transition-all duration-500"
                    >
                        {/* Thu nhỏ h-48 thành h-40 */}
                        <div className="relative h-40 overflow-hidden">
                            <img 
                                src={room.thumbnail} 
                                alt={room.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute top-3 left-3 flex gap-1.5">
                                <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-900 font-black text-[8px] uppercase shadow-lg">
                                    {room.district}
                                </span>
                            </div>
                        </div>
                        {/* Giám padding content xuống p-4 */}
                        <div className="p-4">
                            <h3 className="text-[12px] font-black text-slate-800 mb-2.5 group-hover:text-emerald-600 transition-colors truncate uppercase tracking-tight leading-tight">
                                {room.title}
                            </h3>
                            <div className="flex justify-between items-end">
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Giá thuê</p>
                                    <p className="text-lg font-black text-emerald-600 tracking-tighter">
                                        {new Intl.NumberFormat('vi-VN').format(room.price)} 
                                        <span className="text-[9px] text-slate-300 font-black ml-0.5 uppercase">/Tháng</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang Center */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 pt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ArrowBackIosIcon sx={{ fontSize: 14 }} />
                    </button>
                    
                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">
                        Trang {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default TrendingSection;
