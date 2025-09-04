import jwt from "jsonwebtoken";
 
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
        if(!decoded.userId){
            return res.status(401).json({msg:"wrong/invalid token"});
        }
        req.userId = decoded.userId;
        next();


    }
    catch(e){
        return res.status(401).json({msg:"something went wrong while verifying token"});
    }


}

export default authMiddleware;