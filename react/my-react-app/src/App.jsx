import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./styles/layout.css"

function Dashboard() {
  return <h1>Trang chủ</h1>;
}
function Rooms() {
  return <h1>Phòng trọ</h1>;
}
function Users() {
  return <h1>Khách thuê trọ</h1>;
}

function Masters() {
  return <h1>Chủ trọ</h1>;
}

function Contracts() {
  return <h1>Hợp đồng cho thuê</h1>;
}

function App() {
  return (
    <BrowserRouter>

      <Layout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/contracts" element={<Contracts />} />
        </Routes>

      </Layout>

    </BrowserRouter>
  );
}

export default App;