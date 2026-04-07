import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-[1400px] mx-auto pt-16 pb-8 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Cột 1: Brand & Intro */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              Rental<span className="text-emerald-600">Hub</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Nền tảng quản lý và tìm kiếm nhà trọ hàng đầu Việt Nam. Chúng tôi kết nối chủ nhà và người thuê một cách nhanh chóng, minh bạch và an toàn.
            </p>
            <div className="flex gap-4">
              {[<FacebookIcon key="fb" />, <InstagramIcon key="ig" />, <TwitterIcon key="tw" />].map((icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Cột 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dành cho bạn</h3>
            <ul className="space-y-4">
              {['Tìm phòng trọ', 'Hợp đồng của tôi', 'Thông tin cá nhân', 'Lịch sử thanh toán'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors uppercase tracking-tight">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Support */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hỗ trợ</h3>
            <ul className="space-y-4">
              {['Hướng dẫn sử dụng', 'Chính sách bảo mật', 'Điều khoản dịch vụ', 'Câu hỏi thường gặp'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors uppercase tracking-tight">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Newsletter/App */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bản tin</h3>
            <p className="text-sm font-medium text-slate-500">Đăng ký để nhận thông báo về những ưu đãi phòng trọ mới nhất.</p>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Email của bạn..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-5 pr-12 text-sm font-bold outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
              />
              <button className="absolute right-2 top-1.5 w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">
                <SendIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © 2026 RentalHub. Developed by Luu Huu Dat.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600 transition-colors">Privacy Policy</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
