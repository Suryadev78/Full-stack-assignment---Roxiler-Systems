import { PrismaClient } from "../generated/prisma/index.js"
import { submitRatingSchema } from "../validators/submitRating.js";

const prisma = new PrismaClient();

export const submitRating = async (req,res)=>{
    const result  = submitRatingSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({msg:"error while parsing the data",error:result.error.message});
    }
    const {storeId,value} = result.data;
    const userId =req.user.userId;
    if(value < 1 || value > 5){
        return res.status(400).json({msg:"value must be between 1 and 5"});
    }
    try{
        const store = await prisma.store.findUnique({
            where:{
                id:storeId
            }
        })
        if(!store){
            return res.status(400).json({msg:"store not exist"});
        }
        const existing = await prisma.rating.findUnique({
            where: {
              userId_storeId: {
                userId,
                storeId,
              },
            },
          });
          let rating;
          if (existing) {
            // if user already rated this store then update their  rating
            rating = await prisma.rating.update({
              where: {
                userId_storeId: {
                  userId,
                  storeId,
                },
              },
              data: { value },
            });
          } else {
            // if this isuser's first rating create a new rating
            rating = await prisma.rating.create({
              data: {
                userId,
                storeId,
                value,
              },
            });
          }
          return res.status(200).json({msg:"rating submitted successfully",rating});
    }
    catch(e){
        return res.status(500).json({msg:"error while submitting rating",error:e.message});
    }
}