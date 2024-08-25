import Conversation from "../models/conversation.model.js"
import  Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";
//on getting the message from  the user , a message model is created 
//now this message is either added to a prexisting conversation model if the participants involved are same 
//or a new conversation model is created and then the message is added 
export const sendMessage=async(req,res)=>{
    try{
        //getting message from user 
        //post req is sent  
        const {message}=req.body;  
        const {id:receiverId}=req.params;   
        //logged in user trying to send the message 
        const senderId=req.user._id;
        //finding a preexisiting conversation between the current 2 participants 
        let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        //if no conversation exists , message being sent for the first  time between these 2 users 
        if(!conversation)
        {
            //new participant arr created in conversation model
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }
        //new message model is created for each message being sent 
        const newMessage=new Message(
           { senderId,
            receiverId,
            message,}
        )
        if(newMessage)
        {
            //message id pushed to messages arr 
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
        //this  will run in parallel 
        await Promise.all([conversation.save() ,newMessage.save()]);
        //till here the msg sent by the sender has been saved to the db 
        //now we want to immediately send it over to the receiver (in real time)
        
        //SOCKET IO will go here
        //get the receivers socket id 
        const receiverSocketId=getReceiverSocketId(receiverId); 
        if(receiverSocketId)
        {
            //the new message is sent to a single client in the form of an event which we have to catch in 
            //the client side 
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("error in send message controller ",error.message);
        res.status(500).json({error:"Internal server error "});
    }
}
export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const senderId=req.user.id;
        const conversation =await Conversation.findOne({
            participants:{ $all: [ userToChatId,senderId]},
        }).populate("messages");
        //not reference but actual msgs 
        if(!conversation)
        {
            return res.status(200).json([]);
        }
        const messages =conversation.messages;
        res.status(200).json(messages);
    }
    catch(error)
    {
        console.log("error in getMessages controller ",error.message);
        res.status(500).json({error:"Internal server error "});
    }
}