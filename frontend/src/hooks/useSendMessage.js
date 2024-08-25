import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading,setLoading]=useState(false);
   const{messages,setMessages,selectedConversation}= useConversation();
   const sendMessage =async(message)=>{
    setLoading(1);
        try{
            //calling our endpoint 
            const res=await fetch(`/api/messages/send/${selectedConversation._id} `,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                //our api call contains the message in string format 
                body:JSON.stringify({message})
            })
            //getting response from backend after sending message
            const data=await res.json();
            if(data.error)
                {
                    throw new Error(data.error)
                }
            console.log(data);
            setMessages([...messages,data])
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally{
            setLoading(0);
        }
   }
   return {sendMessage,loading}
}

export default useSendMessage
