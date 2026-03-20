import axios from "./axiosClient";

export const getRooms = () => axios.get("/rooms");
export const createRoom = (data) => axios.post("/rooms", data);
export const deleteRoomApi = (id) => axios.delete(`/rooms/${id}`);
export const updateRoomApi = (id, data) => axios.put(`/rooms/${id}`, data);
