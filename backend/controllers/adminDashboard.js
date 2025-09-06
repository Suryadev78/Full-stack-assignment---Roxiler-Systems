import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();



export const adminDashboard  = async (req,res)=>{
    try{
        const total_users = await prisma.user.count();
        const total_stores = await prisma.store.count();
        const total_ratings = await prisma.rating.count();

        return res.status(200).json({msg:"dashboard data fetched successfully", data:{total_users,total_stores,total_ratings}});
    }
    catch(e){
        return res.status(500).josn({msg:"error while fetching dashboard data",error:e.message});
    }
}