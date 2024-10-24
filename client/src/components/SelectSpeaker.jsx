import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchSpeakers } from '../api/speakers';
import { setSelectedSpeakers } from '../redux/slices/eventSlice';

const SelectSpeaker = () => {
  const [allSpeakers, setAllSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedSpeakers } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const handleSelectSpeaker = (id) => {
    const updatedSpeakers = selectedSpeakers.includes(id)
      ? selectedSpeakers.filter((sid) => sid !== id)
      : [...selectedSpeakers, id];
    dispatch(setSelectedSpeakers(updatedSpeakers));
  };

  useEffect(() => {
    const getSpeakers = async () => {
      try {
        const res = await fetchSpeakers();
        if (!res.ok) throw new Error('Failed to fetch speakers.');
        const speakers = await res.json();
        setAllSpeakers(speakers);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    getSpeakers();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading speakers...</p>;
  }

  if (allSpeakers.length === 0) {
    return <p className="text-center mt-5">No speakers available.</p>;
  }


  return (


    <div className="flex flex-col gap-3 h-full overflow-y-scroll scroll">
      {allSpeakers.map((speaker) => (
        <div
          key={speaker._id}
          className="flex items-center justify-between gap-2 border  p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelectSpeaker(speaker._id)}
        >
          <div className="flex items-center gap-2">
            <img
              src={speaker.profilePic || 'https://via.placeholder.com/150'}
              alt={speaker.fullName}
              className="w-14 h-14 rounded-full object-cover border"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <p className="font-medium">{speaker.fullName}</p>
          </div>
          {selectedSpeakers.includes(speaker._id) && (
            <FaCheckCircle size={25} color="green" />
          )}
        </div>
      ))}
    </div>

  );
};

export default SelectSpeaker;
