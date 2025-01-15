import React, { useEffect, useState } from 'react'
import testimonialimage from "../assets/images/DSC08006.jpg"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
const testimonials = [
    {
        name: "Edward Hisley",
        publishAt: "a week ago",
        text: "I have been using pagedone for several months now, and I must say that it has made my life a lot easier. The platform's intuitive interface and ease of use have allowed me to manage my finances more effectively and make informed investment decisions. I particularly like the product's auto-tracking feature, which has saved me a lot of time and effort.",
        stars: 4,
        reviewerPhotoUrl:"https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?rs=1&pid=ImgDetMain"
    },
    {
        name: "Jane Doe",
        publishAt: "a day ago",
        text: "The platform has completely transformed the way I approach project management. Its tools and insights are second to none, making my work much more streamlined and efficient.",
        stars: 5,
        reviewerPhotoUrl:"https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?rs=1&pid=ImgDetMain"
    },
    {
        name: "Michael Lee",
        publishAt: "3 days ago",
        text: "Pagedone has been a game-changer for my daily workflows. The automation features have reduced my manual efforts by half, allowing me to focus more on innovation and development tasks.",
        stars: 5,
        reviewerPhotoUrl:"https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?rs=1&pid=ImgDetMain"
    },
    {
        name: "Samantha Green",
        publishAt: "2 weeks ago",
        text: "I love how easy it is to generate reports and analyze data with pagedone. It’s been a crucial tool for my team, enabling us to deliver better insights to our clients.",
        stars: 4,
        reviewerPhotoUrl:"https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?rs=1&pid=ImgDetMain"
    },
    {
        name: "David Clarke",
        publishAt: "a month ago",
        text: "Using pagedone has significantly improved our organization’s efficiency. From project tracking to real-time collaboration, it has everything we need to stay ahead in our industry.",
        stars: 5,
        reviewerPhotoUrl:"https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?rs=1&pid=ImgDetMain"
    }
];



const Testimonial = () => {
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetchReviewsFromGoogle();
    }, [])

    const fetchReviewsFromGoogle = async () => {
        const datasetId=await fetchDatasetId();
        if (datasetId && datasetId.trim() !== "") {
            console.log("Dataset ID is valid:", datasetId);
            fetchReviewsFromDataSet(datasetId);
        }

    }

    const fetchDatasetId = async () => {
        try {
            const response = await axios.get("https://api.apify.com/v2/datasets?unnamed=true&desc=true&limit=1", {
                headers: {
                    Authorization: "Bearer apify_api_ufQbz4QI9ljCsQvjvKDaKVyTBl0Pr31DsIWb"
                }
            });
            if (response.status == 200) {
                const datasetId = response.data.data.items[0].id;
                return datasetId;
            }
            return null;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const fetchReviewsFromDataSet = async (datasetId) => {
        try {
            const response = await axios.get(`https://api.apify.com/v2/datasets/${datasetId}/items`);
            if (response.status == 200) {
                setReviews(response.data);
            }
            // return null;

        } catch (error) {
            console.log(error);
            // return null;
        }
    }
    return (
        <>

            {/* testimonial */}
            <div className='h-[60vh] relative' >
                <div className='absolute top-0 right-56 h-full flex items-center z-10'>
                    <button className={`testimonial-next text-black  border ${disableNext ? "bg-gray-400 opacity-75 border-gray-400 cursor-default" : "opacity-100 bg-white border-white hover:text-white hover:bg-transparent cursor-pointer"}  transition-all duration-300 ease-linear  p-3 rounded-full`}>
                        <FaArrowRight className='text-lg' />
                    </button>
                </div>
                <div className='absolute top-0 left-56 h-full flex items-center z-10'>
                    <button className={`testimonial-prev text-black  border ${disablePrev ? "bg-gray-400 opacity-75 border-gray-400 cursor-default" : "opacity-100 bg-white border-white hover:text-white hover:bg-transparent cursor-pointer"}  transition-all duration-300 ease-linear p-3 rounded-full`}>
                        <FaArrowLeft className='text-lg' />
                    </button>
                </div>
                <div
                    className="absolute inset-0 brightness-50"
                    style={{
                        backgroundImage: `url(${testimonialimage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: -1 // Ensures the pseudo-element is behind the content
                    }}
                ></div>
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={{
                        prevEl: '.testimonial-prev',
                        nextEl: '.testimonial-next',
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    fadeEffect={{ crossFade: true }}
                    // modules={[EffectFade, Navigation, Pagination]}
                    modules={[EffectFade, Navigation, Pagination]}
                    onSlideChange={(swiper) => {
                        // Disable/enable buttons based on active index
                        if (swiper.isBeginning) {
                            setDisablePrev(true);
                            setDisableNext(false);
                        } else if (swiper.isEnd) {
                            setDisablePrev(false);
                            setDisableNext(true);
                        } else {
                            setDisablePrev(false);
                            setDisableNext(false);
                        }
                    }}
                    className="mySwiper"
                >
                    {(reviews.length > 0 ? reviews : testimonials).map((element, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex justify-center h-full items-center'>
                                <div className='w-1/3 text-white'>
                                    <div className='flex gap-4'>
                                        <div className='w-20 h-20'>
                                            <img src={element.reviewerPhotoUrl} className='w-full h-full object-cover object-center rounded-full' alt="" />
                                        </div>
                                        <div>
                                            <h2 className='capitalize text-lg tracking-wider font-akzidenz font-semibold'>{element.name}</h2>
                                            <p className='text-sm tracking-wider text-white leading-5 mt-2'>{element.publishAt}</p>
                                            <div className='text-yellow-400 mt-2 flex gap-1 text-xl'>
                                                {Array.from({ length: 5 }, (_, index) =>
                                                    index < Math.floor(element.stars) ? (
                                                        <MdOutlineStar key={index} />
                                                    ) : index === Math.floor(element.stars) && element.stars % 1 !== 0 ? (
                                                        <MdOutlineStarHalf key={index} />
                                                    ) : (
                                                        <MdOutlineStarBorder key={index} />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5 relative'>
                                        {element.text ? <>

                                            <div className='absolute top-0 -left-5'>
                                                <FaQuoteLeft />
                                            </div>
                                            <p className='text-sm text-justify line-clamp-6 tracking-wider text-white leading-5'>
                                                {element.text}
                                            </p>
                                        </> : <>

                                        </>}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/*end of testimonial */}</>
    )
}

export default Testimonial