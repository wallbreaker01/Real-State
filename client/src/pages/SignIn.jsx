import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess , signInFailure } from '../redux/user/userSlice';



export default function SignIn() {
   
  const {loading, error} = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({})  // Create a state variable to store the form data
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })  // Update the form data when the input field changes
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

   try{ 
    dispatch(signInStart());
  const response = await fetch('/api/auth/sign-in',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  console.log(data);
 
  if(data.success ===false){
    dispatch(signInFailure(data.message));
    return;
  }
dispatch(signInSuccess(data));
  navigate('/');
 
}catch(error){
  dispatch(signInFailure(error.message));

  }


  }
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className= 'text-3xl text-center my-7 font-semibold'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>

        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
         {loading? 'Loading...' : 'sign in'} </button>

         <OAuth />

      </form>

       <div className='flex  gap-2 m-4'>
        <p className=''>Don't have an account?</p>
        <Link to = {"/sign-up"}>
        <span className='text-blue-700'>Sign Up</span>
        </Link>
       </div>
        {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
