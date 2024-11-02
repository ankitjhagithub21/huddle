import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useFetchEvents from '../hooks/useFetchEvents';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventById } from '../api/events';
import { deleteEvent } from '../redux/slices/eventSlice';
import ListType from './shared/ListType';
import List from './shared/List';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    // Fetch events with custom hook
    useFetchEvents();

    // Get event state and loading status from Redux
    const { events, loading } = useSelector((state) => state.event);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isLoading,setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate()


    

    const handleDeleteEvent = async (eventId) => {
        setIsLoading(true)
         const toastId = toast.loading("Deleting event...")
        try {
            await deleteEventById(eventId);
            toast.success('Event deleted successfully!');
            dispatch(deleteEvent(eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event.');
        }finally{
            setIsLoading(false)
            toast.dismiss(toastId)
        }
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        
    };

    const onCreate = () => {
        navigate("/event/new")
       
    };

    const columns = ['Event Name', 'Event Date', 'Action'];

    return (
        <>

           
            <ListType text={"Event List"} />
            <List
                columns={columns}
                data={events}
                loading={loading}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                onCreate={onCreate}
                listType={"event"}
                isLoading={isLoading}
            />

        </>
    );
};

export default EventList;
