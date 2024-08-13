import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const AdminProtectedRoute = () => {
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export { ProtectedRoute, AdminProtectedRoute };
