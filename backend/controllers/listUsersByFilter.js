import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();


export const listUsersByFilter =async (req,res)=>{
    const validRoles = ["ADMIN", "USER", "STORE_OWNER"];
    try{
        const { search, sortBy = "id", order = "asc" } = req.query;
        const users = await prisma.user.findMany({
            where: search
              ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { address: { contains: search, mode: "insensitive" } },
                    validRoles.includes(search.toUpperCase())
                      ? { role: { equals: search.toUpperCase() } }
                      : undefined
                  ].filter(Boolean),
                }
              : undefined,
            include: {
              store: {
                include: { ratings: true },
              },
            },
            orderBy: { [sortBy]: order },
          });
        const formattedUsers = users.map(user =>{
            let avgRating = 0;
            if(user.role === "STORE_OWNER" && user.store){
                const ratings=  user.store.ratings || [];
                let total_ratings = 0;
                for(let rating of ratings){
                    total_ratings += rating.value;
                }
                if(ratings.length > 0){
                    avgRating = total_ratings/ratings.length;
                }
                else{
                    avgRating = 0;
                }
            }
            return {
                id:user.id,
                name:user.name,
                email:user.email,
                address:user.address,
                role:user.role,
                rating: user.role === "STORE_OWNER" ? avgRating.toFixed(2) : null
            }
        })
        
        return res.status(200).json({msg:"user fetched successfully",users:formattedUsers});
    }
    catch(e){
        return res.status(500).json({msg:"error occured while fetching users",error:e.message});
    }
}