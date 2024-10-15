import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import CreateEvent from './CreateEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);

    const [showForm,setShowForm] = useState(false)
    const onClose = () => {
      setShowForm(false)
    }
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

    return (
      <section>
          <div className="max-w-4xl p-6">
          
           <div className='flex items-center justify-between gap-3 mb-5'>
           <h2 className="text-2xl font-bold mb-4">All Events</h2>
           <button onClick={()=>setShowForm(true)} className='bg-[var(--secondary)] text-white px-4 py-2 rounded-lg'>Add new event</button>
           </div>

            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <ul className="space-y-4">
                    {events.map((event) => (
                        <li key={event._id} className="p-4 border rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.description}</p>
                            <p className="text-sm text-gray-600">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Speakers:</strong> {event.speakers.map(speaker => speaker.fullName).join(', ')}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
        <CreateEvent showForm={showForm} onClose={onClose}/>
      </section>
    );
};

export default EventList;
