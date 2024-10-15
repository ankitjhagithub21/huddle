import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const onClose = () => {
        setShowForm(false);
    };

    // Fetch all events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_EVENT_URL}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                toast.error('Error fetching events');
            }
        };
        fetchEvents();
    }, []);

    // Handle event deletion
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_EVENT_URL}/${eventId}`);
            toast.success('Event deleted successfully!');
            setEvents(events.filter((event) => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Error deleting event');
        }
    };

    // Handle adding a new event
    const onAdd = (event) => {
        setEvents([...events, event]);
    };

    return (
        <section>
            <div className="max-w-4xl p-6">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <h2 className="text-2xl font-bold mb-4">All Events</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-[var(--secondary)] text-white px-4 py-2 rounded-lg"
                    >
                        Add new event
                    </button>
                </div>

                {/* Show message if no events */}
                {events && events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <ul className="space-y-4">
                       {
                        events && events.length === 0 ? <p>no event found.</p> :  events.map((event)=>{
                            return <Event key={event?._id} onDelete={handleDeleteEvent} event={event}/>
                        })
                       }
                    </ul>
                )}
            </div>

            {/* Create Event Form */}
            <CreateEvent showForm={showForm} onClose={onClose} onAdd={onAdd} />
        </section>
    );
};

export default EventList;
