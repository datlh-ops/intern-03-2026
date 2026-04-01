import UserSidebar from "../Navigation/UserSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserLayout() {
  const navigate = useNavigate();
  const { userProfile: user, logoutContext } = useAuth();

  const handleLogout = () => {
    logoutContext();
    navigate("/login");
  };

  if (!user) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs">
      Đang tải dữ liệu khách thuê...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for Tenant */}
      <UserSidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        {/* Simple Header for Tenant */}
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold ring-4 ring-blue-50">
               {user.username?.charAt(0).toUpperCase()}
             </div>
             <h1 className="text-sm font-bold text-slate-800 tracking-tight">👋 Chào mừng, {user.username}!</h1>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          >
            <LogoutIcon fontSize="small" />
            Đăng xuất
          </button>
        </header>

        {/* Main Workspace */}
        <main className="p-8 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
