import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// import plugins if you need
import Loader from '../common/Loader'
import Fancybox from '../components/FancyBox'
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/authContext'
import AddButton from '../components/AddButton'
import ChangeImageModal from '../components/ChangeImageModal'
import toast from 'react-hot-toast'

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import DeleteModal from '../components/DeleteModal'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'

const Gallery = () => {
    const { userLoggedIn } = useAuth();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [addImageModalOpen, setAddImageModalOpen] = useState(false);
    const collectionRef = collection(firestore, "Gallery");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];

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
            const querySnapshot = await getDocs(collectionRef);
            const galleryData = [];
            querySnapshot.forEach((doc) => {
                galleryData.push({ id: doc.id, ...doc.data() });
            });
            console.log(galleryData);
            setImages(galleryData);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    //image save
    //contents image save
    const imageSave = async (imageUrl) => {
        if (!userLoggedIn) {
            toast.error("must login");
            return;
        }
        try {
            const data = {
                imageUrl: imageUrl, // The URL of the uploaded image
                createdAt: new Date(), // Timestamp for when the image was saved
            };
            const docRef = await addDoc(collectionRef, data);
            data.id = docRef.id;
            setImages((prevImages) => [...prevImages, data]);
            console.log("Document ID:", docRef.id);
            toast.success("Image Added Successfully!");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }


    //handle image delete
    const handleImageDelete = async () => {
        setShowDeleteModal(false);
        if (!userLoggedIn) {
            toast.error("must login");
            return;
        }
        if (imageToDelete) {
            setLoading(true);
            const url = `${apiKey}api/file/delete?fileUrl=${encodeURIComponent(imageToDelete.imageUrl)}`;
            const token = "9c8fcb20-d2d7-4a1a-9e29-71a892cfa1f3";
            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token
                        'Content-Type': 'multipart/form-data', // Important for sending formData
                    },
                });

                if (response.status === 200) {
                    console.log(response);
                    const docRef = doc(firestore, "Gallery", imageToDelete.id);
                    await deleteDoc(docRef);
                    setImages((prevImages) => prevImages.filter((img) => img.id !== imageToDelete.id));
                    toast.success("Deleted Successfully!");
                }
                else {
                    toast.error("Something Went Wrong");
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
            }
        } else {
            toast.error("Something Went Wrong");
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
                    <div className="h-[50vh] relative bg-[#E2E0D1]">
                        <div className='absolute bottom-0 w-full text-center text-black tracking-widest z-20 py-10'>
                            <h2 className='font-canela text-3xl lg:text-6xl font-medium tracking-widest mt-8' ><span className='font-canela uppercase'>Explore </span><i className='font-canela font-medium'>our</i> <span className='font-canela uppercase'> World</span></h2>
                        </div>
                        <div className='absolute -z-10 top-0 left-0 w-full h-[150%] bg-[#E2E0D1]'>
                        </div>
                    </div>
                    {/* end of hero section */}

                    {/* contents */}
                    <div className='lg:px-10 px-5 mt-10 bg-primary'>
                        {userLoggedIn && (
                            <AddButton onClick={() => { setAddImageModalOpen(true); }} text="Add Image" />
                        )}
                        {!loading && (
                            <div className='py-20'>
                                <Box >
                                    <Masonry columns={{ xs: 1, sm: 2, lg: 3, lg: 4 }}  spacing={2}>
                                        {images.length > 0 && images.map((image, index) => (
                                            <div key={index} className='relative'>
                                                {userLoggedIn && (
                                                    <div onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); setImageToDelete(image); }} className='absolute z-40 cursor-pointer right-3 top-3 bg-gray-100 opacity-75 hover:opacity-100 transition-all duration-300 ease-linear w-8 h-8 flex items-center justify-center rounded-full'>
                                                        <MdDeleteOutline className='text-xl text-red-400' />
                                                    </div>
                                                )}
                                                <Fancybox options={{
                                                    Carousel: {
                                                        infinite: false,
                                                    },
                                                }}>
                                                    <a href={image.imageUrl} key={index} data-fancybox={`gallery-${index}`} className='gallery-item relative'>

                                                        <img src={image.imageUrl} alt={image.imageUrl} />
                                                    </a>
                                                </Fancybox>
                                            </div>
                                        ))}
                                    </Masonry>
                                </Box>
                            </div>
                        )}
                    </div>

                    {/* footer */}
                    <Footer />
                    {/*end of footer */}

                    {/* contents image modal */}
                    <div>
                        <ChangeImageModal open={addImageModalOpen} setOpen={setAddImageModalOpen} setLoading={setLoading} imageChange={imageSave} handleClose={() => { setAddImageModalOpen(false); }} existingImageUrl={null} />
                    </div>
                    {/*end of contents image modal */}
                    {/* contents image modal */}
                    <div>
                        <DeleteModal showDeleteModal={showDeleteModal} handleModalClose={() => { setShowDeleteModal(false) }} handleDelete={handleImageDelete} />
                    </div>
                    {/*end of contents image modal */}
                </div>
            </div>
        </>
    )
}

export default Gallery