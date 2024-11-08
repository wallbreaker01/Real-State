import React from 'react'

export default function CreateListing() {
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7 '>Create Listing</h1>
    <form className='flex flex-col sm:flex-row justify-between gap-6'>
      <div className='flex flex-col gap-4 flex-1'>
        <input type="text" placeholder='title' className='border p-3 rounded-lg bg-slate-200' id='title' maxLength='62' required/>

        <textarea type="text" placeholder='description' className='border p-3 rounded-lg bg-slate-200' id='description' required/>

        <input type="text" placeholder='address' className='border p-3 rounded-lg bg-slate-200' id='address'  required/>

        <div className='flex gap-6 flex-wrap'>
         
         <div className='flex gap-2'>  
           <input type='checkbox' id='sell' className='w-5' />
           <span>
              Sell
           </span>
         </div>


         <div className='flex gap-2'>  
           <input type='checkbox' id='rent' className='w-5' />
           <span>
              Rent
           </span>
         </div>

      
         <div className='flex gap-2'>  
           <input type='checkbox' id='parking' className='w-5' />
           <span>
              Parking
           </span>
         </div>

         <div className='flex gap-2'>  
           <input type='checkbox' id='furnished' className='w-5' />
           <span>
              Furnished
           </span>
         </div>


         <div className='flex gap-2'>  
           <input type='checkbox' id='offer' className='w-5' />
           <span>
              Offer
           </span>
         </div>

      </div>

      <div className='flex gap-6 flex-wrap'>

         <div className='flex flex-col items-center gap-2'>
          <input type="number"  id ='bedrooms' min='1'  max='10' required className='p-1 border rounded-lg border-gray-300' />
          <p>Beds</p>
         </div>


         <div className='flex flex-col items-center gap-2'>
          <input type="number"  id ='bathrooms' min='1'  max='10' required className='p-1 border rounded-lg border-gray-300' />
          <p>Bathrooms</p>
         </div>

         <div className='flex flex-col items-center gap-2'>
          <input type="number"  id ='regularPrice' min='1'  max='10' required className='p-1 border rounded-lg border-gray-300' />
          <p>Regular Price</p>
          <span className='text-xs'>(BDTTK / month)</span>
         </div>

         <div className='flex flex-col items-center gap-2'>
          <input type="number"  id ='dicountedPrice' min='1'  max='10' required className='p-1 border rounded-lg border-gray-300' />
          <p>DiscountedPrice</p>
          <span className='text-xs'>(BDTTK / month)</span>
         </div>


      </div>

      </div>

      <div className='flex flex-col gap-4 flex-1'>
           
         <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be cover (max 6)</span>
         </p>

         <div className="flex gap-4">
            <input type="file" id='images' accept='image/*' multiple className=' p-3 rounded-lg w-full hover:shadow-lg' required/>
            <button className='p-3 rounded-lg border border-green-700 text-green-700 uppercase hover:opacity-85 hover:shadow-lg disabled:opacity-80'>Upload</button>
         </div>

         
      <button className='p-3 rounded-lg bg-green-700 text-white uppercase hover:opacity-85 hover:shadow-lg disabled:opacity-80'>Create listing</button>


      </div>

    </form>

   </main>
  )
}
