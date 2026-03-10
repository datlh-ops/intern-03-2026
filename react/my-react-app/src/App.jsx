import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Dashboard } from "./pages";
import {Masters    } from "./pages";
import {Rooms } from "./pages"
import {Users} from "./pages";

import "./styles/layout.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path ="/masters" element ={<Masters />} />
          <Route path="/rooms" element ={<Rooms />} />
          <Route path="/users" element = {<Users />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;