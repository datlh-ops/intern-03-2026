import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { userProfile, logoutContext } = useAuth();
  const user = userProfile;

  const handleLogout = async () => {
    await logoutContext();
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hệ thống tổng hợp</p>
        <h1 className="text-sm font-bold text-slate-800">Cổng quản trị Administrator</h1>
      </div>
      
      {user && (
        <div className="flex items-center gap-6">
          <div className="text-right">
             <span className="block text-sm font-black text-slate-900 leading-none">Admin: {user.username}</span>
             <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Root Access</span>
          </div>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95" 
            onClick={handleLogout}
          >
            <LogoutIcon fontSize="small" />
            Đăng xuất
          </button>
        </div>
      )}
    </header>
  );
}
