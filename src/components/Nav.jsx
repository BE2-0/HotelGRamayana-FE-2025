import React, { useEffect, useRef } from 'react'
import logo from "../assets/images/logo.png"
import logo2 from "../assets/images/logo2.png"
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ContactUs from './ContactUs'
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../firebase/auth'
import toast from 'react-hot-toast'
import Setting from './Setting'
import Loader from '../common/Loader'
import OfferPopup from './OfferPopup'
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const Nav = ({ isTextBlack, hideNav, hideBookButton }) => {
  const navStyle = "cursor-pointer relative before:absolute before:bottom-0 pb-0.5 before:left-1/2 before:h-0.5 before:w-0 before:rounded-5xl before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-linear hover:before:w-full hover:before:scale-x-100 hover:before:transform-origin-center"
  const [isDown, setIsDown] = useState(false);
  const triggerHeight = 200; // Height in pixels to toggle isDown
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname.split('/')[1];
  const { userLoggedIn } = useAuth();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable background scrolling
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleContactUsOpen = () => {
    document.body.style.overflow = "hidden";
    setContactUsOpen(true);
    setIsSidebarOpen(false);
  }

  const handleContactUsClose = () => {
    document.body.style.overflow = "auto";
    setContactUsOpen(false);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    doSignOut();
    toast.success("Logged Out Successfully");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className="z-20 relative tracking-wider " >
        <div className={` ${isTextBlack ? "text-black" : "text-white"}`}>
          <div className={`flex relative justify-center text-sm items-center py-5 ${isTextBlack ? "text-black border-black" : "text-white border-gray-400"} lg:border-b mx-4 lg:mx-10`}>
            <Link to="/">
              <div className='lg:w-32 w-24'>
                <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
              </div>
            </Link>
            <div className='absolute right-0 top-0 bottom-0 gap-8 items-center flex '>
              {userLoggedIn && (
                <button onClick={() => { setIsSettingOpen(true) }} className={`${navStyle} hidden lg:block  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Settings</button>
              )}
              {!userLoggedIn && (
                <Link to="/login" className={`${navStyle} hidden lg:block  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Sign In</Link>
              )}
              {userLoggedIn && (
                <button onClick={handleLogout} className={`${navStyle} hidden lg:block  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Sign Out</button>
              )}
              <h2 className={`${navStyle} hidden lg:block  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} onClick={handleContactUsOpen}>Contact</h2>
              {!hideBookButton && (
                <a target='_blank' href="/booking" className={`px-2.5 lg:px-8 py-1.5 lg:py-2 border font-bold text-xs uppercase ${isTextBlack ? "border-black" : "border-white"} cursor-pointer  font-akzidenz`}>Book</a>
              )}
            </div>

            {/* button to open toggle mobile nav */}
            <div className='absolute left-0 top-1/2 -translate-y-1/2 block lg:hidden'>
              <FaBars className='text-2xl' onClick={() => { setIsSidebarOpen(true) }} />
            </div>
            {/*end of button to open toggle mobile nav */}
          </div>

          {!hideNav && (
            <div className={`items-center text-sm py-5 px-10 justify-center hidden lg:flex `}>
              <ul className='uppercase flex gap-4 tracking-widest'>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "about" ? "before:!w-full" : ""}`} to="/about">About</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "suites" ? "before:!w-full" : ""}`} to="/suites">Suites</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "dining" ? "before:!w-full" : ""}`} to="/dining">Dining</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "blog" ? "before:!w-full" : ""}`} to="/blog">Blog</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "gallery" ? "before:!w-full" : ""}`} to="/gallery">Gallery</Link></li>
              </ul>
            </div>
          )}

        </div>
      </div>

      {!hideNav && (
        <div className={`hidden lg:block z-50 w-full tracking-wider ${isDown ? "fixed top-0 left-0 transform translate-y-0 opacity-100 pointer-events-auto" : "transform -translate-y-full opacity-0 pointer-events-none"
          } transition-transform duration-300 ease-in-out`} >
          <div className=' text-white'>
            <div className={`flex  items-center text-sm py-2 px-10 bg-primary  shadow-lg text-black justify-between`}>
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
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "about" ? "before:!w-full" : ""}`} to="/about">About</Link></li>
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "suites" ? "before:!w-full" : ""}`} to="/suites">Suites</Link></li>
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "dining" ? "before:!w-full" : ""}`} to="/dining">Dining</Link></li>
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "blog" ? "before:!w-full" : ""}`} to="/blog">Blog</Link></li>
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "gallery" ? "before:!w-full" : ""}`} to="/gallery">Gallery</Link></li>
              </ul>
              <div className={`flex gap-8 items-center`}>
                {userLoggedIn && (
                  <button onClick={() => { setIsSettingOpen(true) }} className={`${navStyle} before:bg-gray-600`}>Settings</button>
                )}
                {!userLoggedIn && (
                  <Link to="/login" className={`${navStyle}  before:bg-gray-600`}>Sign In</Link>
                )}
                {userLoggedIn && (
                  <button onClick={handleLogout} className={`${navStyle}  before:bg-gray-600`}>Sign Out</button>
                )}
                <h2 className={`${navStyle}  before:bg-gray-600`} onClick={handleContactUsOpen}>Contact</h2>
                <a target='_blank' href="/booking" className='px-8 py-2 border font-bold uppercase border-black cursor-pointer  font-akzidenz text-xs'>Book</a>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* mobile nav */}
      <div className=''>
        <aside
          id="default-sidebar"
          className={`block lg:hidden  fixed top-0 lg:left-0  ${isSidebarOpen ? "left-0" : "-left-full"} w-full h-screen bg-white  transition-[left] duration-500 ease-linear z-[997] `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 overflow-y-auto bg-primary relative">
            <div className="px-2 flex items-center justify-center gap-2 text-blue-600 border-b pb-5 border-black dark:text-white my-4 relative ">
              {/* <IoLogoBuffer className="text-5xl" /> */}
              <Link to="/">
                <div className="w-24">
                  <img src={logo} className="w-full" alt="" />
                </div>
              </Link>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 block lg:hidden text-black'>
                <FaXmark className='text-2xl font-bold' onClick={() => { setIsSidebarOpen(false) }} />
              </div>
            </div>
            <ul className="space-y-2 mt-5 text-xl">
              <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "about" ? "before:!w-full" : ""}`} to="/about">About</Link></li>
              <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "suites" ? "before:!w-full" : ""}`} to="/suites">Suites</Link></li>
              <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "dining" ? "before:!w-full" : ""}`} to="/dining">Dining</Link></li>
              <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "blog" ? "before:!w-full" : ""}`} to="/blog">Blog</Link></li>
              <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "gallery" ? "before:!w-full" : ""}`} to="/gallery">Gallery</Link></li>
              <div className={`flex flex-col gap-2`}>

                <h2 className={`${navStyle}  before:bg-gray-600`} onClick={handleContactUsOpen}>Contact</h2>
                {/* <a target='_blank' href="/booking" className='px-8 py-2 border font-bold uppercase border-black cursor-pointer  font-akzidenz text-xs'>Book</a> */}
                {userLoggedIn && (
                  <button onClick={() => { setIsSettingOpen(true) }} className={`${navStyle} text-left before:bg-gray-600`}>Settings</button>
                )}


              </div>
            </ul>
            <div className='absolute bottom-0 left-0 w-full bg-red-600'>
              {userLoggedIn && (
                <button onClick={handleLogout} className={`${navStyle}  before:bg-gray-600 text-left`}>Sign Out</button>
              )}
              {!userLoggedIn && (
                <Link to="/login" className={`${navStyle}  before:bg-gray-600`}>Sign In</Link>
              )}
              asfdasdf
            </div>
          </div>
        </aside>
      </div>
      <div onClick={toggleSidebar} className={`fixed left-0 top-0 w-full h-screen z-[996] bg-white transition-all duration-300 ease-linear  ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0  pointer-events-none"} `}>
      </div>
      {/*end of mobile nav */}

      <ContactUs contactUsOpen={contactUsOpen} handleContactUsClose={handleContactUsClose} />
      <Setting open={isSettingOpen} setOpen={setIsSettingOpen} setLoading={setLoading} handleClose={() => { setIsSettingOpen(false) }} text={`Settings`} />
      <OfferPopup />
    </>
  )
}

export default Nav