import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Attendee from './Attendee';
import { deleteAttendee } from '../redux/slices/attendeeSlice';
import useFetchAttendees from '../hooks/useFetchAttendees';
import { deleteAttendeeById } from '../api/attendees';
import CreateAttendee from './CreateAttendee';
import ExcelUploader from './ExcelUploader';
import Search from './Search';

const AttendeeList = () => {
    useFetchAttendees();
    const dispatch = useDispatch();
    const { attendees, loading } = useSelector((state) => state.attendee);
    const [showForm, setShowForm] = useState(false);
    const [selectedAttendee, setSelectedAttendee] = useState(null);

    const onClose = () => {
        setShowForm(false);
        setSelectedAttendee(null);
    };

    const onEdit = (attendee) => {
        setSelectedAttendee(attendee);
        setShowForm(true);
    };

    const onCreate = () => {
        setSelectedAttendee(null);
        setShowForm(true);
    };

    const onDelete = async (id) => {
        const res = await deleteAttendeeById(id);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteAttendee(id));
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <section>
         <div className='max-w-4xl p-4'>
         <div className='flex items-center gap-2 justify-between'>
                <Search />
                <button onClick={onCreate} className='text-white flex items-center gap-1 rounded-lg px-4 py-2 bg-[var(--secondary)]'>
                    <FaPlus />
                    <span className='md:inline-block hidden'>Add Attendee</span>
                </button>
            </div>
            <h2 className='mt-5 text-2xl font-bold'>Attendees List</h2>
            <div className='lg:grid hidden grid-cols-4 items-center my-2 p-2 font-bold'>
                <p>Name</p>
                <p>Mobile</p>
                <p>Email</p>
                <p className='text-end'>Action</p>
            </div>
            <div>
                {loading ? <p>Loading...</p> : attendees?.length === 0 ? <p>No attendees found</p> :
                    attendees?.map((attendee) => (
                        <Attendee key={attendee._id} attendee={attendee} onDelete={onDelete} onEdit={onEdit} />
                    ))
                }
            </div>
            <CreateAttendee
                onClose={onClose}
                showForm={showForm}
                attendeeData={selectedAttendee}
            />
         </div>
        </section>
    );
};

export default AttendeeList;
