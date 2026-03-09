import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Header />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}