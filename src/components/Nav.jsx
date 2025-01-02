import React from 'react'
import logo from "../assets/images/logo.png"
const Nav = () => {
  return (
    <>
      <div className=' fixed top-0 left-0 w-full z-20'>
        <div className='mx-20 text-white'>
          <div className='flex relative justify-center text-sm items-center py-5 text-white border-b border-gray-400'>
            <div className='w-32'>
              <img src={logo} alt="" className='w-full object-contain brightness-200' />
            </div>
            <div className='flex absolute right-0 top-0 bottom-0 gap-8 items-center'>
              <h2 className='cursor-pointer'>Sign In</h2>
              <h2 className='cursor-pointer'>Contact</h2>
              <a href="" className='px-8 py-2 border font-bold uppercase border-white cursor-pointer'>Book</a>
            </div>
          </div>

          <div className='flex justify-center text-sm py-5'>
            <ul className='uppercase flex gap-4 tracking-wider'>
              <li><a className='cursor-pointer' href="">About</a></li>
              <li><a className='cursor-pointer' href="">Suites</a></li>
              <li><a className='cursor-pointer' href="">Dining</a></li>
              <li><a className='cursor-pointer' href="">Wellness</a></li>
              <li><a className='cursor-pointer' href="">Experiences</a></li>
              <li><a className='cursor-pointer' href="">What's on</a></li>
              <li><a className='cursor-pointer' href="">occasions</a></li>
              <li><a className='cursor-pointer' href="">offers</a></li>
              <li><a className='cursor-pointer' href="">gallery</a></li>
              <li><a className='cursor-pointer' href="">gift card</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav