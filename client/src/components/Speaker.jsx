import { FaEdit, FaTrash } from 'react-icons/fa'

const Speaker = ({ speaker }) => {
    return (
        <div className='grid grid-cols-5 items-center my-2 border rounded-lg p-1'>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={speaker.fullName} className='w-12 rounded-full' />
            <p>{speaker.fullName}</p>
            <p>{speaker.mobile}</p>
            <p>{speaker.email}</p>
            <div className='flex items-center gap-2'>
                <button> <FaEdit color='blue' size={20} /></button>
                <button ><FaTrash color='red' /></button>
            </div>
        </div>
    )
}

export default Speaker
