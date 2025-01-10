import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import dine2image from "../assets/images/dining2.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import blogimage from "../assets/Gallery/DSC08022.jpg"
const data = [
    {
        image: aboutimage,
        title: "Butcher's Block",
        description:
            'Discover the wonderful depths of flavour that only pure wood-fire can forge, in this avant-garde atmospheric live cooking experience.',
        link: '#',
    },
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
const Blog = () => {
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
                        <img src={blogimage} className='w-full h-full object-top object-cover' alt="" />
                        <div className='absolute bottom-0 w-full text-center text-white tracking-widest z-20 py-10'>
                            <h2 className='font-bold uppercase font-akzidenz text-sm text-[#fffc]'>Blog</h2>
                            <h2 className='font-canela text-5xl uppercase !font-thin tracking-wide mt-8' >A JOURNEY THROUGH</h2>
                            <h2 className='font-canela text-5xl italic !font-thin tracking-wide' >inspiration</h2>
                        </div>
                        {/* Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-gray-900 opacity-70 z-10"></div>
                    </div>
                    {/* end of hero section */}

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-gray-900 opacity-70 z-10"></div>

                    {/* contents */}
                    <div className='p-10 relative'>
                        <div className='absolute bg-[#E2E0D1] top-0 left-0 w-full h-[80vh] -z-10'></div>
                        <div className='w-1/2 m-auto text-center'>
                            <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8' >Our Stories, Your Inspiration</h2>
                            <p className='text-center text-lg text-gray-600 px-28 mt-5'>
                                Delve into a world of ideas, experiences, and creativity. Through our carefully curated blogs, we aim to inspire, inform, and connect you to the heart of what makes Ramayana Nepal truly unique. From cultural insights to lifestyle tips, each story is crafted to leave a lasting impression.
                            </p>
                        </div>
                        <div className='my-20'>
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

export default Blog