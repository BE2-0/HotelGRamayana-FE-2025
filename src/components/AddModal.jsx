import React, { useState } from 'react'
import ModalLayout from './ModalLayout'
import ImageUploadInput from './ImageUploadInput'

const AddModal = ({ open, setOpen, setLoading, handleClose, text }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const handleSubmit = () => {

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
                </div>
                <div className="mt-5">
                    <ImageUploadInput setFile={setFile} />
                </div>
            </div>
        </ModalLayout>
    )
}

export default AddModal