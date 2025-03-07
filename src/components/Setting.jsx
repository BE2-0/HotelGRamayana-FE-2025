import React, { useEffect, useState } from 'react'
import ModalLayout from './ModalLayout'
import ImageUploadInput from './ImageUploadInput'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { firestore } from '../firebase/firebase'
import { collection, doc,getDoc,updateDoc } from 'firebase/firestore'
const Setting = ({ open, setOpen, setLoading, handleClose, text}) => {
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
    const [file, setFile] = useState(null);
    const [offerChecked,setOfferChecked]=useState(false);
    const { userLoggedIn } = useAuth();
    const[existingImageUrl,setExistingImageUrl]=useState(null);
    useEffect(()=>{
        fetchData();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file)
        {
            const formData = new FormData();
            formData.append("file", file);
            if (existingImageUrl && existingImageUrl.trim() !== "") {
                formData.append("existingFileUrl", existingImageUrl);
              } 
            setOpen(false);
            setLoading(true);
            const url = `${apiKey}api/file/upload`;
            const token = "9c8fcb20-d2d7-4a1a-9e29-71a892cfa1f3";
            try {
                const response = await axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token
                        'Content-Type': 'multipart/form-data', // Important for sending formData
                    },
                });
    
                if (response.status === 200) {
                    console.log(response);
                    const imageUrl = response.data.imageUrl;
                    updateSettings(imageUrl);
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
            }
        }
        else{
            updateSettings(null);
        }

    }

    const updateSettings=async (imageUrl)=>{
    try {
      if (!userLoggedIn) {
        toast.error("must login");
        return;
      }
      if(offerChecked && (!existingImageUrl || existingImageUrl.trim() == "") && !file)
      {
        toast.error("Please select image!");
        return;
      }
      const updatedData = {
        isActive:offerChecked,
      };
      if(imageUrl !=null)
      {
        updatedData.imageUrl=imageUrl;
      }
      const docRef = doc(firestore, "Settings", "offer");
      await updateDoc(docRef, updatedData);
      setFile(null);
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }finally{
        setLoading(false);
        handleClose();
    }
    }
     const fetchData = async () => {
            try {
                const docRef = doc(firestore, "Settings", "offer"); // Reference to the document
                const docSnap = await getDoc(docRef); // Fetch document snapshot
                if (docSnap.exists()) {
                    setOfferChecked(docSnap.data().isActive);
                    setExistingImageUrl(docSnap.data().imageUrl);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
    return (
        <ModalLayout open={open} setOpen={setOpen} submit={handleSubmit} handleClose={handleClose}>
            <div className='p-5'>
                <div className="">
                    <h2 className="text-sm inline-block border-b-2 border-gray-400">
                        {text}
                    </h2>
                </div>
                <div className="grid gap-5 grid-cols-2 mt-5">
                    <div>
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox"
                                checked={offerChecked}
                                onChange={(e) => { setOfferChecked(e.target.checked) }}
                                class="sr-only peer" />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none !outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
                            <span class="ms-3 text-sm font-medium text-gray-900">Offer</span>
                        </label>
                    </div>
                </div>
                <div className="mt-5">
                    <ImageUploadInput setFile={setFile} existingImageUrl={existingImageUrl} />
                </div>
            </div>
        </ModalLayout>
    )
}

export default Setting