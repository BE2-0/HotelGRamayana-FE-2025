import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { IoMdClose } from "react-icons/io";
const OfferPopup = () => {
    const [showOffer, setShowOffer] = useState(false);
    const [offer, setOffer] = useState(null);
    useEffect(() => {
        const loadOffer = async () => {
            await fetchData(); // Ensure fetchData is awaited

            const offerDisplayed = sessionStorage.getItem("offerDisplayed");
            if (!offerDisplayed) {
                setShowOffer(true);
                sessionStorage.setItem("offerDisplayed", "true");
            }
        };

        loadOffer();
    }, []);

    const closeOffer = () => {
        setShowOffer(false);
    };

    const fetchData = async () => {
        try {
            const docRef = doc(firestore, "Settings", "offer"); // Reference to the document
            const docSnap = await getDoc(docRef); // Fetch document snapshot
            if (docSnap.exists()) {
                setOffer({ id: docSnap.id, ...docSnap.data() }); // Return document data with ID
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return (
        showOffer && offer?.isActive && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-[999] py-20">
            <div className=" relative w-1/2 overflow-auto m-auto">
                <div onClick={closeOffer} className="absolute top-1 cursor-pointer z-20 bg-white rounded-full right-1">
                    <IoMdClose className="text-2xl text-black" />
                </div>
                <img src={offer?.imageUrl} className="w-full" alt="" />
            </div>
        </div>
        )
    );
};

export default OfferPopup;
