import React, { useEffect, useRef, useState } from 'react'
import Loader from '../common/Loader'
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AddButton from '../components/AddButton'
import ImageChangeButton from '../components/ImageChangeButton'
import { useAuth } from '../contexts/authContext'
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import toast from 'react-hot-toast'
import ChangeImageModal from '../components/ChangeImageModal'
const Suites = () => {
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(firestore, "Suites");
    const { userLoggedIn } = useAuth();
    const [existingImageUrl, setExistingImageUrl] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    // heading states
    const [headingData, setHeadingData] = useState(null);
    const [isHeadingEditable, setIsHeadingEditable] = useState(false);
    const headingTitleRef = useRef(null);
    const headingDescriptionRef = useRef(null);

    // about states
    const [aboutData, setAboutData] = useState(null);
    const [isAboutEditable, setIsAboutEditable] = useState(false);
    const aboutTitleRef = useRef(null);
    const aboutDescriptionRef = useRef(null);
    const [aboutImageModalOpen, setAboutImageModalOpen] = useState(false);


    //content within page
    const [contentData, setContentData] = useState(null);
    const [isContentEditable, setIsContentEditable] = useState(false);
    const contentTitleRef = useRef(null);
    const contentDescriptionRef = useRef(null);
    const [contentImageModalOpen, setContentImageModalOpen] = useState(false);

    //content states
    const [contentsData, setContentsData] = useState([]);
    const [editingContentId, setEditingContentId] = useState(null);
    const contentRefs = useRef([]);
    const [contentsImageModalOpen, setContentsImageModalOpen] = useState(false);

    //offers states
    const [offersData, setOffersData] = useState([]);
    const [editingOffersId, setEditingOffersId] = useState(null);
    const offersRefs = useRef([]);
    const [offersImageModalOpen, setOffersImageModalOpen] = useState(false);


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
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
                if (doc.id === "about") {
                    setAboutData(doc.data());
                } else if (doc.id === "heading") {
                    setHeadingData(doc.data());
                } else if (doc.id === "content") {
                    setContentData(doc.data());
                }
            });
            const contentsCollectionRef = collection(firestore, "Suites-Content");
            const contentsQuerySnapshot = await getDocs(contentsCollectionRef);
            const contentsData = [];
            contentsQuerySnapshot.forEach((doc) => {
                contentsData.push({ id: doc.id, ...doc.data() });
            });
            setContentsData(contentsData);

            const offersCollectionRef = collection(firestore, "Suites-Offers");
            const offersQuerySnapshot = await getDocs(offersCollectionRef);
            const offersData = [];
            offersQuerySnapshot.forEach((doc) => {
                offersData.push({ id: doc.id, ...doc.data() });
            });
            setOffersData(offersData);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    //heading save
    const handleHeadingSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = headingTitleRef.current.innerHTML;
            const updatedData = {
                title,
            };
            const docRef = doc(firestore, "Suites", "heading");
            await updateDoc(docRef, updatedData);
            setIsHeadingEditable(updatedData);
            setIsHeadingEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }


    //about save
    const handleAboutSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = aboutTitleRef.current.innerHTML;
            const description = aboutDescriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "Suites", "about");
            await updateDoc(docRef, updatedData);
            setAboutData((prevState) => ({
                ...prevState,  // Preserve existing fields
                ...updatedData // Overwrite title and description
            }));
            setIsAboutEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    //about image change
    const aboutImageChange = async (imageUrl) => {
        try {
            const newAboutData = {
                ...aboutData, // Spread the previous state to retain other properties
                imageUrl: imageUrl, // Update only the imageUrl
            };
            const docRef = doc(firestore, "Suites", "about");
            await updateDoc(docRef, newAboutData);
            setAboutData(newAboutData); // Set the new state
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    //contentInformation save
    const handleContentSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = contentTitleRef.current.innerHTML;
            const description = contentDescriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "Suites", "content");
            await updateDoc(docRef, updatedData);
            setContentData((prevState) => ({
                ...prevState,  // Preserve existing fields
                ...updatedData // Overwrite title and description
            }));
            setIsContentEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

     //contentInformation image change
     const contentInformationImageChange = async (imageUrl) => {
        try {
            const newContentdata = {
                ...contentData, // Spread the previous state to retain other properties
                imageUrl: imageUrl, // Update only the imageUrl
            };
            const docRef = doc(firestore, "Suites", "content");
            await updateDoc(docRef, newContentdata);
            setContentData(newContentdata); // Set the new state
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }

    }


    //contents save
    const handleContentsSave = async (id, index) => {
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = contentRefs.current[index].titleRef.current.innerHTML;
            const updatedData = {
                title,
            };
            const docRef = doc(firestore, "Suites-Content", id);
            console.log(docRef);
            await updateDoc(docRef, updatedData);
            const updatedContents = contentsData.map((content) =>
                content.id === id
                    ? { ...content, title: title}
                    : content
            );
            setContentsData(updatedContents); // Update state
            setEditingContentId(null);
            toast.success("Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }

    //offers save
    const handleOffersSave = async (id, index) => {
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = offersRefs.current[index].titleRef.current.innerHTML;
            const description = offersRefs.current[index].descriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "Suites-Offers", id);
            await updateDoc(docRef, updatedData);
            const updatedOffers = offersData.map((offer) =>
                offer.id === id
                    ? { ...offer, title: title, description: description }
                    : offer
            );
            setOffersData(updatedOffers); // Update state
            setEditingOffersId(null);
            toast.success("Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }

    //contents image save
    const contentsImageChange = async (imageUrl) => {
        try {
            const contentIndex = contentsData.findIndex(content => content.id === editingContentId);
            if (contentIndex !== -1) {
                const updatedContent = { ...contentsData[contentIndex], imageUrl: imageUrl };
                const docRef = doc(firestore, "Suites-Content", editingContentId);
                await updateDoc(docRef, updatedContent);
                setContentsData(prevContentsData => { // Use a functional update for correct state updates based on previous state
                    return [
                        ...prevContentsData.slice(0, contentIndex),
                        updatedContent,
                        ...prevContentsData.slice(contentIndex + 1),
                    ];
                });
                toast.success("Updated Successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
            setEditingContentId(null);
        }
    }

    //offers image save
    const offersImageChange = async (imageUrl) => {
        try {
            const offerIndex = offersData.findIndex(offer => offer.id === editingOffersId);
            if (offerIndex !== -1) {
                const updatedOffer = { ...offersData[offerIndex], imageUrl: imageUrl };
                const docRef = doc(firestore, "Suites-Offers", editingOffersId);
                await updateDoc(docRef, updatedOffer);
                setOffersData(prevOffersData => { // Use a functional update for correct state updates based on previous state
                    return [
                        ...prevOffersData.slice(0, offerIndex),
                        updatedOffer,
                        ...prevOffersData.slice(offerIndex + 1),
                    ];
                });
                toast.success("Updated Successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
            setEditingOffersId(null);
        }
    }

    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=''>
                <Nav isTextBlack={true} />
                <div className=' absolute top-0 left-0 w-full'>

                    {/* hero section */}
                    <div className="h-[60vh] relative bg-[#E2E0D1]">
                        <div className='absolute bottom-0 w-full flex justify-center text-center text-black tracking-widest z-20 py-10'>
                            <div className='relative'>
                                <h2 className='font-bold uppercase font-akzidenz text-sm text-gray-600'>Suites</h2>
                                <h2 className='font-canela text-5xl !font-thin tracking-wide my-5'
                                    contentEditable={isHeadingEditable}
                                    ref={headingTitleRef}
                                    dangerouslySetInnerHTML={{ __html: headingData?.title ?? "" }}
                                ></h2>
                                <p className='text-center text-lg text-gray-600 mt-5'
                                    contentEditable={isHeadingEditable} ref={headingDescriptionRef}
                                    dangerouslySetInnerHTML={{ __html: headingData?.description ?? "" }}
                                >
                                </p>
                                {userLoggedIn && (
                                    <div className='absolute top-0 right-4'>
                                        {isHeadingEditable ? <>
                                            <HiOutlineXMark onClick={(e) => { setIsHeadingEditable(false) }} className='text-xl cursor-pointer' />
                                        </> : <>
                                            <CiEdit onClick={(e) => { setIsHeadingEditable(true) }} className='text-xl cursor-pointer' />
                                        </>}
                                    </div>
                                )}
                                {userLoggedIn && isHeadingEditable && (
                                    <div className='mt-4'>
                                        <button onClick={handleHeadingSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <div className='absolute -z-10 top-0 left-0 w-full h-[150%] bg-[#E2E0D1]'>
                        </div> */}
                    </div>
                    {/* end of hero section */}

                    {/* contents */}
                    <div>
                        <div className='p-10'>
                            <div className='grid grid-cols-5 gap-10'>
                                <div className={`col-span-3 pr-10 `}>
                                    <div className=' relative '>
                                        {userLoggedIn && (
                                            <div className='absolute top-2 right-2'>
                                                <ImageChangeButton onClick={() => { setAboutImageModalOpen(true); setExistingImageUrl(aboutData?.imageUrl ?? null); }} />
                                            </div>
                                        )}
                                        <img src={aboutData?.imageUrl??`https://m.ahstatic.com/is/image/accorhotels/aja_p_5629-59?qlt=82&wid=1920&ts=1701454554080&dpr=off`} className='w-full object-cover object-center' alt="" />
                                    </div>
                                </div>
                                <div className='col-span-2 pr-10'>
                                    <div className='flex flex-col justify-center items-center h-full tracking-wide relative'>
                                        {userLoggedIn && (
                                            <div className='absolute top-0 right-4 '>
                                                {isAboutEditable ? <>
                                                    <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                                                </> : <>
                                                    <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                                                </>}
                                            </div>
                                        )}
                                        <div className=''>
                                            <h2 className='font-canela text-5xl !font-thin tracking-wide my-6'
                                                contentEditable={isAboutEditable}
                                                ref={aboutTitleRef}
                                                dangerouslySetInnerHTML={{ __html: aboutData?.title ?? "" }}
                                            ></h2>
                                            <p className='text-justify'
                                                contentEditable={isAboutEditable}
                                                ref={aboutDescriptionRef}
                                                dangerouslySetInnerHTML={{ __html: aboutData?.description ?? "" }}
                                            >
                                            </p>
                                            <div className='flex gap-8 mt-6'>
                                                <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Explore</a>
                                            </div>
                                            {userLoggedIn && isAboutEditable && (
                                                <div className='mt-4'>
                                                    <button onClick={handleAboutSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='p-10 bg-[#f1f0e7]'>
                            {userLoggedIn && (
                                <AddButton onClick={() => { setAddModalOpen(true); }} text="Add Suites" />
                            )}
                            <div className='grid grid-cols-3 gap-10 gap-y-36'>
                                {contentsData.length > 0 && contentsData.map((element, index) => {
                                    if (!contentRefs.current[index]) {
                                        contentRefs.current[index] = {
                                            titleRef: React.createRef(),
                                        };
                                    }
                                    return (
                                        <div key={index} className='flex flex-col relative'>

                                            <div className="h-80 relative">
                                                {userLoggedIn && (
                                                    <div className='absolute top-2 right-2'>
                                                        <div>
                                                            <ImageChangeButton onClick={() => { setContentsImageModalOpen(true); setEditingContentId(element.id); setExistingImageUrl(element?.imageUrl ?? null) }} />
                                                        </div>
                                                    </div>
                                                )}
                                                <img
                                                    src={element?.imageUrl ?? `https://hotelgramayana-55120.web.app/assets/history-abnC8s6H.png`}
                                                    alt={element.title}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className='relative'>
                                                {userLoggedIn && (
                                                    <div className='absolute top-2 right-4 '>
                                                        {editingContentId == element.id ? <>
                                                            <HiOutlineXMark onClick={(e) => { setEditingContentId(null) }} className='text-xl cursor-pointer' />
                                                        </> : <>
                                                            <CiEdit onClick={(e) => { setEditingContentId(element.id) }} className='text-xl cursor-pointer' />
                                                        </>}
                                                    </div>
                                                )}
                                                <h2 className="font-canela text-3xl !font-thin tracking-wide mt-8 mb-3"
                                                    contentEditable={editingContentId == element.id}
                                                    ref={contentRefs.current[index].titleRef}
                                                    dangerouslySetInnerHTML={{ __html: element?.title ?? "" }}
                                                >
                                                </h2>
                                                {/* <p className="text-base text-gray-600 my-3"
                                                        contentEditable={editingContentId == element.id}
                                                        ref={contentRefs.current[index].descriptionRef}
                                                        dangerouslySetInnerHTML={{ __html: element?.description ?? "" }}
                                                    ></p> */}

                                            </div>
                                            <div className='mt-auto'>
                                                <a
                                                    className="text-base py-1 border-b border-gray-400 text-gray-800"
                                                >
                                                    Discover
                                                </a>
                                            </div>
                                            {userLoggedIn && editingContentId == element.id && (
                                                <div className='mt-4'>
                                                    <button onClick={(e) => { e.preventDefault(); handleContentsSave(element.id, index) }} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>



                        {/* contents information */}
                        <div className='p-10 bg-[#f6f1ef]'>
                            <div className='grid grid-cols-2 gap-10'>

                                <div className='pr-10 '>
                                    <div className='flex flex-col justify-center items-center h-full tracking-wide'>
                                        <div className='w-2/3 relative'>
                                            {userLoggedIn && (
                                                <div className='absolute top-0 right-4 '>
                                                    {isContentEditable ? <>
                                                        <HiOutlineXMark onClick={(e) => { setIsContentEditable(false) }} className='text-xl cursor-pointer' />
                                                    </> : <>
                                                        <CiEdit onClick={(e) => { setIsContentEditable(true) }} className='text-xl cursor-pointer' />
                                                    </>}
                                                </div>
                                            )}
                                            <h2 className='font-canela text-5xl !font-thin tracking-wide my-6'
                                                contentEditable={isContentEditable}
                                                ref={contentTitleRef}
                                                dangerouslySetInnerHTML={{ __html: contentData?.title ?? "" }}
                                            ></h2>
                                            <p className='text-justify'
                                                contentEditable={isContentEditable}
                                                ref={contentDescriptionRef}
                                                dangerouslySetInnerHTML={{ __html: contentData?.description ?? "" }}
                                            >
                                            </p>
                                            <div className='flex gap-8 mt-6'>
                                                <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Explore</a>
                                            </div>
                                            {userLoggedIn && isContentEditable && (
                                                <div className='mt-4'>
                                                    <button onClick={handleContentSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className={` pl-10 `}>
                                    <div className=' relative '>
                                        {userLoggedIn && (
                                            <div className='absolute top-2 left-2'>
                                                <div>
                                                    <ImageChangeButton onClick={() => { setContentImageModalOpen(true);setExistingImageUrl(contentData?.imageUrl ?? null) }} />
                                                </div>
                                            </div>
                                        )}
                                        <img src={contentData?.imageUrl ?? ""} className='!max-w-[80%] max-h-[100vh] object-cover object-center' alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*end of contents information */}


                        {/* offers */}
                        <div className='p-10 py-20'>
                            <h2 className='font-canela text-5xl text-center !font-thin tracking-wide my-6'
                            >Featured Offers</h2>
                            {userLoggedIn && (
                                <AddButton onClick={() => { setAddModalOpen(true); }} text="Add Offers" />
                            )}
                            <div className='grid grid-cols-3 gap-10 gap-y-24'>
                                {offersData.length > 0 && offersData.map((element, index) => {
                                    if (!offersRefs.current[index]) {
                                        offersRefs.current[index] = {
                                            titleRef: React.createRef(),
                                            descriptionRef: React.createRef(),
                                        };
                                    }
                                    return (
                                        <div key={index} className='flex flex-col relative'>

                                            <div className="h-80 relative">
                                                {userLoggedIn && (
                                                    <div className='absolute top-2 right-2'>
                                                        <div>
                                                            <ImageChangeButton onClick={() => { setOffersImageModalOpen(true); setEditingOffersId(element.id); setExistingImageUrl(element?.imageUrl ?? null) }} />
                                                        </div>
                                                    </div>
                                                )}
                                                <img
                                                    src={element?.imageUrl ?? `https://hotelgramayana-55120.web.app/assets/history-abnC8s6H.png`}
                                                    alt={element.title}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className='relative'>
                                                {userLoggedIn && (
                                                    <div className='absolute top-2 right-4 '>
                                                        {editingOffersId == element.id ? <>
                                                            <HiOutlineXMark onClick={(e) => { setEditingOffersId(null) }} className='text-xl cursor-pointer' />
                                                        </> : <>
                                                            <CiEdit onClick={(e) => { setEditingOffersId(element.id) }} className='text-xl cursor-pointer' />
                                                        </>}
                                                    </div>
                                                )}
                                                <h2 className="font-canela text-2xl font-medium  tracking-wide mt-8 mb-3"
                                                    contentEditable={editingOffersId == element.id}
                                                    ref={offersRefs.current[index].titleRef}
                                                    dangerouslySetInnerHTML={{ __html: element?.title ?? "" }}
                                                >
                                                </h2>
                                                <p className="text-base text-gray-600 my-3"
                                                    contentEditable={editingOffersId == element.id}
                                                    ref={offersRefs.current[index].descriptionRef}
                                                    dangerouslySetInnerHTML={{ __html: element?.description ?? "" }}
                                                ></p>

                                            </div>
                                            <div className='mt-auto'>
                                                <a
                                                    className="text-base py-1 border-b border-gray-400 text-gray-800"
                                                >
                                                    View Offer
                                                </a>
                                            </div>
                                            {userLoggedIn && editingOffersId == element.id && (
                                                <div className='mt-4'>
                                                    <button onClick={(e) => { e.preventDefault(); handleOffersSave(element.id, index) }} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/*end of offers */}

                    </div>


                    {/* footer */}
                    <Footer />
                    {/*end of footer */}

                    {/* about image modal */}
                    <div>
                        <ChangeImageModal open={aboutImageModalOpen} setOpen={setAboutImageModalOpen} setLoading={setLoading} imageChange={aboutImageChange} handleClose={() => { setAboutImageModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of about image modal */}

                    {/* content information modal */}
                    <div>
                        <ChangeImageModal open={contentImageModalOpen} setOpen={setContentImageModalOpen} setLoading={setLoading} imageChange={contentInformationImageChange} handleClose={() => { setContentImageModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of content information modal */}

                    {/* contents image modal */}
                    <div>
                        <ChangeImageModal open={contentsImageModalOpen} setOpen={setContentsImageModalOpen} setLoading={setLoading} imageChange={contentsImageChange} handleClose={() => { setContentsImageModalOpen(false); setEditingContentId(null); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of contents image modal */}

                    {/* offers image modal */}
                    <div>
                        <ChangeImageModal open={offersImageModalOpen} setOpen={setOffersImageModalOpen} setLoading={setLoading} imageChange={offersImageChange} handleClose={() => { setOffersImageModalOpen(false); setEditingOffersId(null); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of offers image modal */}
                </div>
            </div>
        </>
    )
}

export default Suites