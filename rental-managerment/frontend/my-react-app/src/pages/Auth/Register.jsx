import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { register as registerUser } from "../../service/authService";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema as schema } from '../../schemas/auth.schema';
import Toast from '../../components/Common/Toast';

export default function Register() {
  const [generalError, setGeneralError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: { username: "", password: "", confirmPassword: "", role: "user", name: "", phone: "", email: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setGeneralError("");
      await registerUser(data.username, data.password, data.role, data.name, data.phone, data.email);
      setSuccessOpen(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setGeneralError("Đăng ký thất bại! Tên đăng nhập có thể đã tồn tại.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 font-sans">
      <Toast
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Đăng ký thành công! Đang chuyển hướng..."
      />

      <div className="w-full max-w-[450px] animate-in zoom-in duration-700">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Tạo Tài Khoản</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest opacity-60 italic">Khởi đầu trải nghiệm thuê và cho thuê trọ hiện đại</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-10 rounded-[40px] shadow-2xl shadow-emerald-900/10">
          
          {generalError && (
            <div className="bg-rose-500/10 border border-rose-500 text-rose-500 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest mb-8">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Custom Role Toggle */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Bạn là?</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => field.onChange("user")}
                      className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        field.value === "user" 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40" 
                        : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Người thuê
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("master")}
                      className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        field.value === "master" 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40" 
                        : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Chủ trọ
                    </button>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Tên đăng nhập</label>
              <input 
                {...register("username")}
                className={`w-full bg-slate-950 border ${errors.username ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                placeholder="Ví dụ: datluu_2026"
              />
              {errors.username && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Họ và tên</label>
              <input 
                {...register("name")}
                className={`w-full bg-slate-950 border ${errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                placeholder="Ví dụ: Nguyễn Văn A"
              />
              {errors.name && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Email</label>
              <input 
                {...register("email")}
                className={`w-full bg-slate-950 border ${errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                placeholder="example@gmail.com"
              />
              {errors.email && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.email.message}</p>}
            </div>


            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Số điện thoại</label>
              <input 
                {...register("phone")}
                className={`w-full bg-slate-950 border ${errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                placeholder="09xxx..."
              />
              {errors.phone && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Mật khẩu</label>
                <input 
                  {...register("password")}
                  type="password"
                  className={`w-full bg-slate-950 border ${errors.password ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Xác nhận</label>
                <input 
                  {...register("confirmPassword")}
                  type="password"
                  className={`w-full bg-slate-950 border ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'} rounded-2xl py-4 px-6 text-white text-sm font-bold outline-none transition-all placeholder:text-slate-700`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest ml-1 mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>


            <button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              Đăng ký tài khoản ngay
            </button>

            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-slate-800 flex-1"></div>
              <div className="h-px bg-slate-800 flex-1"></div>
            </div>

            <p className="text-center text-slate-500 font-bold text-xs">
              Đã có tài khoản?{" "}
              <RouterLink to="/login" className="text-emerald-500 hover:underline">Đăng nhập</RouterLink>
            </p>
          </form>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-[9px] font-black text-slate-700 uppercase tracking-widest">
            <span>© 2026 RentalHub</span>
            <span className="hover:text-slate-500 cursor-pointer">Bảo mật</span>
            <span className="hover:text-slate-500 cursor-pointer">Hỗ trợ</span>
        </div>
      </div>
    </div>
  );
}
