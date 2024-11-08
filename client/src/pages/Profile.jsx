import {useSelector} from 'react-redux'
import { useRef } from 'react';
import { useState } from 'react';
import { updateUserFailure, updateUserSuccess, updateUserStart, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';



export default function Profile() {

  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    try{
       dispatch(updateUserStart());
       const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.data));
        
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleSignOut = async() => {
    try{

      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/sign-out');
      const data = await res.json();
      
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }

     dispatch(signOutUserSuccess(data));

    }catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

 
  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text-3xl font-semibold text-center'>Profile</h1>

     <form onSubmit={handleSubmit}  className='flex flex-col gap-4' >

      <input type="file" ref={fileRef} hidden accept='image/*'/>

      <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt='profile' className='self-center rounded-full mt-4 h-24 w-24 cursor-pointer' />

      <input type="text" placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg bg-slate-300' onChange={handleChange}/>

      <input type="text" placeholder='email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg bg-slate-300' onChange={handleChange}/>

      <input type="password" placeholder='password' defaultValue={currentUser.password} id='password' className='border p-3 rounded-lg bg-slate-300' onChange={handleChange}/>

      <button className='uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'>update</button>
      
      <Link className='bg-green-700 rounded-lg text-center text-white uppercase hover:opacity-85' to = {'/create-listing '}>
          
          Create Listing

      </Link>

     </form>

     <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
     </div>

     </div>
  )
}
