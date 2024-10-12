import { FaEdit, FaTrash } from 'react-icons/fa'

const Speaker = ({ speaker, onDelete, onEdit }) => {
   
    return (
        <div className='grid grid-cols-5 items-center my-2 border rounded-lg p-1'>
            <img src={speaker.profilePic} alt={speaker.fullName} className='w-12 h-12 rounded-full object-cover' />
            <p>{speaker.fullName}</p>
            <p>{speaker.mobile}</p>
            <p>{speaker.email}</p>
            <div className='flex items-center gap-2'>
                <FaEdit className='text-[var(--secondary)]' onClick={()=>onEdit(speaker)} size={20}/>
                <FaTrash color='red' onClick={() => onDelete(speaker._id)}/>
            </div>
        </div>
    )
}

export default Speaker
