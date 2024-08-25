import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation,lastIdx}) => {
    const {selectedConversation,setSelectedConversation}=useConversation();
    const isSelected=selectedConversation?._id===conversation._id;
    const {onlineUsers}=useSocketContext();
    const isOnline=onlineUsers.includes(conversation._id);
  return (
    <>
        <div 
            onClick={()=>setSelectedConversation(conversation)}
        className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer
            ${isSelected?"bg-green-500":""}
            `} >
            <div className={`${isOnline?"online":""} avatar  `}>
                <div className='w-12 rounded-full'>
                    <img src={conversation.profilePic} alt="user avatar"></img>
                </div>
            </div>
            <div className=' flex flex-col flex-1 '>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-black'>{conversation.fullName}</p>
                    
                </div>
            </div>
        </div>
        {!lastIdx&&<div className='divider my-0 py-0 h-1'/>}
    </>
        
    
  )
}

export default Conversation

// STARTER CODE
// import React from 'react'

// const Conversation = () => {
//   return (
//     <>
//         <div className='flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer ' >
//             <div className='avatar online '>
//                 <div className='w-12 rounded-full'>
//                     <img src=' ' alt="user avatar"></img>
//                 </div>
//             </div>
//             <div className=' flex flex-col flex-1 '>
//                 <div className='flex gap-3 justify-between'>
//                     <p className='font-bold text-gray-200'>Vijay Narayanan</p>
//                     <span className='text-xl'>🎃</span>
//                 </div>
//             </div>
//         </div>
//         <div className='divider my-0 py-0 h-1'/>
//     </>
        
    
//   )
// }

// export default Conversation
