
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Event = ({ event,onDelete,onEdit }) => {
    return (

        <li className="p-4 border rounded-lg shadow-md relative">
          <div className='flex items-center gap-2 mb-5'>
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
            <h3 className="text-lg font-semibold">{event?.title}</h3>

            <p className="mt-1 text-gray-500">
                <strong>Date:</strong> {new Date(event?.date).toLocaleDateString()}
            </p>
          
            <Link to={`/event/${event?._id}`} className="text-blue-500 mt-2 inline-block">
                View Details
            </Link>
        </li>

    )
}

export default Event
