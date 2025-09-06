// import { Children } from "react";
import * as jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,allowedRoles}) =>{
    console.log(allowedRoles)
    const token = localStorage.getItem("token");
    // const user = JSON.parse()
    if(!token){
        return <Navigate to={"/login"} replace/>
    }
    console.log(token);
    let user = null;
    try{
        user = jwt_decode.jwtDecode(token);
        // console.log("user:", user);
        // console.log("user role:", user.role);
    } catch(e){
        console.log("jwt error:", e); 
        return <Navigate to={"/login"} replace/>
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to={"/unauthorized"} replace/>

    }
    return children;
}

export default ProtectedRoute;