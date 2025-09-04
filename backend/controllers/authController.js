import { loginShema, signUpShema } from "../validators/authShema.js";
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { email } from "zod";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId,email,role)=>{
    const token = jwt.sign({userId,email,role},JWT_SECRET,{expiresIn:"24h"});
    return token;
}
export const signup = async (req,res)=>{
        const result = signUpShema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({msg:"error while parsing the data",errors:result.error.message});
            console.log(result.error.message);
        }
        const {Name,Email,Address,Password} = result.data;
        try{
            const existingUser = await prisma.user.findUnique({
                where:{email:Email}
            })
            if(existingUser){
                return res.status(400).json({msg:"user already exists"});
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password,saltRounds);

            const user = await prisma.user.create({
                data:{
                    name:Name,
                    email:Email,
                    address:Address,
                    passWordHash:hashedPassword
                }
            })
            const token = generateToken(user.id,user.email,user.role);
            const {passWordHash,...userWithOutPassword} = user;
            return res.status(200).json({msg:"signup successful",user:userWithOutPassword,token:token}) ;
        }
        catch(e){
            return res.status(500).json({msg:"error while creatig user",error:e.message})
            console.log(e.message);
        }
}

export const login = async (req,res)=>{
    const result = loginShema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({msg:"error while parsing the data",errors:result.error.message});
    }
    const {Email,Password}  = result.data;
   

    return res.status(200).json({msg:"login success", body:{Email,Password}});

    // const user =  await user.findById(email);
    // if(!user){
    //     return res.status(400).json({msg:"user doest not exist"}) 
    // }

    // const isMatch = await user.comparePassword(passwrod,stringPassword);
    // if(!isMatch){
    //     return res.status(400).json({msg:"password is wrong"});
    // }
    
}