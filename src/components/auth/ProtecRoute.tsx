import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  
  const { auth } = useAuth();
  
  
  if (!auth) {
    return <Navigate to="/login" />;
  }  
  return <>{children}</>;
}

export default ProtectedRoute;
