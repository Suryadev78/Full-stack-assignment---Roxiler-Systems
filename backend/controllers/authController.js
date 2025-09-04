import { loginShema, signUpShema } from "../validators/authShema.js";
export const signup = (req,res)=>{
        const result = signUpShema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({msg:"error while parsing the data",errors:result.error.message});
            console.log(result.error.message);
        }
        const {Name,Email,Address,Password} = result.data;
        
        return res.status(200).json({msg:"signup success", body:{Name,Email,Address,Password}});
}

export const login = async (req,res)=>{
    const result = loginShema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({msg:"error while parsing the data",errors:result.error.message});
    }
    const {Email,Password}  = result.data;
   

    return res.status(200).json({msg:"login success", body:{Email,Password}});

    // const user =  await user.findById(email);
    // if(!user){
    //     return res.status(400).json({msg:"user doest not exist"}) 
    // }

    // const isMatch = await user.comparePassword(passwrod,stringPassword);
    // if(!isMatch){
    //     return res.status(400).json({msg:"password is wrong"});
    // }
    
}