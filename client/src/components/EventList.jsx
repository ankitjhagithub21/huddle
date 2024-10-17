import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent';
import useFetchEvents from '../hooks/useFetchEvents';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventById } from '../api/events';
import { deleteEvent } from '../redux/slices/eventSlice';
import ListTop from './shared/ListTop';
import ListType from './shared/ListType';
import ListTable from './shared/ListTable';

const EventList = () => {
    // Fetch events with custom hook
    useFetchEvents();

    // Get event state and loading status from Redux
    const { events, loading } = useSelector((state) => state.event);
    const [showForm, setShowForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const dispatch = useDispatch();

    const onClose = () => {
        setShowForm(false);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEventById(eventId);
            toast.success('Event deleted successfully!');
            dispatch(deleteEvent(eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event.');
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

            <ListTop onCreate={onCreate} btnText={"Add Event"} />
            <ListType text={"Event List"} />
            <ListTable
                columns={columns}
                data={events}
                loading={loading}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                listType={"events"}
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
