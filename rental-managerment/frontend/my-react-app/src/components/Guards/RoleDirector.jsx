import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RoleDirector() {
  const { userProfile, isInitializing } = useAuth();

  if (isInitializing) {
    return null; // Không render gì vì màn hình Spinner (LoadingProvider) đã phủ toàn web khi gọi API 
  }

  if (!userProfile) return <Navigate to="/login" replace />;

  switch (userProfile.role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "master":
      return <Navigate to="/master" replace />;
    case "user":
      return <Navigate to="/user" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}
