import React, { useEffect, useRef } from 'react'
import logo from "../assets/images/logo.png"
import logo2 from "../assets/images/logo2.png"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import contactImage from "../assets/images/contact.jpg";
import { IoMdClose } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
const Nav = ({ isTextBlack, hideNav, hideBookButton }) => {
  const [isDown, setIsDown] = useState(false);
  const triggerHeight = 200; // Height in pixels to toggle isDown
  const [contactUsOpen, setContactUsOpen] = useState(false);
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

  const handleContactUsOpen = () => {
    document.body.style.overflow = "hidden";
    setContactUsOpen(true);
  }

  const handleContactUsClose = () => {
    document.body.style.overflow = "auto";
    setContactUsOpen(false);
  }
  return (
    <>
      <div className="z-20 relative tracking-wider" >
        <div className={` ${isTextBlack ? "text-black" : "text-white"}`}>
          <div className={`flex relative justify-center text-sm items-center py-5 ${isTextBlack ? "text-black border-black" : "text-white border-gray-400"} border-b  mx-10`}>
            <Link to="/">
              <div className='w-32'>
                <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
              </div>
            </Link>
            <div className='flex absolute right-0 top-0 bottom-0 gap-8 items-center'>
              <h2 className='cursor-pointer'>Sign In</h2>
              <h2 className='cursor-pointer' onClick={handleContactUsOpen}>Contact</h2>
              {!hideBookButton && (
                <a target='_blank' href="/booking" className={`px-8 py-2 border font-bold text-xs uppercase ${isTextBlack ? "border-black" : "border-white"} cursor-pointer  font-akzidenz`}>Book</a>
              )}
            </div>
          </div>

          {!hideNav && (
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
          )}

        </div>
      </div>

      {!hideNav && (
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
                <h2 className='cursor-pointer' onClick={handleContactUsOpen}>Contact</h2>
                <a target='_blank' href="/booking" className='px-8 py-2 border font-bold uppercase border-black cursor-pointer  font-akzidenz text-xs'>Book</a>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* {contactUsOpen && ( */}
        <div className={`fixed top-0 left-0 right-0 h-[100vh] z-[60] grid grid-cols-3 bg-[#C9DADC] transition-all duration-500 ease-linear ${
          contactUsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <div className='col-span-2 relative'>
            <img className='w-full h-full object-cover object-center brightness-75' src={contactImage} alt="" />
            <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-gray-900 opacity-75 z-10"></div>
            <button onClick={handleContactUsClose} className='absolute top-5 left-5 text-gray-100 flex gap-2 items-center z-20'>
              <HiXMark className='text-4xl !font-thin  ' />
              <h2 className='uppercase tracking-[0.2rem] text-sm  font-akzidenz mt-0.5'>Close</h2>
            </button>
          </div>
          <div className='p-14 overflow-y-auto'>
            <div className='flex justify-center'>
                <div className='w-32'>
                  <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
                </div>
            </div>
            <div className='my-5 text-sm tracking-wider text-gray-600 leading-5 text-center'>
              <p className=''>
                Thank you for your interest in Ramayana Nepal.
              </p>
              <p>
                Please would you kindly provide us with <br /> details of your request using the form below.
              </p>
            </div>

            <div className='tracking-wide text-sm'>
              <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><BsTelephone className='text-base text-gray-600' />+977 015923217</h2>
              <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><CiMail className='text-lg text-gray-600' />Info@hotelgramayana.com</h2>
              <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><CiLocationOn className='text-lg text-gray-600' />Kaldhara Chowk, Near Thamel</h2>
            </div>

            <div className='my-10 tracking-wider flex flex-col gap-5'>
              <div>
                <h2 className='font-akzidenz text-xs mb-2 text-gray-600'>Name *</h2>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                    placeholder=""
                  />
                </div>
              </div>
              <div>
                <h2 className='font-akzidenz text-xs mb-2 text-gray-600'>Email *</h2>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                    placeholder=""
                  />
                </div>
              </div>
              <div>
                <h2 className='font-akzidenz text-xs mb-2 text-gray-600'>Phone *</h2>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                    placeholder=""
                  />
                </div>
              </div>
              <div>
                <h2 className='font-akzidenz text-xs mb-2 text-gray-600'>Message *</h2>
                <div className="relative">
                  <textarea
                    type="text"
                    className="w-full px-4 h-20 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                    placeholder=""
                  />
                </div>
              </div>
              <div className='flex gap-2 items-start'>
                <input type="checkbox" id='accept' className='mt-1 cursor-pointer' />
                <label htmlFor='accept' className=' text-xs tracking-wider text-gray-600 cursor-pointer'>
                  Please indicate you have read and agree to the privacy policy of Ramayana Hotel. Your details are private and will never be shared with any third parties.
                </label>
              </div>
              <div className='flex justify-center my-4'>
                <button className={`px-8 py-3 border font-bold text-sm uppercase border-gray-500 hover:border-gray-950 hover:text-gray-950 duration-300 text-gray-600 cursor-pointer tracking-[0.15rem]  font-akzidenz`}>submit</button>
              </div>
              <div>
                <p className=' text-xs tracking-wider text-gray-600 text-center'>
                  The site is protected by reCAPTCHA and the <br /> Google Privacy Policy and Terms of Service apply.
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* )} */}

    </>
  )
}

export default Nav