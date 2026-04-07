import React from 'react';

const PromoBanner = () => {
    return (
        <section className="bg-slate-900 rounded-[60px] p-20 relative overflow-hidden text-center flex flex-col items-center shadow-2xl shadow-slate-900/40 group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full group-hover:bg-emerald-600/30 transition-all duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-emerald-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-xl shadow-emerald-900/20">
                    Độc quyền tháng này
                </div>
                
                <h2 className="text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1] max-w-3xl uppercase italic">
                    ƯU ĐÃI <span className="text-emerald-500">SIÊU KHỦNG</span> <br /> CHO NGƯỜI THUÊ MỚI
                </h2>
                
                <p className="text-slate-400 font-bold text-lg mb-12 max-w-xl leading-relaxed">
                    Giảm ngay <span className="text-white">1,000,000 VNĐ</span> cho tháng thuê đầu tiên và miễn phí dịch vụ dọn dẹp tháng đầu. Chỉ còn 12 suất ưu đãi!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <button className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                        Lấy mã ưu đãi: HUB2026
                    </button>
                    <button className="bg-slate-800 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-700 transition-all border border-slate-700">
                        Chi tiết chương trình
                    </button>
                </div>
            </div>
            
            {/* Decor Elements */}
            <div className="absolute top-20 left-20 text-white/5 font-black text-9xl select-none rotate-12">RENTAL</div>
            <div className="absolute bottom-10 right-20 text-white/5 font-black text-9xl select-none -rotate-12">HUB</div>
        </section>
    );
};

export default PromoBanner;
