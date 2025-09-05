import z, { email } from "zod";

export const signUpShema = z.object({
    Name : z.string().min(5,"Name must be atleast 5 characters").max(60,"Name must be atmost 60 characters"),
    Email :email().min(5,"email must be atleast 5 characters").max(30,"email cannot be more than 30 characters"),
    Address: z.string().min(5,"Address must be atleast 5 character").max(400,"address cannot be more than 400 characters"),
    Password:z.string().min(8,"password must be atleast 8 characters").max(16,"password cannot be more than 30 characters").regex(/[A-Z]/,"password must include an uppercase letter").regex(/[^A-Za-z0-9]/,"password must include a special character") 
})

export const loginShema = z.object({
    Email:z.email().min(5,"email must be atleast 5 characters").max(30,"email cannot be more than 30 characters"),
    Password:z.string().min(1,"password is required")
})


export const updatePasswordShema = z.object({
    oldPassword : z.string().min(1,"old password is required"),
    newPassword : z.string().min(1,"new password is required").regex(/[A-Z]/,"password must include an uppercase letter").regex(/[^A-Za-z0-9]/,"password must include special character")
})