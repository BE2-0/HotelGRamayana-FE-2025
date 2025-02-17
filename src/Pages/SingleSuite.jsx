import React, { useEffect, useRef, useState } from 'react'
import Loader from '../common/Loader'
import { firestore } from '../firebase/firebase'
import { doc, getDoc, updateDoc} from 'firebase/firestore'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ImageChangeButton from '../components/ImageChangeButton'
import tempImage from "../assets/images/contact.jpg"
import { useAuth } from '../contexts/authContext'
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import toast from 'react-hot-toast'
import ChangeImageModal from '../components/ChangeImageModal'
import { useParams } from 'react-router-dom'
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
const SingleSuite = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
    const { userLoggedIn } = useAuth();
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    //suite state
    const [suite, setSuite] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const titleRef = useRef(null);
    const detailsTitleRef = useRef(null);
    const detailsDescriptionRef = useRef(null);
    const bedRef = useRef(null);
    const guestRef = useRef(null);
    const sizeRef = useRef(null);
    const featuresRef = useRef(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [image1ModalOpen, setImage1ModalOpen] = useState(false);
    const [image2ModalOpen, setImage2ModalOpen] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0); // Scroll to the top
            await fetchData(); // Await your fetch function
            setLoading(false); // Set loading state
            document.body.style.overflow = "auto";
        };

        initialize(); // Call the async function
    }, []);

    const fetchData = async () => {
        try {
            const docRef = doc(firestore, "Suites-Content", id); // Reference to the document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSuite(docSnap.data());
                console.log(docSnap.data());
            } else {
                toast.error("Suite not found");
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    //image change
    const imageChange = async (imageUrl) => {
        try {
            const newSuiteData = {
                ...suite, // Spread the previous state to retain other properties
                imageUrl: imageUrl, // Update only the imageUrl
            };
            const docRef = doc(firestore, "Suites-Content", id);
            await updateDoc(docRef, newSuiteData);
            setSuite(newSuiteData); // Set the new state
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    //image1 change
    const image1Change = async (imageUrl) => {
        try {
            const newSuiteData = {
                ...suite, // Spread the previous state to retain other properties
                imageUrl1: imageUrl, // Update only the imageUrl
            };
            const docRef = doc(firestore, "Suites-Content", id);
            await updateDoc(docRef, newSuiteData);
            setSuite(newSuiteData); // Set the new state
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    //image2 change
    const image2Change = async (imageUrl) => {
        try {
            const newSuiteData = {
                ...suite, // Spread the previous state to retain other properties
                imageUrl2: imageUrl, // Update only the imageUrl
            };
            const docRef = doc(firestore, "Suites-Content", id);
            await updateDoc(docRef, newSuiteData);
            setSuite(newSuiteData); // Set the new state
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
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
            const bed = bedRef.current.innerHTML;
            const details_description = detailsDescriptionRef.current.innerHTML;
            const details_title = detailsTitleRef.current.innerHTML;
            const features = featuresRef.current.innerHTML;
            const guests = guestRef.current.innerHTML;
            const size = sizeRef.current.innerHTML;
            const updatedData = {
                ...suite,
                title,
                bed,
                details_description,
                details_title,
                features,
                guests,
                size
            };
            const docRef = doc(firestore, "Suites-Content", id);
            await updateDoc(docRef, updatedData);
            setSuite(updatedData);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }finally{
            setIsEditable(false);
        }
    }

    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=' bg-primary'>
                <Nav isTextBlack={true} />
                <div className=' absolute top-0 left-0 w-full'>

                    {/* hero section */}
                    <div className="h-[60vh] relative bg-[#E2E0D1]">
                        <div className='absolute bottom-0 w-full flex justify-center text-center text-black tracking-widest z-20 py-10'>
                            <div className='relative'>
                                <h2 className='font-bold uppercase font-akzidenz text-sm text-gray-600'>Suite</h2>
                                <h2 className='font-canela text-8xl !font-thin tracking-wide my-5'
                                    contentEditable={isEditable}
                                    ref={titleRef}
                                    dangerouslySetInnerHTML={{ __html: suite?.title ?? "" }}
                                ></h2>
                                {/* <p className='text-center text-lg text-gray-600 mt-5'
                                    contentEditable={isHeadingEditable} ref={headingDescriptionRef}
                                    dangerouslySetInnerHTML={{ __html: headingData?.description ?? "" }}
                                >
                                </p> */}
                                {userLoggedIn && (
                                    <div className='absolute top-0 right-4'>
                                        {isEditable ? <>
                                            <HiOutlineXMark onClick={(e) => { setIsEditable(false) }} className='text-xl cursor-pointer' />
                                        </> : <>
                                            <CiEdit onClick={(e) => { setIsEditable(true) }} className='text-xl cursor-pointer' />
                                        </>}
                                    </div>
                                )}
                                {/* {userLoggedIn && isHeadingEditable && (
                                    <div className='mt-4'>
                                        <button onClick={handleHeadingSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        {/* <div className='absolute -z-10 top-0 left-0 w-full h-[150%] bg-[#E2E0D1]'>
                        </div> */}
                    </div>
                    {/* end of hero section */}
                    <div className='px-40 relative bg-primary'>
                        <div className='absolute z-10 top-0 left-0 w-full h-1/2 !bg-[#E2E0D1]'>
                        </div>
                        <div className='relative z-20'>
                            {userLoggedIn && (
                                <div className='absolute top-2 right-2'>
                                    <ImageChangeButton onClick={() => { setImageModalOpen(true); setExistingImageUrl(suite?.imageUrl ?? null); }} />
                                </div>
                            )}
                            <img src={suite?.imageUrl ?? tempImage} className='w-full h-full object-cover object-center' alt="" />
                        </div>
                    </div>

                    <div className='px-40 pr-52 grid grid-cols-3 gap-28 py-20 bg-primary'>
                        <div className='relative col-span-2'>
                            {/* {userLoggedIn && (
                                <div className='absolute top-0 right-4 text-black'>
                                    {isEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )} */}

                            <h2 className='font-canela text-6xl !font-thin tracking-wide'
                                contentEditable={isEditable}
                                ref={detailsTitleRef}
                                dangerouslySetInnerHTML={{ __html: suite?.details_title ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit" }}
                            ></h2>
                            <p className=' text-lg text-justify text-gray-600 mt-5 tracking-wider'
                                contentEditable={isEditable} ref={detailsDescriptionRef}
                                dangerouslySetInnerHTML={{ __html: suite?.details_description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia ullam, minima voluptatibus explicabo ducimus illum sapiente doloremque! Corrupti, officia? Perspiciatis sequi ut sapiente reprehenderit nemo inventore ea non distinctio?" }}
                            >
                            </p>
                            {/* {userLoggedIn && isAboutEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleAboutSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )} */}
                        </div>
                        <div className='relative'>
                            {/* {userLoggedIn && (
                                <div className='absolute top-0 right-4 text-black'>
                                    {isInformationEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsInformationEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsInformationEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )} */}

                            <h2 className='font-canela text-3xl font-medium tracking-wide' >Details</h2>
                            <div className='tracking-wide text-sm mt-6'>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><CiUser className='text-lg text-gray-600' />
                                    <h2
                                        contentEditable={isEditable}
                                        ref={guestRef}
                                        dangerouslySetInnerHTML={{ __html: suite?.guests ?? "1 guests" }}
                                    ></h2>
                                </div>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><BsArrowsAngleExpand className='text-lg text-gray-600' />
                                    <h2
                                        contentEditable={isEditable}
                                        ref={sizeRef}
                                        dangerouslySetInnerHTML={{ __html: suite?.size ?? "46 sq m | 495 sq ft" }}
                                    ></h2>
                                </div>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><IoBedOutline className='text-lg text-gray-600' />
                                    <h2
                                        contentEditable={isEditable}
                                        ref={bedRef}
                                        dangerouslySetInnerHTML={{ __html: suite?.bed ?? "1 King size bed" }}
                                    ></h2>
                                </div>
                            </div>
                            {/* {userLoggedIn && isInformationEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleInformationSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )} */}
                        </div>
                    </div>

                    <div className='px-40 py-20  bg-primary'>
                        <div className='grid grid-cols-5 gap-10'>

                            <div className='col-span-2 pr-10'>
                                <div className='items-center h-full tracking-wide relative'>
                                    {/* {userLoggedIn && (
                                        <div className='absolute top-0 right-4 '>
                                            {isAboutEditable ? <>
                                                <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                                            </> : <>
                                                <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                                            </>}
                                        </div>
                                    )} */}
                                    <div className=''>
                                        <h2 className='font-canela text-3xl !font-thin tracking-wide my-6'
                                        >Features</h2>
                                        <p className='text-justify'
                                            contentEditable={isEditable}
                                            ref={featuresRef}
                                            dangerouslySetInnerHTML={{ __html: suite?.features ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia ullam, minima voluptatibus explicabo ducimus illum sapiente doloremque! Corrupti, officia? Perspiciatis sequi ut sapiente reprehenderit nemo inventore ea non distinctio?" }}
                                        >
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className={`col-span-3 pl-10`}>
                                <div className=' relative h-full '>
                                    {userLoggedIn && (
                                        <div className='absolute top-2 right-2'>
                                            <ImageChangeButton onClick={() => { setImage1ModalOpen(true); setExistingImageUrl(suite?.imageUrl1 ?? null); }} />
                                        </div>
                                    )}
                                    <img src={suite?.imageUrl1 ?? tempImage} className='w-full h-full object-cover object-center' alt="" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='px-40 relative py-20  bg-primary'>
                        <div className='absolute z-10 bottom-0 left-0 w-full h-2/3 bg-[#d5c0b5]'>
                        </div>
                        <div className='relative z-20'>
                            {userLoggedIn && (
                                <div className='absolute top-2 right-2'>
                                    <ImageChangeButton onClick={() => { setImage2ModalOpen(true); setExistingImageUrl(suite?.imageUrl2 ?? null); }} />
                                </div>
                            )}
                            <img src={suite?.imageUrl2 ?? tempImage} className='w-full h-full object-cover object-center' alt="" />
                        </div>
                        <div>
                            {userLoggedIn && isEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* footer */}
                    <Footer />
                    {/*end of footer */}

                    {/* image modal */}
                    <div>
                        <ChangeImageModal open={imageModalOpen} setOpen={setImageModalOpen} setLoading={setLoading} imageChange={imageChange} handleClose={() => { setImageModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of image modal */}

                    {/* image1 modal */}
                    <div>
                        <ChangeImageModal open={image1ModalOpen} setOpen={setImage1ModalOpen} setLoading={setLoading} imageChange={image1Change} handleClose={() => { setImage1ModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of image1 modal */}

                    {/* image2 modal */}
                    <div>
                        <ChangeImageModal open={image2ModalOpen} setOpen={setImage2ModalOpen} setLoading={setLoading} imageChange={image2Change} handleClose={() => { setImage2ModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of image2 modal */}

                </div>
            </div>
        </>
    )
}

export default SingleSuite