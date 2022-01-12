import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const PrivateRoute = ({ children }) => {
const {user,isLoading}=useAuth();
  let location = useLocation();
  
  if(isLoading){
    <Spinner animation="border" variant="success" />
  }

 else if (!user.email) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
