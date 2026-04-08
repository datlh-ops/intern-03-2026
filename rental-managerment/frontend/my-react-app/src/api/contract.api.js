import axios from "./axiosClient";

export const getContracts = (params) => axios.get("/contracts", { params });
export const createContract = (data) => axios.post("/contracts", data);
export const updateContractApi = (id, data) => axios.put(`/contracts/${id}`, data);
export const deleteContractApi = (id) => axios.delete(`/contracts/${id}`);
