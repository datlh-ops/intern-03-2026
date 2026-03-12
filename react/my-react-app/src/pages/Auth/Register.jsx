import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Register thành công (demo)");

    navigate("/login");

  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h2 className="auth-title">Tạo tài khoản</h2>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}