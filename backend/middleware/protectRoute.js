import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        //we're taking token from req.cookies.jwt
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized:No token Provided "});
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        //verify if the token obtained matches the signed val that was given to it 

        //if it does not match 
        if(!decoded)
        {
            return res.status(401).json({error:"Unauthorized:Invalid Token "});
        }
        //if it does match , get the username of the person trying to log in 
        const user= await User.findById(decoded.userId).select("-password");
        //if the user does not exist in our database 
        if(!user)
        {
            return res.status(404).json({error:"User not found "});
        }
        //if user is found , put his id (produce by default by mongoDB) in req.user
        req.user=user;
        next();
    }
    catch(error)
    {
        console.log("error in protectRoute middleware: ",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
    
}
export default protectRoute;