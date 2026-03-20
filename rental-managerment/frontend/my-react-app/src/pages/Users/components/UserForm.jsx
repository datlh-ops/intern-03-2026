import { useState, useEffect } from "react";
export default function UserForm({ addUser, editingUser, updateUser, cancelEdit }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [room, setRoom] = useState("");

    // Khi ấn nút Sửa ở bảng, editingUser sẽ thay đổi và tự động đổ dữ liệu bằng useEffect
    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setPhone(editingUser.phone);
            setRoom(editingUser.room);
        } else {
            setName("");
            setPhone("");
            setRoom("");
        }
    }, [editingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            phone,
            room,
            status: "active"
        };
        
        if (editingUser) {
            updateUser(editingUser._id || editingUser.id, userData);
        } else {
            addUser(userData);
        }
        
        setName("");
        setPhone("");
        setRoom("");
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <input
                placeholder="Tên người thuê"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <input
                placeholder="Phòng"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit">
                    {editingUser ? "Cập nhật người thuê" : "Thêm người thuê"}
                </button>
                {editingUser && (
                    <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#6c757d' }}>
                        Hủy bỏ
                    </button>
                )}
            </div>
        </form>
    );
}