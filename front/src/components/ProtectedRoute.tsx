import React from "react";
import { useAuth, UserRole } from "@/pages/Auth/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // if omitted, any authenticated user may pass
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; 
    console.log("ProtectedRoute user:", user);
  if (!user) {
    // not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // logged in but wrong role
    return <Navigate to="/not-authorized" replace />;
  }
console.log("ProtectedRoute user:", user);
  return <Outlet />;
};

export default ProtectedRoute;