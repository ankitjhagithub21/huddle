
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
const Event = ({ event,onDelete }) => {
    return (

        <li className="p-4 border rounded-lg shadow-md relative">
            <button
                onClick={() => onDelete(event._id)}
                className="bg-red-500 hover:bg-red-600 absolute top-2 right-2
                text-white p-2 rounded-full"
            >
                <FaTrash />
            </button>
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
