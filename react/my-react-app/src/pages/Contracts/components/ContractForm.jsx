import { useState } from "react";

export default function ContractForm({ addContract }) {

    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const newContract = {
            id: Date.now(),
            user,
            room,
            price,
            startDate,
            endDate,
            status: "active"
        };

        addContract(newContract);

        setUser("");
        setRoom("");
        setPrice("");
        setStartDate("");
        setEndDate("");
    };

    return (

        <form className="contract-form" onSubmit={handleSubmit}>

            <input
                placeholder="Người thuê"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
            />

            <input
                placeholder="Phòng"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
            />

            <input
                placeholder="Giá thuê"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />

            <button type="submit">Tạo hợp đồng</button>

        </form>
    );
}