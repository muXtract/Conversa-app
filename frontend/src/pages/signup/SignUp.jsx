import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const [inputs,setInputs]=useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"",
  });
  const {loading ,signup}=useSignup();
  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await signup(inputs);
    console.log(inputs);
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto ' >
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
        <h1 className='text-3xl font-semibold text-center text-black'>
          Conversa<span className='text-black'> Signup </span>
        </h1>
        <form onSubmit={handleSubmit}>
            {/* FULL NAME */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>
                Full Name
              </span>
            </label>
            <input onChange={(e)=>setInputs({...inputs, fullName:e.target.value }) }  value={inputs.fullName} type ='text' placeholder='James Bond' className='w-full input input-bordered h-10'/>
          </div>

          {/* USERNAME */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>
                Username
              </span>
            </label>
            <input onChange={(e) => setInputs({...inputs, username:e.target.value}) }   type='text' placeholder='example@gmail.com' className='w-full input input-bordered h-10'/>
          </div>
          {/* PASSWORD */}
          <div>
            <label className='label '>
              <span className='text-base label-text'>
                Password
              </span>
            </label>
            <input onChange={(e)=>setInputs({...inputs,password:e.target.value})}  value={inputs.password} type='password' placeholder='Enter Password ' className='w-full input input-bordered h-10'/>
          </div>
          {/* CONFIRM PASSWORD */}
          <div>
            <label className='label '>
              <span className='text-base label-text'>
                Confirm Password
              </span>
            </label>
            <input onChange={(e)=>setInputs({...inputs , confirmPassword:e.target.value})} value={inputs.confirmPassword}  type='password' placeholder='Confirm Password ' className='w-full input input-bordered h-10'/>
          </div>
          
        {/* props used at the child component  */}
        <GenderCheckbox  onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          {/* GENDER CHECKBOX */}   
          <Link className='text-sm hover:underline text-green-400 hover:text-green-300 mt-2 inline-block' to='/login'>Already have an account?</Link>
          <div >
            <button disabled={loading} className='btn btn-block btn-sm mt-2 border border-slate-700'>{
              loading?<span className='loading loading-spinner'></span>:"Sign Up"}</button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default SignUp;



// // STARTER CODE
// import React from 'react'
// import GenderCheckbox from './GenderCheckbox';

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto ' >
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
//         <h1 className='text-3xl font-semibold text-center text-black'>
//           Sign Up<span className='text-green-800'> Conversa </span>
//         </h1>
//         <form>
//             {/* FULL NAME */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>
//                 Full Name
//               </span>
//             </label>
//             <input type ='text' placeholder='James Bond' className='w-full input input-bordered h-10'/>
//           </div>

//           {/* USERNAME */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>
//                 Username
//               </span>
//             </label>
//             <input type='text' placeholder='example@gmail.com' className='w-full input input-bordered h-10'/>
//           </div>
//           {/* PASSWORD */}
//           <div>
//             <label className='label '>
//               <span className='text-base label-text'>
//                 Password
//               </span>
//             </label>
//             <input type='password' placeholder='Enter Password ' className='w-full input input-bordered h-10'/>
//           </div>
//           {/* CONFIRM PASSWORD */}
//           <div>
//             <label className='label '>
//               <span className='text-base label-text'>
//                 Confirm Password
//               </span>
//             </label>
//             <input type='password' placeholder='Confirm Password ' className='w-full input input-bordered h-10'/>
//           </div>
          
//         <GenderCheckbox/>
//           {/* GENDER CHECKBOX */}   
//           <a className='text-sm hover:underline text-white hover:text-green-400 mt-2 inline-block' href='#'>Already have an account?</a>
//           <div >
//             <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
//           </div>

//         </form>
//       </div>
      
//     </div>
//   )
// }

