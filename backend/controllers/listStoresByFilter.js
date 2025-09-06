import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();


export const listStoresByFilter = async (req,res)=>{
    try{
        const {name,email,address,sortBy = "id" ,order = "asc"} = req.query;
        const stores = await prisma.store.findMany({
            where:{
                name:name?{contains:name,mode:"insensitive" }:undefined,
                email:email?{contains:email,mode:"insensitive"}:undefined,
                address:address?{contains:address,mode:"insensitive"}:undefined,
            },
            orderBy:{
                [sortBy] :order
            },include: {
                ratings: true,  
              },
        })
        const formattedStores = [];
        for(let i=0; i<stores.length;i++){
            const store = stores[i];

            let totalRatings = 0;
            let ratingCount = store.ratings?.length || 0;
            for(let j =0;j<store.ratings.length;j++){
                totalRatings += store.ratings[j].value;
            }
            let avgRating  = 0;
            if(ratingCount > 0){
                avgRating = totalRatings/ratingCount;
            }
            formattedStores.push({
                id:store.id,
                name:store.name,
                email:store.email,
                address:store.address,
                avarageRating :avgRating.toFixed(2)
            })
        }

        return res.status(200).json({msg:"stores fetched successfully",stores:formattedStores});

    }
    catch(e){
        return res.status(500).json({msg:"error occured while fetching stores",error:e.message});
    }
}