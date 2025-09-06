import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const storeOwnerStores = async (req, res) => {

    try{

        const ownerId = req.user.userId;
        const stores = await prisma.store.findMany({
            where: { ownerId },
            include: {
              ratings: {
                include: { user: true }, // include user info for each rating
              },
            },
          });
          const formattedStores = stores.map(store => {
            let total = 0;
            const count = store.ratings.length;
      
            for (let i = 0; i < store.ratings.length; i++) {
              total += store.ratings[i].value;
            }
      
            const averageRating = count > 0 ? (total / count).toFixed(2) : 0;
      
            return {
              id: store.id,
              name: store.name,
              address: store.address,
              averageRating,
              ratings: store.ratings, // includes user info
            };
          });
          return res.status(200).json({
            msg: "Store dashboard fetched successfully",
            stores: formattedStores,
          });

    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching store dashboard", error: e.message });
      }
}