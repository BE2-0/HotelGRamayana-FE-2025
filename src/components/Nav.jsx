import React, { useEffect, useRef } from 'react'
import logo from "../assets/images/logo.png"
import logo2 from "../assets/images/logo2.png"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = ({ isTextBlack }) => {
  const [isDown, setIsDown] = useState(false);
  const triggerHeight = 200; // Height in pixels to toggle isDown

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > triggerHeight && !isDown) {
        setIsDown(true);
      } else if (currentScrollPosition <= triggerHeight && isDown) {
        setIsDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDown]);
  return (
    <>
      <div className="z-20 relative tracking-wider" >
        <div className={` ${isTextBlack ? "text-black" : "text-white"}`}>
          <div className={`flex relative justify-center text-sm items-center py-5 ${isTextBlack ? "text-black border-black" : "text-white border-gray-400"} border-b  mx-20`}>
            <Link to="/">
              <div className='w-32'>
                <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
              </div>
            </Link>
            <div className='flex absolute right-0 top-0 bottom-0 gap-8 items-center'>
              <h2 className='cursor-pointer'>Sign In</h2>
              <h2 className='cursor-pointer'>Contact</h2>
              <a href="" className={`px-8 py-2 border font-bold text-xs uppercase ${isTextBlack ? "border-black" : "border-white"} cursor-pointer  font-akzidenz`}>Book</a>
            </div>
          </div>

          <div className={`flex  items-center text-sm py-5 px-10 justify-center`}>
            <ul className='uppercase flex gap-4 tracking-widest'>
              <li><a className='cursor-pointer' href="">About</a></li>
              <li><a className='cursor-pointer' href="">Suites</a></li>
              <li><Link className='cursor-pointer' to="/dining">Dining</Link></li>
              <li><a className='cursor-pointer' href="">Wellness</a></li>
              <li><a className='cursor-pointer' href="">Experiences</a></li>
              <li><a className='cursor-pointer' href="">What's on</a></li>
              <li><a className='cursor-pointer' href="">occasions</a></li>
              <li><a className='cursor-pointer' href="">offers</a></li>
              <li><Link className='cursor-pointer' to="/gallery">Gallery</Link></li>
              <li><a className='cursor-pointer' href="">gift card</a></li>
            </ul>
          </div>
        </div>
      </div>


      <div className={`z-50 w-full tracking-wider ${isDown ? "fixed top-0 left-0 transform translate-y-0 opacity-100 pointer-events-auto" : "transform -translate-y-full opacity-0 pointer-events-none"
        } transition-transform duration-300 ease-in-out`} >
        <div className=' text-white'>
          <div className={`flex  items-center text-sm py-2 px-10 bg-white shadow-lg text-black justify-between`}>
            <div>
              <Link to="/" className='cursor-pointer'>
                <div className={`flex items-center gap-2`}>
                  <div className='w-10 '>
                    <img src={logo2} alt="" className='w-full object-contain' />
                  </div>
                  <div className='px-3 border-l border-gray-800'>
                    <h2 className='text-sm  tracking-widest uppercase font-medium font-akzidenz'>Ramayana</h2>
                  </div>
                </div>
              </Link>
            </div>
            <ul className='uppercase flex gap-4 tracking-widest'>
              <li><a className='cursor-pointer' href="">About</a></li>
              <li><a className='cursor-pointer' href="">Suites</a></li>
              <li><Link className='cursor-pointer' to="/dining">Dining</Link></li>
              <li><a className='cursor-pointer' href="">Wellness</a></li>
              <li><a className='cursor-pointer' href="">Experiences</a></li>
              <li><a className='cursor-pointer' href="">What's on</a></li>
              <li><a className='cursor-pointer' href="">occasions</a></li>
              <li><a className='cursor-pointer' href="">offers</a></li>
              <li><Link className='cursor-pointer' to="/gallery">Gallery</Link></li>
              <li><a className='cursor-pointer' href="">gift card</a></li>
            </ul>
            <div className={`flex gap-8 items-center`}>
              <h2 className='cursor-pointer'>Sign In</h2>
              <h2 className='cursor-pointer'>Contact</h2>
              <a href="" className='px-8 py-2 border font-bold uppercase border-black cursor-pointer  font-akzidenz text-xs'>Book</a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Nav