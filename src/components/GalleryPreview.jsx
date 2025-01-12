import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { useState } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


const GalleryPreview = ({ images }) => {
    const [dynamicEl, setDynamicEl] = useState([]);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const openLightGallery = (image) => {
        // Set the clicked image to the gallery
        setDynamicEl([{ src: image, thumb: image }]);
        setIsGalleryOpen(true);
    };

    const closeLightGallery = () => {
        setIsGalleryOpen(false);
    };

    return (
        <div>

            <div className="gallery">
                {images.length > 0 &&
                    images.map((image, index) => (
                        <div
                            key={index}
                            className="gallery-item"
                            onClick={() => openLightGallery(image)}
                        >
                            <img src={image} alt={`Gallery item ${index + 1}`} />
                        </div>
                    ))}
            </div>
            <div>
                {/* LightGallery Instance */}
                {isGalleryOpen && (
                    <LightGallery
                        plugins={[lgVideo, lgThumbnail]}
                        dynamic={true}
                        dynamicEl={dynamicEl}
                        onClose={closeLightGallery} // Close LightGallery when the gallery is closed
                        elementClassNames="dynamic-lightgallery"
                        mode="lg-fade"
                        download={false}
                    />
                )}
            </div>
        </div>
    );
};

export default GalleryPreview;
