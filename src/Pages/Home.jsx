import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'
import Loader from '../common/Loader'
import { useLocation } from 'react-router-dom';
import Testimonial from '../components/Testimonial'
import { firestore } from '../firebase/firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/authContext'
import { HiOutlineXMark } from "react-icons/hi2";
import ChangeImageModal from '../components/ChangeImageModal'
import ImageChangeButton from '../components/ImageChangeButton'
const Home = () => {
  const [loading, setLoading] = useState(true);
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
      setAboutData(updatedData);
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
          <div className='px-40 py-10'>
            <div className='grid grid-cols-2 gap-10'>
              <div className='px-10'>
                <div className='relative'>
                  {userLoggedIn && (
                    <div className='absolute top-2 right-2'>
                      <ImageChangeButton onClick={()=>{setAboutImageModalOpen(true);setExistingImageUrl(aboutData?.imageUrl ?? null);}} />
                    </div>
                  )}
                  <img src={aboutData?.imageUrl ?? aboutimage} className='w-full object-contain' alt="" />
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
                    <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> View Suites</a>
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
                    <a href="" className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Read More</a>
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
          <div>

            {servicesData.length > 0 && servicesData.map((element, index) => {
              if (!serviceRefs.current[index]) {
                serviceRefs.current[index] = {
                  titleRef: React.createRef(),
                  sub_titleRef: React.createRef(),
                  descriptionRef: React.createRef(),
                };
              }
              return (
                <div className='p-10' key={index}>
                  <div className='grid grid-cols-5 gap-10'>
                    <div className={`col-span-3 ${index % 2 === 0 ? "order-0 pr-10" : "order-1 pl-10"} `}>
                      <div className=' relative '>
                        {userLoggedIn && (
                          <div className='absolute top-2 right-2'>
                            <div>
                              <ImageChangeButton onClick={() => { setServicesImageModalOpen(true); setEditingServiceId(element.id);setExistingImageUrl(element?.imageUrl ?? null) }} />
                              {/* <button onClick={() => { setServicesImageModalOpen(true); setEditingServiceId(element.id); }} className='px-4 text-sm tracking-widest py-2 rounded-xl text-white bg-gray-600 hover:bg-gray-800  duration-300 ease-linear cursor-pointer'>Change</button> */}
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
                            <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Discover more</a>
                            <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> Reserve</a>
                          </div>
                          {userLoggedIn && editingServiceId == element.id && (
                            <div className='mt-4'>
                              <button onClick={(e) => { e.preventDefault(); handleServicesSave(element.id, index) }} className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Save</button>
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
            <ChangeImageModal open={aboutImageModalOpen} setOpen={setAboutImageModalOpen} setLoading={setLoading} imageChange={aboutImageChange} handleClose={()=>{setAboutImageModalOpen(false);setExistingImageUrl(null);}} existingImageUrl={existingImageUrl} />
          </div>
          {/*end of about image modal */}

          {/* services image modal */}
          <div>
            <ChangeImageModal open={servicesImageModalOpen} setOpen={setServicesImageModalOpen} setLoading={setLoading} imageChange={servicesImageChange} handleClose={()=>{setServicesImageModalOpen(false);setEditingServiceId(null);setExistingImageUrl(null);}} existingImageUrl={existingImageUrl} />
          </div>
          {/*end of services image modal */}
        </div>
      </div>




    </>
  )
}

export default Home