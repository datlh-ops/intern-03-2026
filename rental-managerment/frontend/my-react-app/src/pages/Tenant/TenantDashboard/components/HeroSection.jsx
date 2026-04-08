import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[500px] rounded overflow-hidden shadow-2xl shadow-emerald-200/50 group">
            <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600"
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-center px-16 text-white">
                <div className="flex items-center gap-2 mb-6 animate-in slide-in-from-left duration-700">
                    <div className="w-10 h-1px bg-emerald-400"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Nền tảng thuê phòng trực tuyến</span>
                </div>
                <h1 className="text-7xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic animate-in slide-in-from-left duration-1000">
                    TÌM <span className="text-emerald-400 underline decoration-8 underline-offset-8">PHÒNG TỐT</span> <br /> GIÁ HỢP LÍ
                </h1>
                <p className="max-w-md text-slate-300 font-medium mb-10 leading-relaxed text-sm animate-in slide-in-from-left duration-1000">
                    Tìm kiếm phòng trọ với thông tin minh bạch, xác thực và các chương trình ưu đãi độc quyền chỉ dành cho thành viên RentalHub.
                </p>
                <div className="flex gap-4 animate-in fade-in duration-1000 delay-500">
                    <button
                        onClick={() => navigate('/user/rooms')}
                        className="bg-emerald-600 hover:bg-emerald-700 px-10 py-5 rounded font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/40 active:scale-95 flex items-center gap-2"
                    >
                        Bắt đầu khám phá ngay
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
