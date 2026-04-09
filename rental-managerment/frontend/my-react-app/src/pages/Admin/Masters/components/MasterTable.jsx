import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MasterTable({ masters, deleteMaster, onEdit }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">Tên</th>
            <th className="px-6 py-4">SĐT</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Địa chỉ</th>
            <th className="px-6 py-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {masters.map((master) => (
            <tr key={master.id} className="hover:bg-amber-50/50 transition-colors">
              <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex flex-shrink-0 items-center justify-center">
                          <PersonIcon fontSize="small" />
                      </div>
                      <span className="font-medium text-gray-900">{master.name}</span>
                  </div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">{master.phone}</td>
              <td className="px-6 py-4 text-gray-600">{master.email || "—"}</td>
              <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">{master.address || "—"}</td>

              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onEdit && onEdit(master)}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                    >
                        <EditIcon fontSize="small" />
                    </button>
                    <button
                        onClick={() => deleteMaster(master.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                    >
                        <DeleteIcon fontSize="small" />
                    </button>
                </div>
              </td>
            </tr>
          ))}
          {masters.length === 0 && (
              <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <span className="block text-sm">Chưa có dữ liệu chủ trọ.</span>
                  </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}