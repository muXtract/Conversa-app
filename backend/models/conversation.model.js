import mongoose from "mongoose"
//conversation model will have 
//1- _id = automat gen by mongodb
//2-participants array -contains the users that are present in the current conversation 
//3- array containing id of messages in this conversation 
//
//
const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        },
    ],
},{timestamps:true});
const Conversation =mongoose.model("Conversation",conversationSchema);
export default Conversation ;