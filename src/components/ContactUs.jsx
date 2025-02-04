import React, { useReducer, useRef, useState } from 'react'
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import contactImage from "../assets/Gallery/DSC07999.jpg";
import { HiXMark } from "react-icons/hi2";
import logo from "../assets/images/logo.png"
import toast from 'react-hot-toast';
import axios from 'axios';
const ContactUs = ({ contactUsOpen, handleContactUsClose }) => {
    const apiKey = import.meta.env["VITE_API_SERVICE_URL"];
    const recipientEmail = import.meta.env["VITE_RECIPIENT_EMAIL"];
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const acceptRef = useRef(null);
    const validateForm = () => {
        if(!acceptRef.current.checked)
        {
            toast.error("Please accept the policy");
            return false;
        }
        if (name.trim() == "" || email.trim() == "" || phone.trim() == "" || message.trim() == "") {
            toast.error("Please fill all fields!");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        if (!validateForm()) {
            return;
        }
        const data = {
            to: [recipientEmail??"techdipesh36@gmail.com"],
            subject: "Contact Message from Hotel G Ramayana",
            content: `
            Name : ${name}
            Email : ${email}
            Phone : ${phone}
            Message : ${message}
            `
        }
        try {
            const response = await axios.post(`${apiKey}api/email/sendEmail`,data)
            if(response.status==200)
            {
                toast.success(response.data.message);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                acceptRef.current.checked=false;
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    return (
        <>
            {/* {contactUsOpen && ( */}
            <div className={`fixed top-0 left-0 right-0 h-[100vh] z-[60] grid grid-cols-3 bg-[#C9DADC] transition-all duration-500 ease-linear ${contactUsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className='col-span-2 relative'>
                    <img className='w-full h-full object-cover object-center brightness-75' src={contactImage} alt="" />
                    <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-gray-900 opacity-75 z-10"></div>
                    <button onClick={handleContactUsClose} className='absolute top-5 left-5 text-gray-100 flex gap-2 items-center z-20 tracking-[0.2rem]  hover:!tracking-[0.3rem] duration-300 ease-linear transition-all'>
                        <HiXMark className='text-4xl !font-thin  ' />
                        <h2 className='uppercase text-sm  font-akzidenz mt-0.5'>Close</h2>
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
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
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
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
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
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
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
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2 items-start'>
                            <input type="checkbox" ref={acceptRef} id='accept' className='mt-1 cursor-pointer' />
                            <label htmlFor='accept' className=' text-xs tracking-wider text-gray-600 cursor-pointer'>
                                Please indicate you have read and agree to the privacy policy of Ramayana Hotel. Your details are private and will never be shared with any third parties.
                            </label>
                        </div>
                        <div className='flex justify-center my-4'>
                            <button onClick={handleSubmit} className={`px-8 py-3 border font-bold text-sm uppercase border-gray-500 hover:border-gray-950 hover:text-gray-950 duration-300 text-gray-600 cursor-pointer tracking-[0.15rem]  font-akzidenz`}>submit</button>
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

export default ContactUs