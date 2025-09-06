import { PrismaClient } from "../generated/prisma/index.js";
import { createStoreSchema } from "../validators/createStoreShema.js"

const prisma = new PrismaClient();

export const createStore = async (req,res)=>{
    const result = createStoreSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({msg:"error while parsing the body you've sent",error:result.error.message});
        }
        const {Name,Email,Address,ownerId} = result.data;
        try{
            const user = await prisma.user.findUnique({
                where:{id:ownerId}
            })
            if(!user){
                return res.status(400).json({msg:"user does not exist"});
            }
            //now creating store once we will verigy the user exist because we dont wanna assign a user ti a store that does not exist

            const store = await prisma.store.create({
                data:{
                    name:Name,
                    email:Email,
                    address:Address,
                    ownerId:ownerId
                }
            })
            await prisma.user.update({
                where:{id:ownerId},
                data:{role:"STORE_OWNER"}
            })
            return res.status(200).json({msg:"store created successfully",store:store})
        }
        catch(e){
            return res.status(500).json({msg:"error while creating store",error:e.message});

        }
    }

