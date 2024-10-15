import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Attendee = ({ attendee, onEdit, onDelete }) => {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 items-center p-2 border my-2 rounded-lg border-gray-300'>
            {/* Full Name */}
            <p>{attendee.fullName}</p>

            {/* Mobile */}
            <p>{attendee.mobile}</p>

            {/* Email */}
            <p>{attendee.email}</p>

            {/* Action Buttons */}
            <div className='flex gap-2'>
                <button
                    onClick={() => onEdit(attendee)}
                    className='text-white bg-[var(--secondary)] p-2 rounded-md  transition'
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(attendee._id)}
                    className='text-white bg-red-500 p-2 rounded-md hover:bg-red-600 transition'
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default Attendee;
