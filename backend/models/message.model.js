import mongoose from "mongoose"
//the whole message model in our mongodb will have 
//1- _id = (automatically gen by mongodb)
//2-   senderId
//3- receiverId
//4-msg body 

const messageSchema=new mongoose.Schema({
    
    senderId:{
        //senderId using mongoDb of logged in user 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        //receiver ID using mongoDb
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true
    }
    //createdAt,updatedAt=>
},{timestamps:true});
const Message=mongoose.model("Message",messageSchema);
export default Message;


