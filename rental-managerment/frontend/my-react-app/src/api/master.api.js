import axios from "./axiosClient";

export const getMasters = ()=>axios.get("/masters")
export const createMaster = (data)=>axios.post("/masters",data)
export const deleteMaster = (id)=>axios.delete(`/masters/${id}`)