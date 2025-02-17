import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import contactImage from "../assets/images/contact.jpg"
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/authContext'
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import toast from 'react-hot-toast'
import ChangeImageModal from '../components/ChangeImageModal'
import ImageChangeButton from '../components/ImageChangeButton'
import axios from 'axios'
import AddModal from '../components/AddModal'
import DeleteModal from '../components/DeleteModal'
import AddButton from '../components/AddButton'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { userLoggedIn } = useAuth();
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    //offer states
    const [blog, setBlog] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const titleRef = useRef(null);
    const detailsTitleRef = useRef(null);
    const detailsDescriptionRef = useRef(null);
    const featuresRef = useRef(null);


    useEffect(() => {
        const initialize = async () => {
            document.body.style.overflow="hidden";
            window.scrollTo(0, 0); // Scroll to the top
            await fetchData(); // Await your fetch function
            setLoading(false); // Set loading state
            document.body.style.overflow = "auto";
        };

        initialize(); // Call the async function
    }, []);

    useEffect(() => {
        const initialize = async () => {
            window.scrollTo(0, 0); // Scroll to the top
            await fetchData(); // Await your fetch function
            setLoading(false); // Set loading state
        };

        initialize(); // Call the async function
    }, []);

    const fetchData = async () => {
        try {
            const docRef = doc(firestore, "Blog-Content", id); // Reference to the document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBlog(docSnap.data());
                console.log(docSnap.data());
            } else {
                toast.error("Blog not found");
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    //save
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = titleRef.current.innerHTML;
            const details_description = detailsDescriptionRef.current.innerHTML;
            const details_title = detailsTitleRef.current.innerHTML;
            const updatedData = {
                ...blog,
                title,
                details_description,
                details_title,
            };
            const docRef = doc(firestore, "Blog-Content", id);
            await updateDoc(docRef, updatedData);
            setBlog(updatedData);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setIsEditable(false);
        }
    }


    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=''>
                <Nav />
                <div className=' absolute top-0 left-0 w-full'>

                    {/* hero section */}
                    <div className="h-[90vh] relative">

                        <img src={blog?.imageUrl ?? contactImage} className='w-full h-full object-center object-cover' alt="" />
                        <div className='absolute bottom-0 w-full text-center text-white flex justify-center tracking-widest z-20 py-10'>
                            <div className='relative'>
                                <h2 className='font-bold uppercase font-akzidenz text-sm text-[#fffc]'>Blog</h2>
                                <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8'
                                    contentEditable={isEditable}
                                    ref={titleRef}
                                    dangerouslySetInnerHTML={{ __html: blog?.title ?? "" }} ></h2>
                                {userLoggedIn && (
                                    <div className='absolute top-0 right-4 text-white'>
                                        {isEditable ? <>
                                            <HiOutlineXMark onClick={(e) => { setIsEditable(false) }} className='text-xl cursor-pointer' />
                                        </> : <>
                                            <CiEdit onClick={(e) => { setIsEditable(true) }} className='text-xl cursor-pointer' />
                                        </>}
                                    </div>
                                )}
                                {/* {userLoggedIn && isEditable && (
                                    <div className='mt-4'>
                                        <button onClick={handleHeadingSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                    </div>
                                )} */}
                            </div>

                        </div>
                        {/* Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-gray-900 opacity-70 z-10"></div>
                    </div>
                    {/* end of hero section */}

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-gray-900 opacity-70 z-10"></div>
                    <div className='px-40 bg-primary py-20'>
                        <div className='relative'>
                            <h2 className='font-canela text-5xl !font-thin tracking-wide'
                                contentEditable={isEditable}
                                ref={detailsTitleRef}
                                dangerouslySetInnerHTML={{ __html: blog?.details_title ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit." }}
                            ></h2>
                            <p className=' text-base text-justify text-gray-600 mt-5 tracking-wider'
                                contentEditable={isEditable} ref={detailsDescriptionRef}
                                dangerouslySetInnerHTML={{ __html: blog?.details_description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia ullam, minima voluptatibus explicabo ducimus illum sapiente doloremque! Corrupti, officia? Perspiciatis sequi ut sapiente reprehenderit nemo inventore ea non distinctio?" }}
                            >
                            </p>
                        </div>
                        {/* <div className='relative'>
                            <div className='!mr-40'>
                                <h2 className='font-canela text-3xl font-medium tracking-wide' >Offer Includes</h2>
                                <p className='text-justify mt-6'
                                    contentEditable={isEditable}
                                    ref={featuresRef}
                                    dangerouslySetInnerHTML={{ __html: blog?.features ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia ullam, minima voluptatibus explicabo ducimus illum sapiente doloremque! Corrupti, officia? Perspiciatis sequi ut sapiente reprehenderit nemo inventore ea non distinctio?" }}
                                ></p>
                            </div>
                        </div> */}
                    </div>
                    <div className=' bg-[#f6f1ef] '>
                        {userLoggedIn && isEditable && (
                            <div className='px-10 pb-10'>
                                <button onClick={handleSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                            </div>
                        )}
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

export default SingleBlog