import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import dine2image from "../assets/images/dining2.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';
import Loader from '../common/Loader'
// import { Calendar } from "@demark-pro/react-booking-calendar";
// import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { FaArrowRightLong } from "react-icons/fa6";
const quantities = [
    { value: 1, label: 1 },
    { value: 1, label: 1 },
]


const oneDay = 86400000;
const today = new Date().getTime() + oneDay;

const reserved = Array.from({ length: 3 }, (_, i) => {
    const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
    const startDate = new Date(today + oneDay * 8 * i);

    return {
        startDate,
        endDate: new Date(startDate.getTime() + oneDay * daysCount),
    };
});
const reservedDates = [
    new Date(2025, 0, 10), // January 10, 2025
    new Date(2025, 0, 15), // January 15, 2025
    // Add more reserved dates as needed
];
const Booking = () => {
    const [loading, setLoading] = useState(true);
    const [selectedDates, setSelectedDates] = useState([]);
    const [noOfRooms, setNoOfRooms] = useState(1);
    const [noOfAdults, setNoOfAdults] = useState(1);
    const [noOfChildrens, setNoOfChildrens] = useState(1);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    const increaseRoomQuantity = () => {
        var value = noOfRooms + 1;
        setNoOfRooms(value);
    }
    const decreaseRoomQuantity = () => {
        if (noOfRooms > 1) {
            var value = noOfRooms - 1;
            setNoOfRooms(value)
        }
    }
    const increaseAdultQuantity = () => {
        var value = noOfAdults + 1;
        setNoOfAdults(value);
    }
    const decreaseAdultQuantity = () => {
        if (noOfAdults > 1) {
            var value = noOfAdults - 1;
            setNoOfAdults(value)
        }
    }

    const increaseChildQuantity = () => {
        var value = noOfChildrens + 1;
        setNoOfChildrens(value);
    }
    const decreaseChildQuantity = () => {
        if (noOfChildrens > 1) {
            var value = noOfChildrens - 1;
            setNoOfChildrens(value)
        }
    }

    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=''>
                <Nav isTextBlack={true} hideNav={true} hideBookButton={true} />
                <div className=' absolute top-0 left-0 w-full'>

                    {/* hero section */}
                    <div className="h-[30vh] relative bg-[#E2E0D1]">
                        <div className='absolute bottom-0 w-full text-center text-black tracking-widest z-20'>
                            <h2 className='font-canela text-4xl font-medium tracking-wider mt-8 capitalize underline decoration-2 underline-offset-4' >Book Your Stay</h2>
                        </div>
                    </div>
                    {/* end of hero section */}
                    {/* contents */}
                    <div className='py-10 px-40 bg-[#E2E0D1] flex gap-8'>
                        <div className=''>
                            <DateRangePicker
                                onChange={item => setState([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                className="w-full "
                                direction="horizontal"
                                showMonthAndYearPickers={false}
                            />
                        </div>
                        <div className='flex flex-col gap-5 flex-grow pt-10 tracking-wider'>
                            <div className=''>
                                <h2 className='font-akzidenz text-sm mb-2'>No of Rooms</h2>
                                <div className="relative">
                                    <button
                                        className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={decreaseRoomQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        className="w-full pl-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                                        placeholder=""
                                        readOnly
                                        value={noOfRooms}
                                    />

                                    <button
                                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={increaseRoomQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-akzidenz text-sm mb-2'>No of Adults</h2>
                                <div className="relative">
                                    <button
                                        className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={decreaseAdultQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        className="w-full pl-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                                        placeholder=""
                                        readOnly
                                        value={noOfAdults}
                                    />

                                    <button
                                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={increaseAdultQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-akzidenz text-sm mb-2'>No of Childrens</h2>
                                <div className="relative">
                                    <button
                                        className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={decreaseChildQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        className="w-full pl-4 h-10 pr-3 py-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md peer"
                                        placeholder=""
                                        readOnly
                                        value={noOfChildrens}
                                    />

                                    <button
                                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200"
                                        type="button"
                                        onClick={increaseChildQuantity}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <a target='_blank' href="/booking" className={`px-8 flex gap-4 items-center justify-center tracking-widest py-2 border font-bold text-xs uppercase border-black cursor-pointer  font-akzidenz`}>Check Availability <FaArrowRightLong /></a>
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

export default Booking