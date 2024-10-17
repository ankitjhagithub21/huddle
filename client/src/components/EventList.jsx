import React, { useState } from 'react';
import Event from './Event';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent';
import useFetchEvents from '../hooks/useFetchEvents';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventById} from '../api/events';
import { deleteEvent} from '../redux/slices/eventSlice';
import Search from './Search';
import AddButton from './shared/AddButton';

const EventList = () => {
    // Fetch events with custom hook
    useFetchEvents();

    // Get event state and loading status from Redux
    const { events, loading } = useSelector(state => state.event);
    const [showForm, setShowForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event when editing
    const dispatch = useDispatch();

    // Close the Create Event form
    const onClose = () => {
        setShowForm(false);
        setSelectedEvent(null); // Reset selected event
    };

    // Handle event deletion
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

    // Handle event editing
    const handleEditEvent = (event) => {  
        setSelectedEvent(event);
        setShowForm(true);
    };

    const onCreate = () =>{
        setSelectedEvent(null)
        setShowForm(true)
    }

    return (
        <section>
            <div className="max-w-4xl p-4">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <Search/>
                  <AddButton text={"Add Event"} onBtnClick={onCreate}/>
                </div>
                <h2 className="text-2xl font-bold">All Events</h2>
                <div className='lg:grid hidden grid-cols-3 items-center my-2 font-bold '>
                    <p>Event Name</p>
                    <p>Event Date</p>
                   
                    <p className='text-end'>Action</p>
                </div>

                {/* Show loading message */}
                {loading ? (
                    <p>Loading events...</p>
                ) : events?.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <ul className="space-y-4">
                        {events?.map((event) => (
                            <Event
                                key={event._id}
                                event={event}
                                onDelete={handleDeleteEvent}
                                onEdit={handleEditEvent}
                            />
                        ))}
                    </ul>
                )}
            </div>

            {/* Create/Edit Event Form */}
            <CreateEvent
                showForm={showForm}
                onClose={onClose}
                eventData={selectedEvent} // Pass selected event data for editing
            />
        </section>
    );
};

export default EventList;
