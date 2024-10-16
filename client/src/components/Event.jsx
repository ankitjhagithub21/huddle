
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const Event = ({ event, onDelete, onEdit }) => {
    return (

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 items-center p-2 border my-2 rounded-lg border-gray-300'>

            <h3 className="text-lg font-semibold">{event?.title}</h3>

            <p className="mt-1 text-gray-500">
                <strong>Date:</strong> {new Date(event?.date).toLocaleDateString()}
            </p>


            <div className='flex items-center gap-2 lg:justify-end justify-start'>
                <Link to={`/event/${event?._id}`} className="text-white p-2 rounded-full  bg-[var(--secondary)] ">
                    <FaEye/>
                </Link>
                <button
                    onClick={() => onEdit(event)}
                    className="bg-[var(--secondary)]  text-white p-2 rounded-full"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(event._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                    <FaTrash />
                </button>
            </div>
        </div>

    )
}

export default Event
