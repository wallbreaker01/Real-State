import {useSelector} from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text-3xl font-semibold text-center'>Profile</h1> 
     <form className='flex flex-col gap-4' >
      <img src={currentUser.avatar} alt='profile' className='self-center rounded-full mt-4 h-24 w-24 cursor-pointer' />
      <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg bg-slate-300 ' />
      <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg bg-slate-300 ' />
      <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg bg-slate-300 ' />
      <button className='uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'>update</button>
     </form>

     <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>
     </div>

     </div>
  )
}
