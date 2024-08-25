import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  //use this custom hook for login 
  const {loading,login}=useLogin();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      //send username and password to the login function 
      await login(username,password);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto ' >
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
          <h1 className='text-3xl font-semibold text-center text-black'>Conversa
            <span className='text-black'> Login </span>
          </h1>
        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
        <div>
            <label className='label p-2'>
              <span className='text-base label-text'>
                Username
              </span>
            </label>
            <input  value={username} onChange={(e)=>setUsername(e.target.value)}  type ='text' placeholder='Enter Username' className='w-full input input-bordered h-10'/>
        </div>
        {/* PASSWORD */}
        <div>
            <label className='label '>
              <span className='text-base label-text'>
                Password
              </span>
            </label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type ='password' placeholder='Enter Password' className='w-full input input-bordered h-10'/>
        </div>
        <Link to='/signup' className='text-sm text-green-400  hover:underline hover:text-green-300 mt-2 inline-block'>
          {"Don't "} have an account?
        </Link>
        <div>
          <button disabled={loading} className='btn btn-block  btn-sm mt-2'>
            {loading?<span className='loading loading-spinner'></span>: "Login"  }
          </button>
        </div>

        </form>
      </div>

    </div>
  )
}

export default Login;
// STARTER CODE FOR THIS FILE 

{/* <div className='flex flex-col items-center justify-center min-w-96 mx-auto ' >
<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
    <h1 className='text-3xl font-semibold text-center text-black'>Login
      <span className='text-green-800'> Conversa </span>
    </h1>
  <form>
  <div>
      <label className='label p-2'>
        <span className='text-base label-text'>
          Username
        </span>
      </label>
      <input type ='text' placeholder='Enter Username' className='w-full input input-bordered h-10'/>
  </div>
  <div>
      <label className='label '>
        <span className='text-base label-text'>
          Password
        </span>
      </label>
      <input type ='password' placeholder='Enter Password' className='w-full input input-bordered h-10'/>
  </div>
  <a href='#' className='text-sm text-green-600  hover:underline hover:text-green-400 mt-2 inline-block'>
    {"Don't "} have an account?
  </a>
  <div>
    <button className='btn btn-block  btn-sm mt-2'>Login</button>
  </div>

  </form>
</div>

</div> */}

