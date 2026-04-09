import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

export default function ContractTable({ contracts, deleteContract, onEdit }) {
    if (!contracts || contracts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <DescriptionIcon className="text-gray-400" fontSize="large" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Không có hợp đồng nào</h3>
                <p className="text-sm text-gray-500 mt-1">Chưa có hợp đồng nào được tạo trong hệ thống.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/75 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-gray-600">Người thuê</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Phòng</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Giá (VNĐ)</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Tiền cọc</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Bắt đầu</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Kết thúc</th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-600">Trạng thái</th>
                        <th className="px-6 py-4 text-right font-semibold text-gray-600">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {contracts.map(contract => (
                        <tr key={contract.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                {contract.user?.isRepresentative && <span className="text-amber-500">⭐</span>}
                                {contract.user?.name || "-"}
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium">P. {contract.room?.roomNumber || "-"}</td>
                            <td className="px-6 py-4 text-gray-900 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <LocalAtmIcon className="text-green-600" fontSize="small" />
                                    {contract.price?.toLocaleString() || "-"}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {contract.deposit ? contract.deposit.toLocaleString() : "-"}
                            </td>
                            <td className="px-6 py-4 text-gray-500">{contract.startDate?.slice(0, 10) || "-"}</td>
                            <td className="px-6 py-4 text-gray-500">{contract.endDate?.slice(0, 10) || "-"}</td>
                            <td className="px-6 py-4 text-center">
                                {contract.status === 0 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                        <PendingIcon fontSize="inherit" /> Đang xử lý
                                    </span>
                                ) : contract.status === 1 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <CheckCircleIcon fontSize="inherit" /> Hiệu lực
                                    </span>
                                ) : contract.status === 2 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                                        <CancelIcon fontSize="inherit" /> Đã từ chối
                                    </span>
                                ) : contract.status === 3 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                        <CancelIcon fontSize="inherit" /> Đã hủy
                                    </span>
                                ) : contract.status === 4 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                        <HourglassEmptyIcon fontSize="inherit" /> Hết hạn
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                        Rỗng
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit && onEdit(contract)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <EditIcon fontSize="small" />
                                    </button>
                                    <button
                                        onClick={() => deleteContract(contract.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa hợp đồng"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
