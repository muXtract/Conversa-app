import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const  [loading ,setLoading] = useState(false);
  const {authUser,setAuthUser}=useAuthContext();
  const signup = async({fullName, username,password,confirmPassword,gender})=>
  {
    //checked for errors in the frontend first 
    const success=handleInputErrors({fullName, username,password,confirmPassword,gender});
    //theres some error in details, return back from this func and dont add  user to db  
    if(!success)return ;
    //if frontend check is passed , go on to add the user to db 
    //the try catch would depend on whether the user was added to the db or not 
    setLoading(true);
    //loading till the user is added to backend 
    try{
        //called the backend api to perform signup  
        const res = await fetch("/api/auth/signup" , {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName, username,password,confirmPassword,gender})
        })
        const data=await res.json();
        //data that came from backend while trying to sign the user up to the db 
        //if error found , throw a new error in this current promise 
        if(data.error)
        {
            throw new Error(data.error);
        }
        //local storage 
        //store user data  as string in local storage  
        localStorage.setItem("chat-user",JSON.stringify(data));
        //context 
        setAuthUser(data);

    }
    //if cant add to db , error would be returned 
    catch(error)
    {
        toast.error(error.message);
    }  
    finally{
        setLoading(false);
    } 
  }
  return {loading,signup};
}

export default useSignup;

function handleInputErrors({fullName, username,password,confirmPassword,gender})
{
    if(!fullName || !username || !password|| !confirmPassword|| !gender   )
        {
            toast.error('Please fill all the fields ');
            return 0;
        }
    if(password!==confirmPassword)
        {
            toast.error('Passwords do not match ');
            return 0;
        }
    if(password.length<6)
    {
        toast.error('Password must be at least 6 characters ')
        return 0;
    }
    return 1;
}