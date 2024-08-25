import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'
const SocketContext=createContext(); 

export const useSocketContext=()=>
    {
        return useContext(SocketContext);
    }

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    //state used to put all the online users in an array 
    const{authUser}=useAuthContext();
    //whenever authUser value is changed ie , the user logs in or out (look at the depend array of useEffect this is run  )
    useEffect(()=>{
        //if authUser exists 
        if(authUser)
        {
            //establish a socket connection 
            const socket=io("https://conversa-aukm.onrender.com/",
                {
                    query:{
                        userId:authUser._id
                    }
                }
            );
            setSocket(socket);
            //add the logged in / connected user in the onlineUsers array state 
            //listens to the getOnlineUsers event and accepts the updates the array of onlineUsers
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return ()=>socket.close();
        }
        //user logs out 
        else 
        {
            if(socket)
            {
                //close the connection 
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
    )
}