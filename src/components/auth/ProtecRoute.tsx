import { ReactNode, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  
  const {iniciando} = useAuth();
  const [_verificado, setVerificado]= useState<boolean>(false); 
  const navigate = useNavigate()
  /*
  if (!auth) {
    return <Navigate to="/login" />;
  } */ 
    const verificando=async ()=>{    
      if(!await iniciando()){
        navigate("/login")
      }else {
        setVerificado(true)
      }
    } 
    
 useEffect(()=>{  
  verificando(); 
 }, [])
  return <>{  
    children
    }</>;
}

export default ProtectedRoute;
