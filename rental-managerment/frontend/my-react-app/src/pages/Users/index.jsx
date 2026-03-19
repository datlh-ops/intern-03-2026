import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UserStats from "./components/UserStats";
import "./users.css";
import { getUsers, createUser,deleteUserApi } from "../../api/user.api";
export default function Users() {
    const [users, setUsers] = useState([]);
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
            <UserForm addUser={addUser} />
            <UserTable users={users} deleteUser={deleteUser} />
        </div>
    );
}