import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function SignIn() {
   
  const [error , setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({})  // Create a state variable to store the form data
    const navigate = useNavigate();
  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })  // Update the form data when the input field changes
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

   try{ 
    setLoading(true);
  const response = await fetch('/api/auth/sign-in',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
 
  if(data.success ===false){
    setLoading(false);
    setError(data.message);
    return;
  }
  setLoading(false);
  setError(null);
  navigate('/');
 
}catch(error){
  setLoading(false);
  setError(error.message);

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
