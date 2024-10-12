import { FaEdit, FaTrash } from 'react-icons/fa'

const Speaker = ({ speaker, onDelete }) => {
    return (
        <div className='grid grid-cols-5 items-center my-2 border rounded-lg p-1'>
            <img src={speaker.profilePic} alt={speaker.fullName} className='w-12 h-12 rounded-full object-cover' />
            <p>{speaker.fullName}</p>
            <p>{speaker.mobile}</p>
            <p>{speaker.email}</p>
            <div className='flex items-center gap-2'>
                <button><FaEdit className='text-[var(--secondary)]' size={20} /></button>
                <button onClick={() => onDelete(speaker._id)}><FaTrash color='red' /></button>
            </div>
        </div>
    )
}

export default Speaker
