import React from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'
const Home = () => {
  return (
    <>
      <div className=''>
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
                <div>
                  <img src={aboutimage} className='w-full object-contain' alt="" />
                </div>
              </div>
              <div className='flex flex-col justify-center items-center pl-20 pr-10 tracking-wider'>
                <div className=''>
                  <h2 className='font-bold uppercase font-akzidenz text-sm'>Suites</h2>
                  <h2 className='font-canela text-5xl uppercase !font-thin tracking-wide my-6' >Your <span className='italic font-canela lowercase'>oasis</span> in <br /> Nepal</h2>
                  <p className='mb-10'>
                    A suite at Ramayana Nepal is one of the world's most desirable addresses. Evoking the elegant, old-world glamour of a true grande dame, our 115 suites blend lofty architectural splendour and authentic details with all the comfort bestowed by modern technology and design.
                  </p>
                  <a href="" className='textbase py-1 border-b border-gray-400 text-gray-800'> View Suites</a>
                </div>

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

            <div className='w-[40%]'>
              <div className='text-white text-center tracking-wide'>
                <h2 className='uppercase text-sm text-[#fffc] font-akzidenz font-bold'>Our History</h2>
                <h2 className='font-canela text-5xl !font-thin tracking-wide my-6' >A true Original</h2>
                <p className='mb-10 text-xl font-light text-justify'>
                  At the dawn of the Golden Age of Travel, Ramayana Hotel opened in Nepal in 1887. Witness to history and the shaping of its age, Ramayana played host to royalty, dignitaries, screen goddesses and literary greats. Over a century later, the legend lives on, an oasis of timeless elegance loved by generations past, present and future.
                </p>
                <a href="" className='px-8 py-2 border font-semibold uppercase border-gray-400 hover:border-gray-50 duration-300 ease-linear cursor-pointer tracking-wider'>Read More</a>

              </div>
            </div>


          </div>
          {/*end of our history */}


          {/* dining */}
          <div className='p-10'>
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
          </div>
          {/*end of dining */}


          {/* SPA */}
          <div className='p-10'>
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
          </div>
          {/*end of spa */}



          {/* footer */}
          <Footer />
          {/*end of footer */}
        </div>
      </div>
    </>
  )
}

export default Home