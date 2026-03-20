export default function UserTable({ users, deleteUser, onEdit }) {
    return (
        <div className="user-table">
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>SĐT</th>
                        <th>Phòng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.room}</td>

                            <td>
                                {user.status === "active"
                                    ? "🟢 Đang thuê"
                                    : "⚪ Đã rời"}
                            </td>

                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => onEdit(user)}
                                    style={{ marginRight: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}