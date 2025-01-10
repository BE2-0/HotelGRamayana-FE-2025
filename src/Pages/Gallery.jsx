import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import aboutimage from "../assets/images/about.png"
import historyimage from "../assets/images/history.png"
import dineimage from "../assets/images/dine.png"
import dine2image from "../assets/images/dining2.png"
import bedimage from "../assets/images/bed.png"
import Footer from '../components/Footer'

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import fjGallery from 'flickr-justified-gallery';
import Loader from '../common/Loader'
import lgThumbnail from 'lightgallery/plugins/thumbnail';

const data = [
    {
        image: aboutimage,
        title: "Butcher's Block",
        description:
            'Discover the wonderful depths of flavour that only pure wood-fire can forge, in this avant-garde atmospheric live cooking experience.',
        link: '#',
    },
    {
        image: historyimage,
        title: 'Smoky Delights',
        description:
            'Experience the rich taste of smoky creations, prepared with precision and passion over a live fire.',
        link: '#',
    },
    {
        image: bedimage,
        title: 'Flame & Sizzle',
        description:
            'Savor the extraordinary flavors of flame-grilled delicacies in a vibrant, immersive dining experience.',
        link: '#',
    },
    {
        image: dineimage,
        title: 'Tiffin Room',
        description:
            "One of Singapore's oldest North Indian restaurants, serving up the golden age delicacies of the maharajahs since 1892.",
        link: '#',
    },
];

// const gallery = [{
//     imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/turkis-royal-room-dOqyzB3GPDID1BKE.jpg",
// },
// {
//     imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/lobby-3-YD061kRqy2HpR4b8.jpg",
// },
// {
//     imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/junior-suit-5-mP4nqkRL51CpRkgQ.jpg",
// },
// {
//     imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/junior-suit-AoPvB59kkMhg5Z53.jpg",
// },
// ]

// const gallery = [
//     {
//         imageUrl: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=521,fit=crop/mnl3DyqLpOSqoMLB/generated/generated-mnlv1DRlXRtDpEoD.png",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/turkis-royal-room-dOqyzB3GPDID1BKE.jpg",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/lobby-3-YD061kRqy2HpR4b8.jpg",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/junior-suit-AoPvB59kkMhg5Z53.jpg",
//     },

//     {
//         imageUrl: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=718,fit=crop/mnl3DyqLpOSqoMLB/reception-1-mePvl4Oy31iwqyy7.jpg",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/lobby-3-YD061kRqy2HpR4b8.jpg",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/lobby-3-YD061kRqy2HpR4b8.jpg",
//     },
//     {
//         imageUrl: "https://assets.zyrosite.com/mnl3DyqLpOSqoMLB/junior-suit-5-mP4nqkRL51CpRkgQ.jpg",
//     },
// ];


const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on mount
        const loadImages = async () => {
          await importImages();
          setLoading(false);
        };
        setTimeout(() => loadImages(), 1000); // Simulate delay for loading experience
      }, []);
    
      const importImages = async () => {
        const importedImages = import.meta.glob("../assets/Gallery/*.{jpg,JPG,jpeg,JPEG,png,svg}", { eager: true });
        const imageKeys = Object.keys(importedImages).slice(0, 20); 
        const loadedImages = imageKeys.map((key) => {
          const imageModule = importedImages[key];
          return imageModule.default || key;
        });
        setImages(loadedImages);
      };
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    // useEffect(() => {
    //     fjGallery(document.querySelectorAll('.gallery'), {
    //         itemSelector: '.gallery__item',
    //         rowHeight: 180,
    //         lastRow: 'start',
    //         gutter: 2,
    //         rowHeightTolerance: 0.1,
    //         calculateItemsHeight: false,
    //     });
    // }, []);

    const getRandomSpan = () => {
        const colSpan = Math.floor(Math.random() * 2) + 1; // Random value: 1 or 2
        const rowSpan = Math.floor(Math.random() * 2) + 1; // Random value: 1 or 2
        return { col: colSpan, row: rowSpan };
    };

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
                            <h2 className='font-canela text-6xl font-medium tracking-widest mt-8' ><span className='font-canela uppercase'>Explore </span><i className='font-canela font-medium'>our</i> <span className='font-canela uppercase'> World</span></h2>
                        </div>
                        <div className='absolute -z-10 top-0 left-0 w-full h-[150%] bg-[#E2E0D1]'>
                        </div>
                    </div>
                    {/* end of hero section */}

                    {/* contents */}
                    <div className='px-10 mt-10'>
                        <div className='mb-20'>
                            <LightGallery
                                plugins={[lgVideo,lgThumbnail]}
                                mode="lg-fade"
                                pager={false}
                                thumbnail={true}
                                galleryId={'nature'}
                                autoplayFirstVideo={false}
                                elementClassNames={'gallery'}
                                mobileSettings={{
                                    controls: false,
                                    showCloseIcon: false,
                                    download: false,
                                    rotate: false,
                                }}
                            >
                                {images.length > 0 && images.map((image, index) => (
                                    <a href={image} key={index} className='gallery-item'>
                                        <img src={image} alt={image} />
                                    </a>
                                ))}
                            </LightGallery>
                        </div>
                    </div>


                    {/* <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div class="grid gap-4">
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center "
                                    src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center "
                                    src="https://docs.material-tailwind.com/img/team-3.jpg"
                                    alt="gallery-photo"
                                />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center "
                                    src="https://docs.material-tailwind.com/img/team-3.jpg"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                            <div>
                                <img
                                    class="h-auto max-w-full rounded-lg object-cover object-center"
                                    src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
                                    alt="gallery-photo"
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="gallery">
                        {gallery.length > 0 && gallery.map((element, index) => (
                            <a href="" key={index} className='gallery-item'>
                                <img src={element.imageUrl} alt="" />
                            </a>
                        ))}
                    </div> */}
                    {/*end of contents */}
                    {/* footer */}
                    <Footer />
                    {/*end of footer */}
                </div>
            </div>
        </>
    )
}

export default Gallery