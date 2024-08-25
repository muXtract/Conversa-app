import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    const login=async(username,password)=>{
        //as the user tries to login set the loading state to true 
        setLoading(true);
        try {
            const res=await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })
            const data =await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            //if the user does exist , add his details to the local storage . 
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);

        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
            //after the login is attempted , put the login state to false   
        }   
    }
    return {loading,login};
}

export default useLogin
