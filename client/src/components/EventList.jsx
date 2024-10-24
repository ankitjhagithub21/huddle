import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent';
import useFetchEvents from '../hooks/useFetchEvents';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventById } from '../api/events';
import { deleteEvent } from '../redux/slices/eventSlice';
import ListType from './shared/ListType';
import List from './shared/List';

const EventList = () => {
    // Fetch events with custom hook
    useFetchEvents();

    // Get event state and loading status from Redux
    const { events, loading } = useSelector((state) => state.event);
    const [showForm, setShowForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isLoading,setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const onClose = () => {
        setShowForm(false);
        setSelectedEvent(null);
        
    };

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
        setShowForm(true);
        
    };

    const onCreate = () => {
        setSelectedEvent(null);
        setShowForm(true);
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


            {/* Create/Edit Event Form */}
            <CreateEvent
                showForm={showForm}
                onClose={onClose}
                eventData={selectedEvent}

            />
        </>
    );
};

export default EventList;
