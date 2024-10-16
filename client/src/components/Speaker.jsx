import { FaEdit, FaTrash } from 'react-icons/fa'

const Speaker = ({ speaker, onDelete, onEdit }) => {
   
    return (
        <div className='grid lg:grid-cols-5 md:grid-cols-3 items-center my-2 gap-1 border rounded-lg p-2 '>
            <img src={speaker.profilePic} alt={speaker.fullName} className='w-14 h-14 rounded-full object-cover' />
            <p> <span className='lg:hidden inline-block font-bold '>Name :</span> {speaker.fullName}</p>
            <p> <span className='lg:hidden inline-block font-bold '>Mobile :</span> {speaker.mobile}</p>
            <p><span className='lg:hidden inline-block font-bold '>Email :</span> {speaker.email}</p> 
            <div className='flex gap-2 lg:justify-end justify-start'>
                <button
                    onClick={() => onEdit(speaker)}
                    className='text-white bg-[var(--secondary)] p-2 rounded-md transition'
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(speaker._id)}
                    className='text-white bg-red-500 p-2 rounded-md hover:bg-red-600 transition'
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Speaker
