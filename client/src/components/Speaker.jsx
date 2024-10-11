import React from 'react'

const Speaker = ({speaker}) => {
    return (
        <div className='grid grid-cols-5 items-center my-2 border rounded-lg p-1'>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={speaker.fullName} className='w-12 rounded-full' />
            <p>{speaker.fullName}</p>
            <p>{speaker.mobile}</p>
            <p>{speaker.bio}</p>
            <p>{speaker.email}</p>
        </div>
    )
}

export default Speaker
