import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteAttendee } from '../redux/slices/attendeeSlice';
import useFetchAttendees from '../hooks/useFetchAttendees';
import { deleteAttendeeById } from '../api/attendees';
import CreateAttendee from './CreateAttendee';
import ListType from './shared/ListType';
import List from './shared/List';

const AttendeeList = () => {
    useFetchAttendees();
    const dispatch = useDispatch();
    const { attendees, loading } = useSelector((state) => state.attendee);
    const [showForm, setShowForm] = useState(false);
    const [selectedAttendee, setSelectedAttendee] = useState(null);
    const [isLoading,setIsLoading] = useState(false)

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
        setIsLoading(true)
        const toastId = toast.loading("Deleting attendee...");
        try{
            const res = await deleteAttendeeById(id);
            const data = await res.json();
            if (res.status === 200) {
                dispatch(deleteAttendee(id));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }catch(error){
           console.log(error)
           toast.error(error.message)
        }finally{
            setIsLoading(false)
            toast.dismiss(toastId)
        }
       
        
    };

    const columns = ['Name', 'Mobile', 'Email', 'Action'];

    return (
        <>
            <ListType text={"Attendees List"} />
            <List
                columns={columns}
                data={attendees}
                loading={loading}
                onEdit={onEdit}
                onDelete={onDelete}
                onCreate={onCreate}
                listType={"attendee"}
                isLoading={isLoading}
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
