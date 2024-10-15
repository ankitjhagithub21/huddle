// EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState(null)

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

  const generateEventSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-'); // Converts "Event Title" to "event-title"
  };



  const handlePublishEvent = () => {
    const eventSlug = generateEventSlug(event.title);

    setSlug(eventSlug)
  }


  if (loading) {
    return <p>Loading...</p>
  }

  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Title: {event.title}</h1>
      <p className="text-lg text-gray-600 mb-2">Date: {event.date}</p>

      <p className="mt-1 text-gray-500">
                <strong>Speakers:</strong> {event?.speakers.map(speaker => speaker.fullName).join(', ')}
            </p>
            <p className="mt-1 text-gray-500">
                <strong>Attendees:</strong> {event?.attendees.map(attendee => attendee.fullName).join(', ')}
            </p>


      <div className="mt-4" dangerouslySetInnerHTML={{ __html: event.description }} />
      
      <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded mt-4" onClick={handlePublishEvent}>Publish Now</button>
      {
        slug && <a href={`${slug}.html`} target="_blank">Public url</a>
      }
    </div>
  );
};

export default EventDetails;
