import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Attendee from './Attendee';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Search from './Search';
import { deleteAttendee } from '../redux/slices/attendeeSlice';
import useFetchAttendees from '../hooks/useFetchAttendees';
import { deleteAttendeeById } from '../api/attendees';
import CreateAttendee from './CreateAttendee';
import ExcelUploader from './ExcelUploader';


const AttendeeList = () => {
    useFetchAttendees();
    const dispatch = useDispatch();
    const { attendees, loading } = useSelector((state) => state.attendee);
    const [showForm, setShowForm] = useState(false);
    const [currState, setCurrState] = useState(null);
    const [selectedAttendee, setSelectedAttendee] = useState(null);

    const onClose = () => {
        setShowForm(false);
        setSelectedAttendee(null);
    };

    const onEdit = (attendee) => {
        setSelectedAttendee(attendee);
        setCurrState('edit');
        setShowForm(true);
    };

    const onCreate = () => {
        setSelectedAttendee(null);
        setCurrState('add');
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
        <>
             <div className='flex items-center gap-2'>
                <ExcelUploader />
              
        
           
            <button onClick={onCreate} className='text-white flex items-center gap-1 rounded-lg p-2 bg-[var(--secondary)]'>
                    <FaPlus />
                    <span className='md:inline-block hidden'>Add Attendee</span>
                </button>
            </div>
            <h2 className='mt-5 text-2xl font-bold'>Attendees List</h2>
            <div className='lg:grid hidden grid-cols-4 items-center my-2 p-2 font-bold'>
              
                <p>Name</p>
                <p>Mobile</p>
                <p>Email</p>
                <p>Action</p>
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
                currState={currState}
                attendeeData={selectedAttendee}
            />
        </>
    );
};

export default AttendeeList;
