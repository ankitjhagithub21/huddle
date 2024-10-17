import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteAttendee } from '../redux/slices/attendeeSlice';
import useFetchAttendees from '../hooks/useFetchAttendees';
import { deleteAttendeeById } from '../api/attendees';
import CreateAttendee from './CreateAttendee';
import ListType from './shared/ListType';
import ListTop from './shared/ListTop';
import ListTable from './shared/ListTable';

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

    const columns = ['Name', 'Mobile', 'Email', 'Action'];

    return (
        <>

            <ListTop onCreate={onCreate} btnText={"Add Attendee"} />
            <ListType text={"Attendees List"} />
            <ListTable
                columns={columns}
                data={attendees}
                loading={loading}
                onEdit={onEdit}
                onDelete={onDelete}
                listType={"attendees"}
            />
            <CreateAttendee
                onClose={onClose}
                showForm={showForm}
                attendeeData={selectedAttendee}
            />
        </>

    );
};

export default AttendeeList;
