import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import DescriptionIcon from '@mui/icons-material/Description';
import StarsIcon from '@mui/icons-material/Stars';

export default function UserSidebar() {
  const navItems = [
    { to: "/user", icon: <AccountCircleIcon fontSize="small" />, label: "Cá nhân", end: true },
    { to: "/user/rooms", icon: <HotelIcon fontSize="small" />, label: "Dành cho tôi", end: false },
    { to: "/user/contracts", icon: <DescriptionIcon fontSize="small" />, label: "Hợp đồng", end: false },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3 border-b border-slate-50 mb-4">
        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 transition-transform">
          <StarsIcon fontSize="small" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 leading-tight">My Rental</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">Khách thuê</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                end={item.end}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200
                  ${isActive 
                    ? "bg-emerald-50 text-emerald-600 shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                `}
              >
                <div className="opacity-70">{item.icon}</div>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6">
        <div className="bg-emerald-50/50 p-4 rounded-3xl border border-emerald-100/50">
           <p className="text-xs font-bold text-emerald-700">Hỗ trợ 24/7</p>
           <p className="text-[10px] font-medium text-emerald-600/70 leading-relaxed mt-1">Liên hệ chủ nhà ngay nếu có sự cố phòng.</p>
        </div>
      </div>
    </aside>
  );
}
