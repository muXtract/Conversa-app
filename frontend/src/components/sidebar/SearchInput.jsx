import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';


const SearchInput = () => {
  const [search,setSearch]=useState("");
  const {setSelectedConversation} =useConversation();
  const{conversations}= useGetConversations();
  const handleSubmit=(e)=>{
    //prevent a default page reload that takes place on submit 
    e.preventDefault();
    if(!search)return ;
    if(search.length<3)
    {
      return toast.error('Search term must be at least 3 char long');
    }
    //search algo - out of all the conversations , find that one whose fullName matches the name user types in search bar 
    const conversation =conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversation)
    {
      setSelectedConversation(conversation);
      setSearch('');
    }
    else
    {
      toast.error('No such  user found ');
    }

  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2' >
        <input value={search} onChange={(e)=>setSearch(e.target.value)}  type='text' placeholder='Search... ' className='input input-bordered rounded-full'/>
        <button type ='submit ' className='btn btn-circle bg-green-500 '>
        <IoSearchSharp  className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput

// STARTER CODE
// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";


// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2' >
//         <input type='text' placeholder='Search... ' className='input input-bordered rounded-full'/>
//         <button type ='submit ' className='btn btn-circle bg-green-500 '>
//         <IoSearchSharp  className='w-6 h-6 outline-none' />
//         </button>
//     </form>
//   )
// }

// export default SearchInput


