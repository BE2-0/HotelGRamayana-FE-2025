import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import { Link, useLocation } from 'react-router-dom';
import Testimonial from '../components/Testimonial'
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/authContext'
import { HiOutlineXMark } from "react-icons/hi2";
import ChangeImageModal from '../components/ChangeImageModal'
import ImageChangeButton from '../components/ImageChangeButton'
import axios from 'axios'
import AddButton from '../components/AddButton'
import AddModal from '../components/AddModal'
import DeleteModal from '../components/DeleteModal'
const Home = () => {
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
  const collectionRef = collection(firestore, "Home");
  const { userLoggedIn } = useAuth();

  const [existingImageUrl, setExistingImageUrl] = useState(null);
  // about states
  const [aboutData, setAboutData] = useState(null);
  const [isAboutEditable, setIsAboutEditable] = useState(false);
  const aboutTitleRef = useRef(null);
  const aboutSubTitleRef = useRef(null);
  const aboutDescriptionRef = useRef(null);
  const [aboutImageModalOpen, setAboutImageModalOpen] = useState(false);


  // history states
  const [historyData, setHistoryData] = useState(null);
  const [isHistoryEditable, setIsHistoryEditable] = useState(false);
  const historyTitleRef = useRef(null);
  const historyDescriptionRef = useRef(null);

  //services states
  const [servicesData, setServicesData] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const serviceRefs = useRef([]);
  const [servicesImageModalOpen, setServicesImageModalOpen] = useState(false);
  const [servicesAddModalOpen, setServicesAddModalOpen] = useState(false);
  const [servicesDeleteModalOpen, setServicesDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);



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
      querySnapshot.forEach((doc) => {
        if (doc.id === "about") {
          setAboutData(doc.data());
        } else if (doc.id === "history") {
          setHistoryData(doc.data());
        }
      });
      const servicesCollectionRef = collection(firestore, "Home-Services");
      const servicesQuerySnapshot = await getDocs(servicesCollectionRef);
      const servicesData = [];
      servicesQuerySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() });
      });
      setServicesData(servicesData);
    } catch (error) {
      console.error("Error fetching data:", error)
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
      const sub_title = aboutSubTitleRef.current.innerHTML;
      const description = aboutDescriptionRef.current.innerHTML;
      const updatedData = {
        title,
        sub_title,
        description
      };
      const docRef = doc(firestore, "Home", "about");
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
      const docRef = doc(firestore, "Home", "about");
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

  //history save
  const handleHistorySave = async (e) => {
    e.preventDefault();
    try {
      if (!userLoggedIn) {
        toast.error("must login");
        return;
      }
      const title = historyTitleRef.current.innerHTML;
      const description = historyDescriptionRef.current.innerHTML;
      const updatedData = {
        title,
        description
      };
      const docRef = doc(firestore, "Home", "history");
      await updateDoc(docRef, updatedData);
      setHistoryData(updatedData);
      setIsHistoryEditable(false);
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }


  //services save

  const handleServicesSave = async (id, index) => {
    try {
      if (!userLoggedIn) {
        toast.error("must login");
        return;
      }
      const title = serviceRefs.current[index].titleRef.current.innerHTML;
      const sub_title = serviceRefs.current[index].sub_titleRef.current.innerHTML;
      const description = serviceRefs.current[index].descriptionRef.current.innerHTML;
      const updatedData = {
        title,
        sub_title,
        description
      };
      const docRef = doc(firestore, "Home-Services", id);
      await updateDoc(docRef, updatedData);
      const updatedServices = servicesData.map((service) =>
        service.id === id
          ? { ...service, title: title, sub_title: sub_title, description: description }
          : service
      );
      setServicesData(updatedServices); // Update state
      setEditingServiceId(null);
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  }

  const servicesImageChange = async (imageUrl) => {
    console.log(editingServiceId);
    try {
      const serviceIndex = servicesData.findIndex(service => service.id === editingServiceId);
      if (serviceIndex !== -1) {
        const updatedService = { ...servicesData[serviceIndex], imageUrl: imageUrl };
        const docRef = doc(firestore, "Home-Services", editingServiceId);
        await updateDoc(docRef, updatedService);
        setServicesData(prevServicesData => { // Use a functional update for correct state updates based on previous state
          return [
            ...prevServicesData.slice(0, serviceIndex),
            updatedService,
            ...prevServicesData.slice(serviceIndex + 1),
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
      setEditingServiceId(null);
    }
  }

  //add new service
  const addService = async (data) => {
    console.log(data);
    try {
      const docRef = await addDoc(collection(firestore, "Home-Services"), data);
      setServicesData((prevContent) => [...prevContent, { id: docRef.id, ...data }]);
      toast.success("Data Added Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  //service delete
  const handleServicesDelete = async () => {
    setServicesDeleteModalOpen(false);
    if (!userLoggedIn) {
      toast.error("must login");
      return;
    }
    if (serviceToDelete) {
      setLoading(true);
      try {
        if (serviceToDelete.imageUrl) {

          const url = `${apiKey}api/file/delete?fileUrl=${encodeURIComponent(serviceToDelete.imageUrl)}`;
          const token = "9c8fcb20-d2d7-4a1a-9e29-71a892cfa1f3";
          const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`, // Add the bearer token
              'Content-Type': 'multipart/form-data', // Important for sending formData
            },
          });

          if (response.status === 200) {
            console.log(response);
            deleteServiceFromFireStore(serviceToDelete.id);
          }
          else {
            toast.error("Something Went Wrong");
          }
        } else {
          deleteServiceFromFireStore(serviceToDelete.id);
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
        setServiceToDelete(null);
      }
    } else {
      toast.error("Something Went Wrong");
    }
  }

  const deleteServiceFromFireStore = async (id) => {
    const docRef = doc(firestore, "Home-Services", id);
    await deleteDoc(docRef);
    setServicesData((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    toast.success("Deleted Successfully!");
  }

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div className={`${loading ? "pointer-events-none" : ""}`}>
        <Nav />
        <div className=' absolute top-0 left-0 w-full'>

          {/* hero section */}
          <div className="h-[100vh]">
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            ></video>
          </div>
          {/* end of hero section */}

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-gray-900 opacity-70 z-10"></div>
          {/* about section */}
          <div className=' px-10 py-10 bg-primary'>
            <div className='grid grid-cols-2 gap-10'>
              <div className=''>
                <div className='relative'>
                  {userLoggedIn && (
                    <div className='absolute top-2 right-2'>
                      <ImageChangeButton onClick={() => { setAboutImageModalOpen(true); setExistingImageUrl(aboutData?.imageUrl ?? null); }} />
                    </div>
                  )}
                  <img src={aboutData?.imageUrl ?? aboutimage} className='w-full  rounded-xl object-contain' alt="" />
                </div>
              </div>
              <div className='flex flex-col justify-center items-center pl-20 pr-10 tracking-wider'>
                {aboutData != null && (
                  <div className='relative'>
                    {userLoggedIn && (
                      <div className='absolute top-0 right-4'>
                        {isAboutEditable ? <>
                          <HiOutlineXMark onClick={(e) => { setIsAboutEditable(false) }} className='text-xl cursor-pointer' />
                        </> : <>
                          <CiEdit onClick={(e) => { setIsAboutEditable(true) }} className='text-xl cursor-pointer' />
                        </>}
                      </div>
                    )}
                    <h2 contentEditable={isAboutEditable} className='!font-bold uppercase font-akzidenz text-sm' ref={aboutTitleRef}
                      dangerouslySetInnerHTML={{ __html: aboutData?.title ?? "" }}
                    ></h2>
                    <h2 contentEditable={isAboutEditable} className='!font-canela text-5xl uppercase !font-thin tracking-wide my-6'
                      ref={aboutSubTitleRef}
                      dangerouslySetInnerHTML={{ __html: aboutData?.sub_title ?? "" }} ></h2>
                    <p className='mb-10' contentEditable={isAboutEditable} ref={aboutDescriptionRef}
                      dangerouslySetInnerHTML={{ __html: aboutData?.description ?? "" }}
                    >
                    </p>
                    <Link to="/suites" className='textbase py-1 border-b border-gray-400 text-gray-800'> View Suites</Link>
                    {userLoggedIn && isAboutEditable && (
                      <div className='mt-4'>
                        <button onClick={handleAboutSave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
          {/*end of about section */}


          {/* our history */}
          <div className='h-[92vh] flex items-center justify-center relative'>

            {/* Pseudo-element to apply brightness */}
            <div
              className="absolute inset-0 brightness-50"
              style={{
                backgroundImage: `url(${historyimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: -1 // Ensures the pseudo-element is behind the content
              }}
            ></div>

            <div className='w-[40%] relative'>
              {historyData != null && (
                <>
                  {userLoggedIn && (
                    <div className='absolute top-0 right-4 text-white'>
                      {isHistoryEditable ? <>
                        <HiOutlineXMark onClick={(e) => { setIsHistoryEditable(false) }} className='text-xl cursor-pointer' />
                      </> : <>
                        <CiEdit onClick={(e) => { setIsHistoryEditable(true) }} className='text-xl cursor-pointer' />
                      </>}
                    </div>
                  )}
                  <div className='text-white text-center tracking-wide'>
                    <h2 className='uppercase text-sm text-[#fffc] font-akzidenz font-bold'
                    >Our History</h2>
                    <h2 className='font-canela text-5xl !font-thin tracking-wide my-6'
                      contentEditable={isHistoryEditable}
                      ref={historyTitleRef}
                      dangerouslySetInnerHTML={{ __html: historyData?.title ?? "" }}
                    ></h2>
                    <p className='mb-10 text-xl font-light text-justify'
                      contentEditable={isHistoryEditable}
                      ref={historyDescriptionRef}
                      dangerouslySetInnerHTML={{ __html: historyData?.description ?? "" }}
                    >
                    </p>
                    <Link to="/about" className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Read More</Link>
                    {userLoggedIn && isHistoryEditable && (
                      <div className='mt-4'>
                        <button onClick={handleHistorySave} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                      </div>
                    )}

                  </div>
                </>
              )}
            </div>


          </div>
          {/*end of our history */}


          {/* dining */}
          <div className='bg-primary'>
            <div className=''>
              {userLoggedIn && (
                <AddButton onClick={() => { setServicesAddModalOpen(true); }} text="Add" />
              )}
            </div>
            {servicesData.length > 0 && servicesData.map((element, index) => {
              if (!serviceRefs.current[index]) {
                serviceRefs.current[index] = {
                  titleRef: React.createRef(),
                  sub_titleRef: React.createRef(),
                  descriptionRef: React.createRef(),
                };
              }
              return (
                <div className='' key={index}>
                  <div className='grid grid-cols-5 gap-10'>
                    <div className={`col-span-3 ${index % 2 === 0 ? "order-0 pr-10" : "order-1 pl-10"} `}>
                      <div className=' relative '>
                        {userLoggedIn && (
                          <div className='absolute top-2 right-2'>
                            <div>
                              <ImageChangeButton onClick={() => { setServicesImageModalOpen(true); setEditingServiceId(element.id); setExistingImageUrl(element?.imageUrl ?? null) }} />
                            </div>
                          </div>
                        )}
                        <img src={element?.imageUrl ?? dineimage} className='w-full object-contain' alt="" />
                      </div>
                    </div>
                    <div className='col-span-2 pr-10'>
                      <div className='flex flex-col justify-center items-center h-full tracking-wide relative'>
                        {userLoggedIn && (
                          <div className='absolute top-0 right-4 '>
                            {editingServiceId == element.id ? <>
                              <HiOutlineXMark onClick={(e) => { setEditingServiceId(null) }} className='text-xl cursor-pointer' />
                            </> : <>
                              <CiEdit onClick={(e) => { setEditingServiceId(element.id) }} className='text-xl cursor-pointer' />
                            </>}
                          </div>
                        )}
                        <div className=''>
                          <h2 className='font-bold uppercase font-akzidenz text-sm'
                            contentEditable={editingServiceId == element.id}
                            ref={serviceRefs.current[index].titleRef}
                            dangerouslySetInnerHTML={{ __html: element?.title ?? "" }}
                          ></h2>
                          <h2 className='font-canela text-5xl !font-thin tracking-wide my-6'
                            contentEditable={editingServiceId == element.id}
                            ref={serviceRefs.current[index].sub_titleRef}
                            dangerouslySetInnerHTML={{ __html: element?.sub_title ?? "" }}
                          ></h2>
                          <p className='text-justify'
                            contentEditable={editingServiceId == element.id}
                            ref={serviceRefs.current[index].descriptionRef}
                            dangerouslySetInnerHTML={{ __html: element?.description ?? "" }}>
                          </p>
                          {/* <p className='my-6 text-justify'>
                          Indulge in the signature multi-course dining experience, where you’ll savour Chef Jordan Keao’s iconic favourites. This culinary journey is meticulously crafted with a thoughtfully curated menu, complemented by exclusive off-the-menu creations that spotlight seasonal produce, creating an epic gastronomic adventure.
                        </p> */}
                          <div className='flex gap-8 mt-6'>
                            {/* <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Discover more</a> */}
                            <Link to="/booking" className='textbase py-1 border-b border-gray-400 text-gray-800'> Reserve</Link>
                          </div>
                          {userLoggedIn && editingServiceId == element.id && (
                            <div className='mt-4 flex gap-5'>
                              <button onClick={(e) => { e.preventDefault(); handleServicesSave(element.id, index) }} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
                              <button onClick={(e) => { e.preventDefault(); setServicesDeleteModalOpen(true); setServiceToDelete(element); }} className='px-8 py-2 border font-semibold uppercase text-red-600 border-red-400 hover:border-red-50 duration-300 ease-linear cursor-pointer tracking-wider'>Delete</button>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )
            }
            )}

          </div>

          {/* <div className='p-10'>
              <div className='grid grid-cols-5 gap-10'>
                <div className='col-span-3 pr-10'>
                  <img src={dineimage} className='w-full object-contain' alt="" />
                </div>
                <div className='col-span-2 pr-10'>
                  <div className='flex flex-col justify-center items-center h-full tracking-wide'>
                    <div className=''>
                      <h2 className='font-bold uppercase font-akzidenz text-sm'>Dining</h2>
                      <h2 className='font-canela text-5xl !font-thin tracking-wide my-6' >Butcher's Block IMUA<br /> tasting Menu</h2>
                      <p className='text-justify'>
                        For the ultimate Butcher’s Block experience, opt for IMUA, a dining concept that beautifully embodies the culinary mastery and philosophy of Chef Jordan Keao, expressed through wood-fire cooking, whole-animal butchery, and a commitment to zero waste.
                      </p>
                      <p className='my-6 text-justify'>
                        Indulge in the signature multi-course dining experience, where you’ll savour Chef Jordan Keao’s iconic favourites. This culinary journey is meticulously crafted with a thoughtfully curated menu, complemented by exclusive off-the-menu creations that spotlight seasonal produce, creating an epic gastronomic adventure.
                      </p>
                      <div className='flex gap-8'>
                        <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Discover more</a>
                        <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Reserve</a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div> */}
          {/*end of dining */}


          {/* SPA */}
          {/* <div className='p-10'>
            <div className='grid grid-cols-5 gap-10'>

              <div className='col-span-2 pr-10'>
                <div className='flex flex-col justify-center items-center h-full tracking-wide'>
                  <div className=''>
                    <h2 className='font-bold uppercase font-akzidenz text-sm'>SPA</h2>
                    <h2 className='font-canela text-5xl !font-thin tracking-wide my-6' >Personalised experiences in a refined Sanctuary</h2>
                    <p className='mb-6 text-justify'>
                      Ramayana Spa is a tranquil hideaway which takes a holistic approach to wellbeing, blending Asian philosophies with modern therapeutic body and facial treatments, personal training and an outdoor pool.
                    </p>
                    <div className='flex gap-8'>
                      <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Explore treatments</a>
                      <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Book</a>
                    </div>
                  </div>

                </div>
              </div>
              <div className='col-span-3 pl-10'>
                <img src={bedimage} className='w-full object-contain' alt="" />
              </div>
            </div>
          </div> */}
          {/*end of spa */}

          <Testimonial />
          {/* footer */}
          <Footer />
          {/*end of footer */}



          {/* about image modal */}
          <div>
            <ChangeImageModal open={aboutImageModalOpen} setOpen={setAboutImageModalOpen} setLoading={setLoading} imageChange={aboutImageChange} handleClose={() => { setAboutImageModalOpen(false); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
          </div>
          {/*end of about image modal */}

          {/* services image modal */}
          <div>
            <ChangeImageModal open={servicesImageModalOpen} setOpen={setServicesImageModalOpen} setLoading={setLoading} imageChange={servicesImageChange} handleClose={() => { setServicesImageModalOpen(false); setEditingServiceId(null); setExistingImageUrl(null); }} existingImageUrl={existingImageUrl} />
          </div>
          {/*end of services image modal */}

          {/* add service modal */}
          <div>
            <AddModal open={servicesAddModalOpen} setOpen={setServicesAddModalOpen} setLoading={setLoading} handleClose={() => { setServicesAddModalOpen(false); }} text={`Add`} addContent={addService} isDescription={true} isSubTitle={true} />
          </div>
          {/*end of add service modal */}

          {/* delete service modal */}
          <div>
            <DeleteModal showDeleteModal={servicesDeleteModalOpen} handleModalClose={() => { setServiceToDelete(null); setServicesDeleteModalOpen(false); }} handleDelete={handleServicesDelete} />
          </div>
        </div>
      </div>




    </>
  )
}

export default Home