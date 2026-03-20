import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UserStats from "./components/UserStats";
import "./users.css";
import { getUsers, createUser, deleteUserApi, updateUserApi } from "../../api/user.api";
export default function Users() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsers();
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const addUser = async (user) => {
        try {
            await createUser(user);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };
    const updateUser = async (id, data) => {
        try {
            await updateUserApi(id, data);
            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            console.error(err);
        }
    };
    const deleteUser = async (id) => {
        try {
            await deleteUserApi(id);
            fetchUsers(); 
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="users-page">
            <h2>Quản lý người thuê</h2>
            <UserStats users={users} />
            <UserForm 
                addUser={addUser} 
                editingUser={editingUser} 
                updateUser={updateUser} 
                cancelEdit={() => setEditingUser(null)} 
            />
            <UserTable 
                users={users} 
                deleteUser={deleteUser} 
                onEdit={(user) => setEditingUser(user)} 
            />
        </div>
    );
}