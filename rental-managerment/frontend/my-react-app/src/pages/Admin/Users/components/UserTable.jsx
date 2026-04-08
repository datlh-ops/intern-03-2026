import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserTable({ users, deleteUser, onEdit }) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs font-semibold">
                    <tr>
                        <th className="px-6 py-4">Tên</th>
                        <th className="px-6 py-4">SĐT</th>
                        <th className="px-6 py-4">Phòng</th>
                        <th className="px-6 py-4">Vai trò HĐ</th>
                        <th className="px-6 py-4 text-right">Hành động</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex flex-shrink-0 items-center justify-center">
                                        <PersonIcon fontSize="small" />
                                    </div>
                                    <span className="font-medium text-gray-900">{user.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium">{user.phone}</td>
                            <td className="px-6 py-4 text-blue-600 font-semibold">
                                {user.roomId ? user.roomId.roomNumber : "Chưa xếp phòng"}
                            </td>
                            <td className="px-6 py-4">
                                {user.isRepresentative ? (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        Đại diện
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        Thành viên
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <EditIcon fontSize="small" />
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                <span className="block text-sm">Chưa có dữ liệu khách thuê.</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}