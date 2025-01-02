import React from 'react'
import logo from "../assets/images/logo.png"
import footerimage from "../assets/images/footer.png"
import { MdOutlineArrowRightAlt } from "react-icons/md";
const Footer = () => {
    return (
        <>
            <footer className='p-20' style={{
                backgroundImage: `url(${footerimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: -1 // Ensures the pseudo-element is behind the content
            }}>
                <div className='grid grid-cols-4 gap-10 text-white'>
                    <div className='flex justify-center'>
                        <div className='w-40'>
                            <img src={logo} alt="" className='w-full object-contain brightness-[2.5]' />
                        </div>
                    </div>
                    <div className='text-sm tracking-wide flex justify-center'>
                        <div>
                            <div>
                                <h2 className='hover:underline cursor-pointer'>+977 015923217</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Info@hotelgramayana.com</h2>
                            </div>
                            <div className='mt-8'>
                                <h2 className='cursor-pointer'>Kaldhara Chowk</h2>
                                <h2 className='mt-1 cursor-pointer'>Near Thamel, Nepal</h2>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm tracking-wide flex justify-center'>
                        <div>
                            <div>
                                <h2 className='hover:underline cursor-pointer'>Reserve Your Stay</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Manage Reservation</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Get Directions</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Explore Singapore</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Gift Cards</h2>
                                <h2 className='hover:underline mt-1 cursor-pointer'>Contact Us</h2>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm tracking-wide flex justify-center'>
                        <div>
                            <p className='text-xs'>Sign up for news from Ramayana Hotel Nepal</p>
                            <div className='flex w-full items-center gap-4'>
                                <div className=''>
                                    <input type="text"
                                        placeholder='Email Address'
                                        className='p-4 bg-transparent border mt-3 border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-auto tracking-wider placeholder:text-gray-400' />
                                </div>
                                <div className='flex items-center m-auto'>
                                    <button className="flex text-base items-center cursor-pointer m-auto">
                                        Submit
                                        <span className="ml-2 m-auto">
                                            <MdOutlineArrowRightAlt className='text-2xl' />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer