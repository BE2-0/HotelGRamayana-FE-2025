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

  const handleLogout = (e) => {
    e.preventDefault();
    doSignOut();
    toast.success("Logged Out Successfully");
  }

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className="z-20 relative tracking-wider" >
        <div className={` ${isTextBlack ? "text-black" : "text-white"}`}>
          <div className={`flex relative justify-center text-sm items-center py-5 ${isTextBlack ? "text-black border-black" : "text-white border-gray-400"} border-b  mx-10`}>
            <Link to="/">
              <div className='w-32'>
                <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
              </div>
            </Link>
            <div className='flex absolute right-0 top-0 bottom-0 gap-8 items-center'>
              {userLoggedIn && (
                <button onClick={() => { setIsSettingOpen(true) }} className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Settings</button>
              )}
              {!userLoggedIn && (
                <Link to="/login" className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Sign In</Link>
              )}
              {userLoggedIn && (
                <button onClick={handleLogout} className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`}>Sign Out</button>
              )}
              <h2 className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} onClick={handleContactUsOpen}>Contact</h2>
              {!hideBookButton && (
                <a target='_blank' href="/booking" className={`px-8 py-2 border font-bold text-xs uppercase ${isTextBlack ? "border-black" : "border-white"} cursor-pointer  font-akzidenz`}>Book</a>
              )}
            </div>
          </div>

          {!hideNav && (
            <div className={`flex  items-center text-sm py-5 px-10 justify-center`}>
              <ul className='uppercase flex gap-4 tracking-widest'>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "about" ? "before:!w-full" : ""}`} to="/about">About</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "suites" ? "before:!w-full" : ""}`} to="/suites">Suites</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "dining" ? "before:!w-full" : ""}`} to="/dining">Dining</Link></li>
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "blog" ? "before:!w-full" : ""}`} to="/blog">Blog</Link></li>
                {/* <li><a className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} href="">Experiences</a></li> */}
                {/* <li><a className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} href="">What's on</a></li> */}
                {/* <li><a className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} href="">occasions</a></li> */}
                {/* <li><a className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} href="">offers</a></li> */}
                <li><Link className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"} ${route == "gallery" ? "before:!w-full" : ""}`} to="/gallery">Gallery</Link></li>
                {/* <li><a className={`${navStyle}  ${isTextBlack ? "before:bg-gray-600" : "before:bg-gray-300"}`} href="">gift card</a></li> */}
              </ul>
            </div>
          )}

        </div>
      </div>

      {!hideNav && (
        <div className={`z-50 w-full tracking-wider ${isDown ? "fixed top-0 left-0 transform translate-y-0 opacity-100 pointer-events-auto" : "transform -translate-y-full opacity-0 pointer-events-none"
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
                {/* <li><a className={`${navStyle}  before:bg-gray-600`} href="">Experiences</a></li> */}
                {/* <li><a className={`${navStyle}  before:bg-gray-600`} href="">What's on</a></li> */}
                {/* <li><a className={`${navStyle}  before:bg-gray-600`} href="">occasions</a></li> */}
                {/* <li><a className={`${navStyle}  before:bg-gray-600`} href="">offers</a></li> */}
                <li><Link className={`${navStyle}  before:bg-gray-600 ${route == "gallery" ? "before:!w-full" : ""}`} to="/gallery">Gallery</Link></li>
                {/* <li><a className={`${navStyle}  before:bg-gray-600`} href="">gift card</a></li> */}
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

      <ContactUs contactUsOpen={contactUsOpen} handleContactUsClose={handleContactUsClose} />
      <Setting open={isSettingOpen} setOpen={setIsSettingOpen} setLoading={setLoading} handleClose={() => { setIsSettingOpen(false) }} text={`Settings`} />
      <OfferPopup />
    </>
  )
}

export default Nav