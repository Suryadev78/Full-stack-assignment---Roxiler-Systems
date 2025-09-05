import z from "zod";

export const createStoreSchema = z.object({
    Name :z.string().min(3,"Name must be atleast 3 characters").max(60,"Name must be atmost 60 characters"),
    Email :z.email().min(5,"email must be atleast 5 characters").max(30,"email cannot be more than 30 character"),
    Address : z.string().min(5,"Address must be atleast 5 character").max(400,"address cannot be more than 400 characters"),
    ownerId : z.number().min(1,"owner id is required")
})