import React, { useMemo } from "react";
import HistoryIcon from '@mui/icons-material/History';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const RecentRooms = React.memo(({ rooms }) => {
  const lastFiveRooms = useMemo(() => {
    return [...rooms].slice(-5).reverse();
  }, [rooms]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <HistoryIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Phòng mới cập nhật</h3>
        </div>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
          5 phòng gần nhất
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">Tên phòng</th>
              <th className="px-4 py-3 font-semibold text-center">Giá</th>
              <th className="px-4 py-3 font-semibold text-right">Tình trạng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {lastFiveRooms.map((room) => (
              <tr key={room.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <MapsHomeWorkIcon fontSize="small" />
                    </div>
                    <span className="font-semibold text-gray-700">Phòng {room.roomNumber}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-medium text-gray-900">
                  {room.price ? room.price.toLocaleString() : "0"} <span className="text-[10px] text-gray-400 uppercase ml-0.5">vnđ</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    room.status === "Đã thuê" || room.status === 1
                      ? "bg-rose-50 text-rose-600 border border-rose-100" 
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {room.status === "Đã thuê" || room.status === 1 ? "Đã thuê" : "Còn trống"}
                  </span>
                </td>
              </tr>
            ))}
            {lastFiveRooms.length === 0 && (
              <tr>
                <td colSpan="3" className="py-12 text-center">
                  <p className="text-gray-400 italic">Chưa có dữ liệu phòng cập nhật.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default RecentRooms;