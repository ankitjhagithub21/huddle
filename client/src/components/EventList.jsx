import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
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
            console.log(error.message);
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
                {events?.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <ul className="space-y-4">
                        {events.map((event) => (
                            <li key={event._id} className="p-4 border rounded-lg shadow-md relative">
                                <button 
                                    onClick={() => handleDeleteEvent(event._id)} 
                                    className="bg-red-500 hover:bg-red-600 absolute top-2 right-2 text-white p-2 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-gray-600">
                                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </p>
                                
                                {/* Ensure speakers array is defined before mapping */}
                                {event.speakers && event.speakers.length > 0 ? (
                                    <p className="text-gray-600 mb-3">
                                        <strong>Speakers:</strong> {event.speakers.map(speaker => speaker.fullName).join(', ')}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 mb-3">
                                        <strong>Speakers:</strong> No speakers assigned
                                    </p>
                                )}

                                <Link to={`/event/${event._id}`} className="text-blue-500 underline">
                                    View Event Details
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Create Event Form */}
            <CreateEvent showForm={showForm} onClose={onClose} onAdd={onAdd} />
        </section>
    );
};

export default EventList;
