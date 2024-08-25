import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js"
//async function works with asynchronous code - req and res not happening at  the same time , hence combined with await keyword  
//it returns a promise . if it returns a value , the promise is resolved , if the fn throws an error , the promise is rejected . 
export const signup=async (req,res)=>{
    try{
        //got an http req to sign user up on clicking the sign up button on the frontend 
        //user inputs the data and sends an http request 
        //directed to http://localhost:5000/api/auth/signup  
        //we get the users data 
        const {fullName,username,password,confirmPassword,gender}=req.body;
        //checked if the pass and confirmPass are same 
        if(password!=confirmPassword)
        {
            return res.status(400).json({error:"Passwords dont match "})
        }
        //checked if  username is unique 
        const user =await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username already exists "});
        }
        //HASH PASSWORD HERE
         const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(password,salt);
        //if the above conditions pass we proceed to make the  user 
        //give them a profile pic 
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}` 
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}` 
        //create a new user model in our database with inputs same as given by the user 
        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender==='male'? boyProfilePic:girlProfilePic
        })
        if(newUser){
            //save the user model to db 
            generateTokenAndSetCookie (newUser._id,res);
            //save user to db
            await newUser.save();
            //res in form of json obj with given fields 
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic,
            })
        }
        else 
        {
            res.status(400).json({error:"Invalid user data"});
        }

    }
    //if error found 
    catch(error)
    {
        console.log("Error in signup controller - ",error.message);
        res.status(500).json({error:"internal server error "});
    }
   
};
export const login=async (req,res)=>{
    try{
        //http req by user to login by putting username and pass
        //we receive the req  
        const {username,password}=req.body;
        //an object that find data of the user 
        const user=await User.findOne({username});
        //if the user exists compare the password with actual pass, else an empty string 
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!isPasswordCorrect || !user )
        {
            return res.status(400).json({error:"Invalid username or password "});
        }
        //login successfull
        //once logged in , a cookie is set up having a unique user id to keep them logged in throughout the session 
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
    }
    catch(error)
    {
        console.log("error in login controller", error.message);
        res.status(500).json({error:"internal server error"});
    }
    
}
export const logout=(req,res)=>{
    try{
         res.cookie("jwt","",{maxAge:0});
         res.status(200).json({message:"Logged out successfully"});
    }
    catch(error)
    {
        console.log("error in logout controller",error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
    
}
