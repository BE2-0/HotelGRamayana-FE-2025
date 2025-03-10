import React from 'react'
const HeroSection = () => {
    const videoSrc = `https://www.youtube.com/embed/BImcneF2CxE?autoplay=1&controls=0&modestbranding=1&rel=0&mute=1&loop=1&playlist=BImcneF2CxE`;
    return (
        <div id='player' className=" relative pointer-events-none w-full !h-screen " style={{
            backgroundImage: "url('/path-to-your-image.jpg')",
        }}>
            {/* <video
                src={heroVideo}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            ></video> */}
            <iframe
                width="560"
                height="315"
                src={videoSrc}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube video player"
                className="absolute inset-0 w-full h-full !object-cover"
            ></iframe>
        </div>
    )
}

export default HeroSection