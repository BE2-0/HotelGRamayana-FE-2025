import React, { useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalLayout from './ModalLayout';
import ImageUploadInput from './ImageUploadInput';
const ChangeImageModal = ({ open, setOpen, setLoading,imageChange,handleClose,existingImageUrl }) => {
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
    const [file, setFile] = useState(null)
    const validateForm = () => {
        if (
            !file
        ) {
            toast.error("Please select image first");
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("existingFileUrl", existingImageUrl);
        setOpen(false);
        setLoading(true);
        const method = "post";
        const url = `${apiKey}api/file/upload`;
        const token="9c8fcb20-d2d7-4a1a-9e29-71a892cfa1f3";
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token
                    'Content-Type': 'multipart/form-data', // Important for sending formData
                },
            });

            if (response.status === 200) {
                console.log(response);
                const imageUrl=response.data.imageUrl;
                imageChange(imageUrl);
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
    };

    return (
        <>
            <ModalLayout open={open} setOpen={setOpen} submit={handleSubmit} handleClose={handleClose}>
                <div className='p-5'>
                    <div className="">
                        <h2 className="text-sm inline-block border-b-2 border-gray-400">
                            Upload Image
                        </h2>
                    </div>
                    <div className="mt-5">
                        <ImageUploadInput setFile={setFile} />
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default ChangeImageModal