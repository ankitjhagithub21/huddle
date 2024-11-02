import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById } from '../api/events';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await getEventById(eventId);
      const eventData = await response.json();

      if (response.ok) {
        setEvent(eventData);
      } else {
        setEvent(null);
      }

      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const handleNext = () => {
    if (event && currentImageIndex < event.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) return <div>Event not found</div>;

  return (
    <div className="p-5 container mx-auto">
      <h1 className="text-3xl font-semibold mb-2 text-center">{event.title}</h1>
      <p className="text-lg text-gray-600 mb-2 text-center">
        Date: {new Date(event?.date).toLocaleDateString()}
      </p>
      <hr />

      {/* Image Carousel */}
      {
        event.images && event.images.length > 0 && <div className="relative max-w-5xl mx-auto">

          <img
            src={event?.images[currentImageIndex]?.imageUrl}
            alt={`Event image ${currentImageIndex + 1}`}
            className="w-full h-[50vh] object-cover rounded-lg"
          />

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-200"
            disabled={currentImageIndex === 0}
          >
            &#10094; {/* Left Arrow */}
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-200"
            disabled={currentImageIndex === (event.images.length - 1)}
          >
            &#10095; {/* Right Arrow */}
          </button>
          <div className="flex justify-center mt-2">
            {event.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              ></button>
            ))}
          </div>
        </div>
      }

      <div className='flex  md:justify-center justify-start gap-5 p-5'>
        {event?.speakers.map(speaker => (
          <div key={speaker._id} className='text-center rounded-lg shadow-xl bg-gray-200 p-3'>
            <img src={speaker.profilePic} alt={speaker.fullName} className='rounded-full min-w-32 w-32 h-32 border object-cover object-center' />
            <p className='mt-2'>{speaker.fullName}</p>
            <p>{speaker.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
