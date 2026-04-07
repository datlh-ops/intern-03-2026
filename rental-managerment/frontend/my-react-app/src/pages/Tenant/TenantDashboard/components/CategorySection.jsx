import React from 'react';

const CategorySection = () => {
    const categories = [
        { icon: '🏢', label: 'Căn hộ Studio', desc: 'Nhỏ gọn & Hiện đại' },
        { icon: '🤝', label: 'Phòng ghép', desc: 'Tiết kiệm chi phí' },
        { icon: '💎', label: 'Dulux / Cao cấp', desc: 'Trải nghiệm đỉnh cao' },
        { icon: '🏰', label: 'Nhà nguyên căn', desc: 'Tự do & Riêng tư' },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
                <div 
                    key={i} 
                    className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 cursor-pointer flex items-center gap-6"
                >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-emerald-50 group-hover:scale-110 transition-all duration-500">
                        {cat.icon}
                    </div>
                    <div>
                        <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight text-sm">
                            {cat.label}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {cat.desc}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CategorySection;
