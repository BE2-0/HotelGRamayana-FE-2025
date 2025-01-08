import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import contactImage from "../assets/images/contact.jpg"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
const data = [
    
    {
        image: historyimage,
        title: 'Smoky Delights',
        description:
            'Experience the rich taste of smoky creations, prepared with precision and passion over a live fire.',
        link: '#',
    },
    {
        image: bedimage,
        title: 'Flame & Sizzle',
        description:
            'Savor the extraordinary flavors of flame-grilled delicacies in a vibrant, immersive dining experience.',
        link: '#',
    },
    {
        image: dineimage,
        title: 'Tiffin Room',
        description:
            "One of Singapore's oldest North Indian restaurants, serving up the golden age delicacies of the maharajahs since 1892.",
        link: '#',
    },
];
const About = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=''>
                <Nav />
                <div className=' absolute top-0 left-0 w-full'>

                    {/* hero section */}
                    <div className="h-[100vh] relative">
                        <img src={contactImage} className='w-full h-full object-center object-cover' alt="" />
                        <div className='absolute bottom-0 w-full text-center text-white tracking-widest z-20 py-10'>
                            <h2 className='font-bold uppercase font-akzidenz text-sm text-[#fffc]'>About</h2>
                            <h2 className='font-canela text-5xl uppercase !font-thin tracking-wide mt-8' >Birthplace of <i className='lowercase font-light'>stories</i> and</h2>
                            <h2 className='font-canela text-5xl uppercase !font-thin tracking-wide' >legends</h2>
                        </div>
                        {/* Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-gray-900 opacity-70 z-10"></div>
                    </div>
                    {/* end of hero section */}

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-gray-900 opacity-70 z-10"></div>

                    {/* contents */}
                    {/* <div className='p-10 relative'>
                        <div className='absolute bg-[#E2E0D1] top-0 left-0 w-full h-[80vh] -z-10'></div>
                        <div className='w-1/2 m-auto text-center'>
                            <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8' >Quintessential theatres of dining</h2>
                            <p className='text-center text-lg text-gray-600 px-28 mt-5'>
                                At the global crossroads that is Raffles Singapore, discover culinary journeys with diverse cultural histories and contemporary sensorial flair. A mise en scène brought to life by masters of gastronomy and mixology, our gastronomic experiences inspire curiosity and are quite literally in a world of their own.
                            </p>
                        </div>
                        <div className='my-20'>
                            <div className='grid grid-cols-2 gap-10'>
                                {data.map((item, index) => (
                                    <div key={index} className='flex flex-col'>
                                        <div className="h-[30rem]">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-canela text-3xl !font-thin tracking-wide mt-8">
                                                {item.title}
                                            </h2>
                                            <p className="text-base text-gray-600 my-3">{item.description}</p>

                                        </div>
                                        <div className='mt-auto'>
                                            <a
                                                href={item.link}
                                                className="text-base py-1 border-b border-gray-400 text-gray-800"
                                            >
                                                Discover
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    <div className='px-10 bg-[#f6f1ef] flex justify-between gap-20 py-20'>
                        <div className='w-[40%]'>
                            <h2 className='font-canela text-5xl !font-thin tracking-wide' >A veritable oasis in the city</h2>
                            <p className=' text-base text-justify text-gray-600 mt-5'>
                                Ramayana Nepal is at the heart of the vibrant business and civic district, a beacon of classic colonial architecture perfectly preserved among our modern-skyscraper neighbours. Within our walls, the Raffles Arcade is an exciting shopping destination in its own right; and we are walking distance to Singapore International Convention & Exhibition Centre and Esplanade – Theatres on the Bay. It is a two-minute ride on the Mass Rapid Transit to the bustling Orchard Road shopping strip, and Changi Airport is 20 minutes away.
                            </p>
                        </div>
                        <div className='w-[30%]'>
                            <h2 className='font-canela text-3xl font-medium tracking-wide' >Information</h2>
                            <div className='tracking-wide text-sm mt-6'>
                                <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><BsTelephone className='text-base text-gray-600' />+977 015923217</h2>
                                <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><CiMail className='text-lg text-gray-600' />Info@hotelgramayana.com</h2>
                                <h2 className='flex gap-4 items-center border-b border-gray-400 py-2'><CiLocationOn className='text-lg text-gray-600' />Kaldhara Chowk, Near Thamel</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-1/2 m-auto text-center pt-20 pb-10'>
                            <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8' >Explore Ramayana Nepal</h2>
                            <p className='text-center text-lg text-gray-600 px-28 mt-5'>
                                Become part of the legend when you stay at Ramayana Nepal. Take a look around our hotel's exceptional facilities and services.
                            </p>
                        </div>
                    </div>
                    <div className='pb-20 pt-10 px-10 bg-[#f6f1ef]'>
                        <div className=''>
                            <div className='grid grid-cols-3 gap-10'>
                                {data.map((item, index) => (
                                    <div key={index} className='flex flex-col'>
                                        <div className="h-80">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-canela text-3xl !font-thin tracking-wide mt-8">
                                                {item.title}
                                            </h2>
                                            <p className="text-base text-gray-600 my-3">{item.description}</p>

                                        </div>
                                        <div className='mt-auto'>
                                            <a
                                                href={item.link}
                                                className="text-base py-1 border-b border-gray-400 text-gray-800"
                                            >
                                                Discover
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*end of contents */}
                    {/* footer */}
                    <Footer />
                    {/*end of footer */}
                </div>
            </div>
        </>
    )
}

export default About