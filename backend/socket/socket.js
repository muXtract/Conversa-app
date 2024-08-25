import {Server} from 'socket.io'
//built in nodejs module
import http from 'http';
import express from 'express';

const app =express();
const server= http.createServer(app);
//added socket server on top of the express server  
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});
//used in message controller 
//gives the receivers Socket Id  
export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap={};  //{userId:socketId}

//listening for connection events 
//the connection made by logged in user is listened here  
io.on('connection',(socket)=>{
    console.log("a user connected",socket.id);
    //get user Id from the socket connection using handshake 
    const userId=socket.handshake.query.userId;
    //used a userSocketMap to map the userId to socket id 
    if(userId!="undefined") userSocketMap[userId]=socket.id;

    //io.emit is used to send event to all the connected clients
    //send the ids of all active users 
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    //send an array containing all the keys of the map , ie the userIds


    //whenever the client disconnects 
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        //delete the mapping of the userId that just logged out 
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        //again send this to all connected  clients with updated keys of online users 
    })
})

export {app,io,server};