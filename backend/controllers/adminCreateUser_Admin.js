import { PrismaClient } from "../generated/prisma/index.js"
import bcrypt from "bcrypt";
import { createStoreSchema } from "../validators/createStoreShema.js";
import { createUserOrAdminSchema } from "../validators/adminCreateUser_Admin.js";
const prisma = new  PrismaClient();

export const createUserOrAdmin = async (req,res) =>{
    const result = createUserOrAdminSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({msg:"error while parsing the data",error : result.error.message});
    }
    const {Name,Email,Address,Password,role} = result.data;
    try{
        const existingUser = await prisma.user.findUnique({
            where:{email:Email}
        })
        if(existingUser){
            return res.status(400).json({msg:"user already exists"});
        }
        const saltRounds = 10;
        const hashedPassword  =  await bcrypt.hash(Password,saltRounds);
        const user = await prisma.user.create({
            data:{
                name:Name,
                email:Email,
                address:Address,
                passWordHash:hashedPassword,
                role:role
            }
        })
        return res.status(200).json({msg:"user created successfully",user:user});
    }
    catch(e){
        return res.status(500).json({msg:"error while creating user/admin",error :e.message});
    }
}