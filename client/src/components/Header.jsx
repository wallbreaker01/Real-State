import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
   
  const {currentUser} = useSelector(state => state.user);


  return (
    <header className='bg-slate-200 shadow-md'>
   <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>

    <Link to='/'>
   <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className="text-slate-500">Real</span>
        <span className='text-slate-700'>Estate</span>
        
      </h1>
    </Link>
      

     <form className='bg-slate-100 rounded-lg flex justify-between items-center'>
      <input type="text" placeholder="Search.." className='bg-transparent focus:outline-none w-24 sm:w-64'  />
      <FaSearch className='text-slate-500' />
     </form>

     <ul className='flex gap-4 '>

       <Link to ='/'> 
       <li className='text-slate-500 hidden sm:inline hover:underline cursor-pointer'>Home</li>
       </Link>

       <Link to ='/about'>
        <li className='text-slate-500 hidden sm:inline hover:underline cursor-pointer'>About</li>
        </Link>
        
        <Link to ='/sign-in'>

        { currentUser ? (
           
           <img src={currentUser.avatar} alt="Profile" className='rounded-full h-7 w-7 object-cover'/>

        ): (    
        <li className='text-slate-500  hover:underline cursor-pointer'>SignIn</li>
      )}

       </Link>
      
        
     </ul>
   </div>

    </header>
  )
}
