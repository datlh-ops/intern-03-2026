import AdminSidebar from "./AdminSidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="layout">
      <AdminSidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
