import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  return (
    <div className="user-sidebar">
      <h2>USER</h2>
      <ul>
        <li>
          <NavLink to="/user" end>Thông tin chung</NavLink>
        </li>
        <li>
          <NavLink to="/user/rooms">Phòng đang thuê</NavLink>
        </li>
        <li>
          <NavLink to="/user/contracts">Hợp đồng của tôi</NavLink>
        </li>
      </ul>
    </div>
  );
}
