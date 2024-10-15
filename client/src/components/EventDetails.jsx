// EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams(); 
  
  const [event, setEvent] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    // Fetch the event details from your backend using eventId
    const fetchEvent = async () => {
      const response = await fetch(`${import.meta.env.VITE_EVENT_URL}/${eventId}`);
      const eventData = await response.json();
      setEvent(eventData);
      setLoading(false)
    };

    fetchEvent();
  }, [eventId]);

  if(loading){
    return <p>Loading...</p>
  }

  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-lg text-gray-600">Date: {event.date}</p>
      <p className="text-lg text-gray-600">Venue: {event.venue}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: event.description }} />
      <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded mt-4">Publish Now</button>
    </div>
  );
};

export default EventDetails;
