import React from 'react'

function Navbar() {
  return (
    <div className='max-w-screen-2xl mx-auto container px-6 py-5 md:px-40 shadow-lg h-20 bg-blue-500 text-white'>
      <div className='flex items-center justify-around '>
      <p className='text-3xl font-bold cursor-pointer'>Word
        <span className='text-red-800'>To</span>
        Pdf Converter
        </p>
      <p className='text-3xl font-bold cursor-pointer hover:scale-125 ease-in-out duration-300'>Home</p>
    </div>
    </div>
  )
}

export default Navbar