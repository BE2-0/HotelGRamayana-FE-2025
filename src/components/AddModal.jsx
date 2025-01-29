import React, { useState } from 'react'
import ModalLayout from './ModalLayout'
import ImageUploadInput from './ImageUploadInput'
import toast from 'react-hot-toast';
import axios from 'axios';

const AddModal = ({ open, setOpen, setLoading, handleClose, text,addContent,isDescription=false,isSubTitle=false }) => {
    const apiKey = import.meta.env["VITE_IMAGE_SERVICE_URL"];
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [sub_title, setSub_title] = useState("");
    const [description, setDescription] = useState("");
    const validateForm = () => {
        if (!file || title.trim() === "" || (isDescription && description.trim() === "")|| (isSubTitle && sub_title.trim() === "")) {
            toast.error("Please fill all the fields");
            return false;
        }
    
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const data={
            title:title,
        }
        if (isDescription) {
            data.description = description;
        }
        if (isSubTitle) {
            data.sub_title = sub_title;
        }

        const formData = new FormData();
        formData.append("file", file);
        setOpen(false);
        setLoading(true);
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
                data.imageUrl = imageUrl;
                addContent(data);
                setTitle("");
                setDescription("");
                setSub_title("");
                setFile(null);
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
    return (
        <ModalLayout open={open} setOpen={setOpen} submit={handleSubmit} handleClose={handleClose}>
            <div className='p-5'>
                <div className="">
                    <h2 className="text-sm inline-block border-b-2 border-gray-400">
                        {text}
                    </h2>
                </div>
                <div className="grid gap-5 mt-5">
                    <div class="relative">
                        <input
                            type="text"
                            id="title"
                            class="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary-light peer"
                            placeholder=" "
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <label
                            for="title"
                            class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-light  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Title
                        </label>
                    </div>
                    {isSubTitle && (
                        <div class="relative">
                            <input
                                type="text"
                                id="sub_title"
                                class="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary-light peer"
                                placeholder=" "
                                value={sub_title}
                                onChange={(e) => { setSub_title(e.target.value) }}
                            />
                            <label
                                for="sub_title"
                                class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-light  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Sub-Title
                            </label>
                        </div>
                    )}
                    {isDescription && (
                        <div class="relative">
                            <input
                                type="text"
                                id="description"
                                class="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary-light peer"
                                placeholder=" "
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                            <label
                                for="description"
                                class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-light  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Description
                            </label>
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    <ImageUploadInput setFile={setFile} />
                </div>
            </div>
        </ModalLayout>
    )
}

export default AddModal