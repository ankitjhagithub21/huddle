import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Attendee from './Attendee';
import { deleteAttendee } from '../redux/slices/attendeeSlice';
import useFetchAttendees from '../hooks/useFetchAttendees';
import { deleteAttendeeById } from '../api/attendees';
import CreateAttendee from './CreateAttendee';
import ListHeader from './shared/ListHeader';
import ListType from './shared/ListType';
import ListTop from './shared/ListTop';

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
               <ListTop onCreate={onCreate}/>
                <ListType text={"Attendees List"} />
                <ListHeader columns={['Name', 'Mobile', 'Email', 'Action']} />
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
