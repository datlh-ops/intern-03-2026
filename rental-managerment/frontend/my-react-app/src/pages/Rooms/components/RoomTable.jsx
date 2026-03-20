export default function RoomTable({ rooms, deleteRoom, onEdit }) {

    return (

        <div className="room-table">

            <table>

                <thead>
                    <tr>
                        <th>Số phòng</th>
                        <th>Giá (VNĐ)</th>
                        <th>Trạng thái</th>
                        <th>Sức chứa</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>

                    {rooms.map(room => (

                        <tr key={room._id || room.id}>

                            <td>{room.roomNumber}</td>
                            <td>{room.price ? room.price.toLocaleString() : "0"}</td>

                            <td>
                                {room.status === "Trống"
                                    ? "🟢 Trống"
                                    : room.status === "Đã thuê"
                                        ? "🔴 Đã thuê"
                                        : "🟡 Bảo trì"}
                            </td>

                            <td>{room.capacity} người</td>

                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => onEdit(room)}
                                    style={{ marginRight: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteRoom(room._id || room.id)}
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