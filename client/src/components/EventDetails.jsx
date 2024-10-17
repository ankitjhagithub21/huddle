import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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




  if (loading) {
    return <p>Loading...</p>
  }

  if (!event) return <div>Event not found</div>;

  return (
    <div className=" p-5 container mx-auto">

      <h1 className="text-xl font-bold mb-2 text-center">{event.title}</h1>
      <p className="text-lg text-gray-600 mb-2 text-center">Date:{new Date(event?.date).toLocaleDateString()}</p>
      <hr />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: event.description }} />
      <p className="mt-1 text-gray-600">
        <strong>Speakers:</strong>
        <div className='flex flex-wrap gap-5 p-5'>
          {event?.speakers.map(speaker => <div className='text-center rounded-lg shadow-xl bg-gray-200  p-3'>
            <img src={speaker.profilePic} alt={speaker.fullName} className='rounded-full w-28 h-28 border object-cover object-center' />
            <p className='mt-2'>{speaker.fullName}</p>

          </div>)}
        </div>
      </p>
      {/* <p className="mt-1 text-gray-500">
                <strong>Attendees:</strong> {event?.attendees.map(attendee => attendee.fullName).join(', ')}
            </p> */}






    </div>
  );
};

export default EventDetails;
