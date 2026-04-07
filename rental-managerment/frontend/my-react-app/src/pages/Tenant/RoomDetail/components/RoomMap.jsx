import React from 'react';
import MapIcon from '@mui/icons-material/Map';

const RoomMap = ({ room }) => {
  if (!room) return null;

  const fullAddress = `${room.location}, ${room.ward}, ${room.district}, ${room.city}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <MapIcon />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Vị trí thực tế</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Xem đường đi và khu vực xung quanh</p>
        </div>
      </div>

      <div className="w-full h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative group">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={embedUrl}
          title="Google Maps"
          className="filter grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
        ></iframe>
        
        {/* Nút Overlay để mở to bản đồ */}
        <div className="absolute bottom-6 right-6">
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-2xl active:scale-95"
          >
            <MapIcon fontSize="small" />
            Mở Navigator Chỉ Đường
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoomMap;
