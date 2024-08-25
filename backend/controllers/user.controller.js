import User from "../models/user.model.js"
export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id
        //except the logged in user show everybody on the sidebar (altho whatsapp allows you to send messages to )
        //yourself as well , to implement that functionality , we just  have to get all the existing users on our sidebar  
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(error)
    {
        console.log("Error in user.controller.js " , error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}