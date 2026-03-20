import { useState, useEffect } from "react";

export default function RoomForm({ addRoom, editingRoom, updateRoom, cancelEdit }) {

    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("2");

    useEffect(() => {
        if (editingRoom) {
            setRoomNumber(editingRoom.roomNumber);
            setPrice(editingRoom.price);
            setCapacity(editingRoom.capacity);
        } else {
            setRoomNumber("");
            setPrice("");
            setCapacity("2");
        }
    }, [editingRoom]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const roomData = {
            roomNumber,
            price: Number(price),
            capacity: Number(capacity)
        };

        if (editingRoom) {
            updateRoom(editingRoom._id || editingRoom.id, roomData);
        } else {
            addRoom(roomData);
        }

        setRoomNumber("");
        setPrice("");
        setCapacity("2");
    };

    return (

        <form className="room-form" onSubmit={handleSubmit}>
            <input
                placeholder="Số phòng / Tên phòng"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
            />
            <input
                placeholder="Giá phòng (VNĐ)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                placeholder="Sức chứa (số người)"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
            />

            <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit">{editingRoom ? "Cập nhật phòng" : "Thêm phòng"}</button>
                {editingRoom && (
                    <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#6c757d' }}>
                        Hủy
                    </button>
                )}
            </div>

        </form>
    );
}