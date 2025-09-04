import jwt from "jsonwebtoken";
import { is } from "zod/v4/locales";
 
const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is required");
}

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({msg:"token is required"});
    }
    if(!token.startsWith("Bearer ")){
        return res.status(401).json({msg:"invalid token"});
    }
    const tokenData = token.split(" ")[1];
    if(!tokenData){
        return res.status(401).json({msg:"invalid token"});
    }
    try{
        const decoded =  jwt.verify(tokenData,JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg:"wrong/invalid token"});
        }
        req.user = decoded;
        next();
    }
    catch(e){
        return res.status(401).json({msg:"something went wrong while verifying token"});
    }
}

const isAdmin = (req,res,next)=>{
    if(req.user.role !== "ADMIN" ){
        return res.status(401).json({msg:"admin access required"});
    }
    next();
}

export  {authMiddleware,isAdmin};