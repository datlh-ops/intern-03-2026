import { useEffect, useState } from "react";
import MasterForm from "./components/MasterForm";
import MasterTable from "./components/MasterTable";
import "./master.css";

import { getMasters, createMaster, deleteMaster as deleteMasterApi, updateMasterApi } from "../../../api/master.api";

export default function Masters() {
  const [masters, setMasters] = useState([]);
  const [editingMaster, setEditingMaster] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMasters();
        setMasters(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const addMaster = async (master) => {
    try {
      const res = await createMaster(master);
      setMasters((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  }
  const updateMaster = async (id, data) => {
    try {
      await updateMasterApi(id, data);
      const res = await getMasters();
      setMasters(res.data);
      setEditingMaster(null);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteMaster = async (id) => {
    try {
      await deleteMasterApi(id);
      setMasters((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h2>Quản lý chủ trọ</h2>
      <MasterForm 
        addMaster={addMaster} 
        editingMaster={editingMaster}
        updateMaster={updateMaster}
        cancelEdit={() => setEditingMaster(null)}
      />
      <MasterTable 
        masters={masters} 
        deleteMaster={deleteMaster} 
        onEdit={(master) => setEditingMaster(master)}
      />
    </div>
  );
}