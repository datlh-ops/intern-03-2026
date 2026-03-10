import { useState } from "react";
import RoomForm from "./components/RoomForm";
import RoomTable from "./components/RoomTable";
import RoomStats from "./components/RoomStats";
import "./rooms.css";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    const addRoom = (room) => {
        setRooms([...rooms, room]);
    };

    const deleteRoom = (id) => {
        setRooms(rooms.filter(r => r.id !== id));
    };

    return (

        <div className="rooms-page">

            <h2>Quản lý phòng</h2>

            <RoomStats rooms={rooms} />

            <RoomForm addRoom={addRoom} />

            <RoomTable rooms={rooms} deleteRoom={deleteRoom} />

        </div>

    );
}