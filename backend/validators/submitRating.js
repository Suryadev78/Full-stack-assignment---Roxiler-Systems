import z from "zod";


export const submitRatingSchema = z.object({
    storeId : z.number().min(1,"store id is required"),
    value : z.number().min(1,"value is required")
})