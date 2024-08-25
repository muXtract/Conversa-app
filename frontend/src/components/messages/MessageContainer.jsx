import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages}from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  //on selecting a user , show the chats bw the logged in user and the selected user 
  const {selectedConversation,setSelectedConversation} = useConversation();
 
  useEffect(()=>{
    //cleanup func(unmounts)
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col '>
     {!selectedConversation?(<NoChatSelected/>):
     ( 
        <>
          {/* HEADER */}
              <div className='bg-slate-400 px-4 py-2 mb-2'>
                  <span className='label-text'>To:</span>{""}
                  <span  className='text-gray-900 font-bold '>{selectedConversation.fullName}</span>
              </div>

          <Messages/>

          <MessageInput/> 
        </>
      )
    }
    </div>
  )
}
const NoChatSelected = () => {
  const {authUser}=useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {authUser.fullName} 👋  </p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl mt-3 text-green-400 md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer
