import AdminSidebar from "../Navigation/AdminSidebar";
import Header from "../Navigation/Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
