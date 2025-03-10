import React from 'react'
import heroVideo from "../assets/videos/heroVideo.mp4"

const HeroSection = () => {
    const videoSrc = `https://www.youtube.com/embed/JGQrIzEmpJU?autoplay=1&controls=0&modestbranding=1&rel=0&mute=1&loop=1&playlist=JGQrIzEmpJU`;
    return (
        <div id='player' className=" relative pointer-events-none w-full aspect-video">
            <video
                src={heroVideo}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            ></video>
            {/* <iframe
                width="560"
                height="315"
                src={videoSrc}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
            ></iframe> */}
        </div>
    )
}

export default HeroSection