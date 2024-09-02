import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full bg-[#252525] text-white p-3 flex items-center justify-between'>
      <div className='flex gap-[40px] items-center'>
        <div>
            <span className='logo-font text-3xl font-bold'>METAVAULT</span>
        </div>
        <div className='flex gap-[30px]'>
           

        </div>
      </div>
      <div>
        <button className='p-1  hover:bg-blue-800 hover:border-blue-800  rounded-full border border-white '>Create Account</button>
      </div>
    </nav>
  )
}

export default Navbar
