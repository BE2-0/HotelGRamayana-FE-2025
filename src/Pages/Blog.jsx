import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import blogimage from "../assets/Gallery/DSC08022.jpg"
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/authContext'
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import toast from 'react-hot-toast'
import ImageChangeButton from '../components/ImageChangeButton'
import ChangeImageModal from '../components/ChangeImageModal'
import AddButton from '../components/AddButton'
import AddModal from '../components/AddModal'
import DeleteModal from '../components/DeleteModal'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Blog = () => {
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
    const collectionRef = collection(firestore, "Blog");
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

    //content states
    const [contentsData, setContentsData] = useState([]);
    const [editingContentId, setEditingContentId] = useState(null);
    const contentRefs = useRef([]);
    const [contentsImageModalOpen, setContentsImageModalOpen] = useState(false);
    const [contentsAddModalOpen, setContentsAddModalOpen] = useState(false);
    const [contentsDeleteModalOpen, setContentsDeleteModalOpen] = useState(false);
    const [contentToDelete, setContentToDelete] = useState(null);


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
            });
            const contentsCollectionRef = collection(firestore, "Blog-Content");
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
            const docRef = doc(firestore, "Blog", "heading");
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
            const docRef = doc(firestore, "Blog", "about");
            await updateDoc(docRef, updatedData);
            setAboutData(updatedData);
            setIsAboutEditable(false);
            toast.success("Updated Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
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
            const description = contentRefs.current[index].descriptionRef.current.innerHTML;
            const updatedData = {
                title,
                description
            };
            const docRef = doc(firestore, "Blog-Content", id);
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

    //contents image save
    const contentsImageChange = async (imageUrl) => {
        try {
            const contentIndex = contentsData.findIndex(content => content.id === editingContentId);
            if (contentIndex !== -1) {
                const updatedContent = { ...contentsData[contentIndex], imageUrl: imageUrl };
                const docRef = doc(firestore, "Blog-Content", editingContentId);
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

    //add new content
    const addContent = async (data) => {
        console.log(data);
        try {
            const docRef = await addDoc(collection(firestore, "Blog-Content"), data);
            setContentsData((prevContent) => [...prevContent, { id: docRef.id, ...data }]);
            toast.success("Data Added Successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    //contents save
    const handleContentsDelete = async () => {
        setContentsDeleteModalOpen(false);
        if (!userLoggedIn) {
            toast.error("must login");
            return;
        }
        if (contentToDelete) {
            setLoading(true);
            try {
                if (contentToDelete.imageUrl) {

                    const url = `${apiKey}api/file/delete?fileUrl=${encodeURIComponent(contentToDelete.imageUrl)}`;
                    const token = "9c8fcb20-d2d7-4a1a-9e29-71a892cfa1f3";
                    const response = await axios.delete(url, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Add the bearer token
                            'Content-Type': 'multipart/form-data', // Important for sending formData
                        },
                    });

                    if (response.status === 200) {
                        console.log(response);
                        deleteContentFromFireStore(contentToDelete.id);
                    }
                    else {
                        toast.error("Something Went Wrong");
                    }
                } else {
                    deleteContentFromFireStore(contentToDelete.id);
                }
            } catch (error) {
                setLoading(false);
                if (error.response) {
                    var errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else if (error.message) {
                    console.log("Error", error.message);
                    toast.error("Error", error.message);
                } else {
                    toast.error(error);
                    console.log("Error", error);
                }
            } finally {
                setLoading(false);
                setContentToDelete(null);
            }
        } else {
            toast.error("Something Went Wrong");
        }
    }

    const deleteContentFromFireStore = async (id) => {
        const docRef = doc(firestore, "Blog-Content", id);
        await deleteDoc(docRef);
        setContentsData((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
        toast.success("Deleted Successfully!");
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
                        <img src={blogimage} className='w-full h-full object-top object-cover' alt="" />
                        <div className='absolute bottom-0 w-full flex justify-center text-center text-white tracking-widest z-20 py-10'>
                            <div className="relative">
                                <h2 className='font-bold uppercase font-akzidenz text-sm text-[#fffc]'>Blog</h2>
                                <h2 className='font-canela text-5xl  !font-thin tracking-wide mt-8'
                                    contentEditable={isHeadingEditable}
                                    ref={headingTitleRef}
                                    dangerouslySetInnerHTML={{ __html: headingData?.title ?? "" }}
                                ></h2>
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
                    <div className='p-10 relative'>
                        <div className='absolute bg-[#E2E0D1] top-0 left-0 w-full h-[80vh] -z-10'></div>
                        <div className='w-1/2 m-auto text-center relative'>
                            {userLoggedIn && (
                                <div className='absolute -top-4 right-0 text-black'>
                                    {isAboutEditable ? <>
                                        <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                                    </> : <>
                                        <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                                    </>}
                                </div>
                            )}
                            <h2 className='font-canela text-5xl !font-thin tracking-wide mt-8'
                                contentEditable={isAboutEditable}
                                ref={aboutTitleRef}
                                dangerouslySetInnerHTML={{ __html: aboutData?.title ?? "" }}
                            ></h2>
                            <p className='text-center text-lg text-gray-600 px-28 mt-5'
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
                        <div className='my-20'>
                            {userLoggedIn && (
                                <AddButton onClick={() => { setContentsAddModalOpen(true); }} text="Add Blog" />
                            )}
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
                                                <Link to={`/blog/${element.id}`}
                                                    className="text-base py-1 border-b border-gray-400 text-gray-800"
                                                >
                                                    Discover
                                                </Link>
                                            </div>
                                            {userLoggedIn && editingContentId == element.id && (
                                                <div className='mt-4 flex gap-5'>
                                                    <button onClick={(e) => { e.preventDefault(); handleContentsSave(element.id, index) }} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                                                    <button onClick={(e) => { e.preventDefault(); setContentsDeleteModalOpen(true); setContentToDelete(element); }} className='px-8 py-2 border font-semibold uppercase text-red-600 border-red-400 hover:border-red-50 duration-300 ease-linear cursor-pointer tracking-wider'>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
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


                    {/* add content modal */}
                    <div>
                        <AddModal open={contentsAddModalOpen} setOpen={setContentsAddModalOpen} setLoading={setLoading} handleClose={() => { setContentsAddModalOpen(false); }} text={`Add Blogs`} addContent={addContent} isDescription={true} />
                    </div>
                    {/*end of add content modal */}

                    {/* delete content modal */}
                    <div>
                        <DeleteModal showDeleteModal={contentsDeleteModalOpen} handleModalClose={() => { setContentToDelete(null); setContentsDeleteModalOpen(false); }} handleDelete={handleContentsDelete} />
                    </div>
                    {/*end of delete content modal */}
                </div>
            </div>
        </>
    )
}

export default Blog