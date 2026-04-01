import React from "react";
import { useAuth } from "../../../context/AuthContext";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function MasterDashboard() {
  const { userProfile: user } = useAuth();

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      {/* Welcome & Global Actions */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-xl inline-block mb-2 text-blue-600 font-black">Tháng 04 / 2026</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">Chào mừng quay lại {user?.username || ''}</h1>
          <p className="text-slate-500 font-medium ml-1">Đây là dữ liệu tài sản của bạn trong 30 ngày qua.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
            <CalendarMonthIcon fontSize="small" />
            Tháng này
          </button>
          <button className="px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-3 hover:bg-blue-800 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
            <FileDownloadIcon fontSize="small" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Main Statistics Group - Expanded to full width to align with header buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

        {/* Card 1: Revenue - Blue Background */}
        <div className="h-[249px] p-8 rounded bg-blue-600 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-500/10">
          <div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6 text-white font-black">
              <BusinessCenterIcon fontSize="small" />
            </div>
            <p className="text-[11px] font-black opacity-70 uppercase tracking-widest">Doanh thu hàng tháng</p>
          </div>
          <div className="flex items-end justify-between relative z-10">
            <h2 className="text-5xl font-black tracking-tighter leading-none">21,450,000đ</h2>
            <span className="text-[11px] font-black bg-white/20 px-3 py-1.5 rounded-lg mb-1">+12.4%</span>
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none text-white overflow-hidden">
            <BusinessCenterIcon style={{ fontSize: '160px' }} />
          </div>
        </div>

        {/* Card 2: Occupancy - White Background with Progress */}
        <div className="h-[249px] p-8 rounded bg-white border border-slate-100 flex flex-col justify-between shadow-sm shadow-slate-200/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tỷ lệ lấp đầy</p>
              <h2 className="text-5xl font-black text-slate-800 tracking-tighter mt-1 leading-none">92.8%</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[92.8%] rounded-full shadow-lg shadow-blue-500/20"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">Hiện tại</span>
              <span className="text-slate-900 italic">42/45 Phòng</span>
            </div>
          </div>
        </div>

        {/* Card 3: Notifications - Red Background */}
        <div className="h-[249px] p-8 rounded bg-rose-50 border border-rose-100 flex flex-col justify-between shadow-sm shadow-rose-200/5">
          <div className="flex items-center gap-3 text-rose-700 font-bold">
            <div className="w-8 h-8 rounded bg-rose-100 flex items-center justify-center font-black">!</div>
            <p className="text-[11px] font-black uppercase tracking-widest text-rose-700">Thông báo quan trọng</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-rose-900 tracking-tight leading-tight">2 hợp đồng sắp hết hạn</h3>
          </div>
          <button className="text-[11px] font-black text-rose-900 uppercase tracking-widest text-left hover:underline decoration-2 underline-offset-8">
            Xem hợp đồng →
          </button>
        </div>

      </div>


    </div>
  );
}
