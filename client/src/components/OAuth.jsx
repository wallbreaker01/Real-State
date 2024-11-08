import React from 'react'

export default function OAuth() {
    const handleGoogleClick = async () => {
    try {

    } catch (error) {
      console.log('Could not sign in with Google',error);
    }
}

  return (
    <div onClick={handleGoogleClick} type='button' className=' text-center bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 cursor-pointer'>
     Continue with Google
    </div>
  )
}
