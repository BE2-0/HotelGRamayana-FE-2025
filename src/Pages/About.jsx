import React, { useEffect, useRef, useState } from 'react'
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
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/authContext'
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import toast from 'react-hot-toast'
import ChangeImageModal from '../components/ChangeImageModal'
import ImageChangeButton from '../components/ImageChangeButton'

const About = () => {
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(firestore, "About");
    const { userLoggedIn } = useAuth();
    const [existingImageUrl, setExistingImageUrl] = useState(null);


    // heading states
    const [headingData, setHeadingData] = useState(null);
    const [isHeadingEditable, setIsHeadingEditable] = useState(false);
    const headingTitleRef = useRef(null);

    // about states
    const [aboutData, setAboutData] = useState(null);
    const [isAboutEditable, setIsAboutEditable] = useState(false);
    const aboutTitleRef = useRef(null);
    const aboutDescriptionRef = useRef(null);

    // information states
    const [informationData, setInformationData] = useState(null);
    const [isInformationEditable, setIsInformationEditable] = useState(false);
    const informationPhoneRef = useRef(null);
    const informationMailRef = useRef(null);
    const informationAddressRef = useRef(null);

    // contentHeading states
    const [contentHeadingData, setContentHeadingData] = useState(null);
    const [isContentHeadingEditable, setIsContentHeadingEditable] = useState(false);
    const contentHeadingTitleRef = useRef(null);
    const contentHeadingDescriptionRef = useRef(null);

    //content states
    const [contentsData, setContentsData] = useState([]);
    const [editingContentId, setEditingContentId] = useState(null);
    const contentRefs = useRef([]);
    const [contentsImageModalOpen, setContentsImageModalOpen] = useState(false);

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
                }
                else if (doc.id === "content") {
                    setContentHeadingData(doc.data());
                }
                else if (doc.id === "information") {
                    setInformationData(doc.data());
                }
            });
            const contentsCollectionRef = collection(firestore, "About-Content");
            const contentsQuerySnapshot = await getDocs(contentsCollectionRef);
            const contentsData = [];
            contentsQuerySnapshot.forEach((doc) => {
                contentsData.push({ id: doc.id, ...doc.data() });
            });
            setContentsData(contentsData);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

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
            const docRef = doc(firestore, "About", "about");
            await updateDoc(docRef, updatedData);
            setAboutData(updatedData);
            setIsAboutEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

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
            const docRef = doc(firestore, "About", "heading");
            await updateDoc(docRef, updatedData);
            setIsHeadingEditable(updatedData);
            setIsHeadingEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }


    const handleInformationSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const address = informationAddressRef.current.innerHTML;
            const mail = informationMailRef.current.innerHTML;
            const phone = informationPhoneRef.current.innerHTML;
            const updatedData = {
                address,
                mail,
                phone
            };
            const docRef = doc(firestore, "About", "information");
            await updateDoc(docRef, updatedData);
            setInformationData(updatedData);
            setIsInformationEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    const handleContentHeadingSave = async (e) => {
        e.preventDefault();
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = contentHeadingTitleRef.current.innerHTML;
            const description = contentHeadingDescriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "About", "content");
            await updateDoc(docRef, updatedData);
            setContentHeadingData(updatedData);
            setIsContentHeadingEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }



    const handleContentsSave = async (id, index) => {
        try {
            if (!userLoggedIn) {
                toast.error("must login");
                return;
            }
            const title = contentRefs.current[index].titleRef.current.innerHTML;
            const description = contentRefs.current[index].descriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "About-Content", id);
            await updateDoc(docRef, updatedData);
            const updatedContents = contentsData.map((content) =>
                content.id === id
                    ? { ...content, title: title, description: description }
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

    const contentsImageChange = async (imageUrl) => {
        try {
          const contentIndex = contentsData.findIndex(content => content.id === editingContentId);
          if (contentIndex !== -1) {
            const updatedContent = { ...contentsData[contentIndex], imageUrl: imageUrl };
            const docRef = doc(firestore, "About-Content", editingContentId);
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
                        <div className='absolute bottom-0 w-full text-center text-white flex justify-center tracking-widest z-20 py-10'>
                            <div className='relative'>
                                <h2 className='font-bold uppercase font-akzidenz text-sm text-[#fffc]'>About</h2>
                                <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8'
                                    contentEditable={isHeadingEditable}
                                    ref={headingTitleRef}
                                    dangerouslySetInnerHTML={{ __html: headingData?.title ?? "" }} ></h2>
                                {userLoggedIn && (
                                    <div className='absolute top-0 right-4 text-white'>
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
                        <div className='w-[40%] relative'>
                            {userLoggedIn && (
                                <div className='absolute top-0 right-4 text-black'>
                                    {isAboutEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )}

                            <h2 className='font-canela text-5xl !font-thin tracking-wide'
                                contentEditable={isAboutEditable}
                                ref={aboutTitleRef}
                                dangerouslySetInnerHTML={{ __html: aboutData?.title ?? "" }}
                            ></h2>
                            <p className=' text-base text-justify text-gray-600 mt-5'
                                contentEditable={isAboutEditable} ref={aboutDescriptionRef}
                                dangerouslySetInnerHTML={{ __html: aboutData?.description ?? "" }}
                            >
                            </p>
                            {userLoggedIn && isAboutEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleAboutSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )}
                        </div>
                        <div className='w-[30%] relative'>
                            {userLoggedIn && (
                                <div className='absolute top-0 right-4 text-black'>
                                    {isInformationEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsInformationEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsInformationEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )}

                            <h2 className='font-canela text-3xl font-medium tracking-wide' >Information</h2>
                            <div className='tracking-wide text-sm mt-6'>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><BsTelephone className='text-base text-gray-600' />
                                    <h2
                                        contentEditable={isInformationEditable}
                                        ref={informationPhoneRef}
                                        dangerouslySetInnerHTML={{ __html: informationData?.phone ?? "" }}
                                    ></h2>
                                </div>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><CiMail className='text-lg text-gray-600' />
                                    <h2
                                        contentEditable={isInformationEditable}
                                        ref={informationMailRef}
                                        dangerouslySetInnerHTML={{ __html: informationData?.mail ?? "" }}
                                    ></h2>
                                </div>
                                <div className='flex gap-4 items-center border-b border-gray-400 py-2'><CiLocationOn className='text-lg text-gray-600' />
                                    <h2
                                        contentEditable={isInformationEditable}
                                        ref={informationAddressRef}
                                        dangerouslySetInnerHTML={{ __html: informationData?.address ?? "" }}
                                    ></h2>
                                </div>
                            </div>
                            {userLoggedIn && isInformationEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleInformationSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='w-1/2 relative m-auto text-center pt-20 pb-10'>
                            {userLoggedIn && (
                                <div className='absolute top-10 right-4 text-black'>
                                    {isContentHeadingEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsContentHeadingEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsContentHeadingEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )}
                            <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8'
                                contentEditable={isContentHeadingEditable}
                                ref={contentHeadingTitleRef}
                                dangerouslySetInnerHTML={{ __html: contentHeadingData?.title ?? "" }}
                            ></h2>
                            <p className='text-center text-lg text-gray-600 px-28 mt-5'
                                contentEditable={isContentHeadingEditable}
                                ref={contentHeadingDescriptionRef}
                                dangerouslySetInnerHTML={{ __html: contentHeadingData?.description ?? "" }}
                            >
                            </p>
                            {userLoggedIn && isContentHeadingEditable && (
                                <div className='mt-4'>
                                    <button onClick={handleContentHeadingSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='pb-20 pt-10 px-10 bg-[#f6f1ef]'>
                        <div className=''>
                            <div className='grid grid-cols-3 gap-10'>
                                {contentsData.length > 0 && contentsData.map((element, index) => {
                                    if (!contentRefs.current[index]) {
                                        contentRefs.current[index] = {
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
                                                            <ImageChangeButton onClick={() => { setContentsImageModalOpen(true); setEditingContentId(element.id); setExistingImageUrl(element?.imageUrl ?? null) }} />
                                                        </div>
                                                    </div>
                                                )}
                                                <img
                                                    src={element?.imageUrl??`https://hotelgramayana-55120.web.app/assets/history-abnC8s6H.png`}
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
                                                <h2 className="font-canela text-3xl !font-thin tracking-wide mt-8"
                                                    contentEditable={editingContentId == element.id}
                                                    ref={contentRefs.current[index].titleRef}
                                                    dangerouslySetInnerHTML={{ __html: element?.title ?? "" }}
                                                >
                                                </h2>
                                                <p className="text-base text-gray-600 my-3"
                                                    contentEditable={editingContentId == element.id}
                                                    ref={contentRefs.current[index].descriptionRef}
                                                    dangerouslySetInnerHTML={{ __html: element?.description ?? "" }}
                                                ></p>

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
                                {/* {data.map((item, index) => (
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
                                ))} */}
                            </div>
                        </div>
                    </div>
                    {/*end of contents */}
                    {/* footer */}
                    <Footer />
                    {/*end of footer */}

                    {/* contents image modal */}
                    <div>
                        <ChangeImageModal open={contentsImageModalOpen} setOpen={setContentsImageModalOpen} setLoading={setLoading} imageChange={contentsImageChange} handleClose={() => { setContentsImageModalOpen(false); setEditingContentId(null); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
                    </div>
                    {/*end of contents image modal */}
                </div>
            </div>
        </>
    )
}

export default About