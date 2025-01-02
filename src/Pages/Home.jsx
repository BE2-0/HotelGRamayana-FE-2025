import React from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
import aboutimage from "../assets/images/about.png"
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
              <div className='flex flex-col justify-center items-center px-10'>
                <div className=''>
                  <h2 className='font-bold uppercase text-[13px]'>Suites</h2>
                  <h2 className='font-canela text-5xl uppercase !font-thin tracking-wide my-6' contenteditable="true">Your <span className='italic lowercase'>oasis</span> in <br /> Nepal</h2>
                  <p>
                    A suite at Raffles Singapore is one of the world's most desirable addresses. Evoking the elegant, old-world glamour of a true grande dame, our 115 suites blend lofty architectural splendour and authentic details with all the comfort bestowed by modern technology and design.
                  </p>
                </div>

              </div>
            </div>
          </div>
          {/*end of about section */}
        </div>
      </div>
    </>
  )
}

export default Home