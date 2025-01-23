import React from 'react'

const ImageChangeButton = ({onClick}) => {
    return (
        <div>
            <button onClick={onClick} className='px-4 text-sm tracking-widest py-2 rounded-xl text-white bg-gray-600 hover:bg-gray-800  duration-300 ease-linear cursor-pointer'>Change</button>
        </div>
    )
}

export default ImageChangeButton