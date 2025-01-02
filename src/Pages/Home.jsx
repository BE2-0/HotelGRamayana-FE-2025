import React from 'react'
import Nav from '../components/Nav'
import heroVideo from "../assets/videos/heroVideo.mp4"
const Home = () => {
  return (
    <>
      <div className=''>
        <Nav />

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
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-black opacity-70 z-10"></div>
      </div>
    </>
  )
}

export default Home