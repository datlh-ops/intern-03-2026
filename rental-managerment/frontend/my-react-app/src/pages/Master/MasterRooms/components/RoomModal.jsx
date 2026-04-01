import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { roomSchema } from '../../../../schemas/room.schema';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function RoomModal({ isOpen, onClose, onSave, roomData, masterId }) {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState("");

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roomSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      city: 'Hồ Chí Minh',
      ward: '',
      district: '',
      location: '',
      area: 20,
      isTrending: false,
      roomNumber: '',
      price: '',
      status: 0,
      capacity: 2,
      currentTenants: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (roomData) {
        reset({
          title: roomData.title || '',
          city: roomData.city || 'Hồ Chí Minh',
          ward: roomData.ward || '',
          district: roomData.district || '',
          location: roomData.location || '',
          area: roomData.area || 20,
          isTrending: roomData.isTrending || false,
          roomNumber: roomData.roomNumber,
          price: roomData.price,
          status: roomData.status,
          capacity: roomData.capacity,
          currentTenants: roomData.currentTenants || 0,
        });
        setPreviewUrl(roomData.thumbnail);
      } else {
        reset({ title: '', city: 'Hồ Chí Minh', ward: '', district: '', location: '', area: 20, isTrending: false, roomNumber: '', price: '', status: 0, capacity: 2, currentTenants: 0 });
        setPreviewUrl(null);
      }
      setImageFile(null);
      setImageError("");
    }
  }, [roomData, isOpen, reset]);

  const selectedCityName = watch("city");
  const selectedDistrictName = watch("district");

  useEffect(() => {
    if (isOpen) {
      fetch("https://provinces.open-api.vn/api/?depth=1")
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.error("Lỗi lấy danh sách tỉnh/thành:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCityName && cities.length > 0) {
      const city = cities.find(c => c.name === selectedCityName);
      if (city) {
        fetch(`https://provinces.open-api.vn/api/p/${city.code}?depth=2`)
          .then(res => res.json())
          .then(data => setDistricts(data.districts || []))
          .catch(err => console.error("Lỗi lấy danh sách quận/huyện:", err));
      }
    }
  }, [selectedCityName, cities]);

  useEffect(() => {
    if (selectedDistrictName && districts.length > 0) {
      const dist = districts.find(d => d.name === selectedDistrictName);
      if (dist) {
        fetch(`https://provinces.open-api.vn/api/d/${dist.code}?depth=2`)
          .then(res => res.json())
          .then(data => setWards(data.wards || []))
          .catch(err => console.error("Lỗi lấy danh sách phường/xã:", err));
      }
    }
  }, [selectedDistrictName, districts]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageError("");
    }
  };

  const onSubmit = (data) => {
    if (!roomData && !imageFile) {
      setImageError("Vui lòng tải ảnh phòng.");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(data).forEach(key => {
      formDataToSubmit.append(key, data[key]);
    });
    formDataToSubmit.append('masterId', masterId);

    if (imageFile) {
      formDataToSubmit.append('image', imageFile);
    }
    onSave(formDataToSubmit, roomData ? roomData.id : null);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl rounded shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-slate-50/80 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <EditNoteIcon />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {roomData ? 'Cấu hình thông tin phòng' : 'Thêm phòng mới'}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all hover:rotate-90"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-10">
            {/* Visual Column */}
            <div className="space-y-6">
              <div className="group relative h-64 rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-300 hover:bg-blue-50/30">
                {previewUrl ? (
                  <img src={previewUrl} alt="Room" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-slate-400 group-hover:text-blue-500">
                    <CloudUploadIcon style={{ fontSize: '48px' }} />
                    <p className="text-sm font-bold tracking-tight text-slate-400">Tải ảnh phòng</p>
                    <p className="text-[10px] uppercase tracking-widest font-extrabold opacity-60">PNG, JPG </p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {previewUrl && (
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded text-xs font-bold shadow-xl">Đổi ảnh</span>
                  </div>
                )}
              </div>
              {imageError && <p className="text-rose-500 text-xs font-bold bg-rose-50 px-3 py-2 rounded-lg text-center">{imageError}</p>}

              <div className="bg-slate-50/80 p-6 rounded-xl space-y-5 border border-slate-100">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiện ích nhanh</h5>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register("isTrending")} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-bold text-slate-700">Phòng nổi bật (Trending)</span>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">Trạng thái hiện tại</label>
                  <select 
                    {...register("status")} 
                    className="w-full bg-white border border-slate-200 p-3 rounded text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  >
                    <option value={0}>✅ Còn trống</option>
                    <option value={1}>🏠 Đã thuê</option>
                    <option value={2}>⏳ Đang xử lý</option>
                    <option value={3}>🛠️ Đang bảo trì</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Input Column */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-start">
              <div className="col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Tiêu đề quảng bá</label>
                <input 
                  {...register("title")} 
                  placeholder="VD: Phòng Studio cao cấp Landmark 81..."
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.title && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Số phòng</label>
                <input 
                  {...register("roomNumber")} 
                  placeholder="P.123"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.roomNumber && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.roomNumber.message}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Giá thuê / Tháng</label>
                <input 
                  type="number"
                  {...register("price")} 
                  placeholder="VNĐ"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm font-bold text-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.price && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Diện tích m²</label>
                <input 
                  type="number"
                  {...register("area")} 
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.area && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.area.message}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Sức chứa tối đa</label>
                <input 
                  type="number"
                  {...register("capacity")} 
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.capacity && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.capacity.message}</p>}
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Tỉnh/Thành</label>
                  <select {...register("city")} className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-lg text-xs font-bold text-slate-700 outline-none focus:bg-white">
                    <option value="">Chọn</option>
                    {cities.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.city && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Quận/Huyện</label>
                  <select {...register("district")} disabled={!districts.length} className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-lg text-xs font-bold text-slate-700 outline-none focus:bg-white disabled:opacity-40">
                    <option value="">Chọn</option>
                    {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
                  </select>
                  {errors.district && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.district.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Phường/Xã</label>
                  <select {...register("ward")} disabled={!wards.length} className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-lg text-xs font-bold text-slate-700 outline-none focus:bg-white disabled:opacity-40">
                    <option value="">Chọn</option>
                    {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                  </select>
                  {errors.ward && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.ward.message}</p>}
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block font-black">Số nhà / Đường cụ thể</label>
                <input 
                  {...register("location")} 
                  placeholder="VD: 123 Võ Văn Kiệt"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
                {errors.location && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.location.message}</p>}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-8 py-4 rounded text-sm font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
            >
              Hủy thao tác
            </button>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-10 py-4 rounded text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <CheckCircleIcon fontSize="small" />
              Xác nhận lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
