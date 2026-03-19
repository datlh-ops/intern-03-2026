import axios from "./axiosClient";

export const getUsers = () => axios.get("/users");
export const createUser = (data) => axios.post("/users", data);
export const deleteUserApi = (id) => axios.delete(`/users/${id}`);