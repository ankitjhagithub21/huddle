import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
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

  const handleSelectAll = () => {
    if (selectedSpeakers.length === allSpeakers.length) {
      // Deselect all
      dispatch(setSelectedSpeakers([]));
    } else {
      // Select all
      const allSpeakerIds = allSpeakers.map((speaker) => speaker._id);
      dispatch(setSelectedSpeakers(allSpeakerIds));
    }
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

  const selectedSpeakerData = allSpeakers.filter((speaker) =>
    selectedSpeakers.includes(speaker._id)
  );
  const unselectedSpeakers = allSpeakers.filter(
    (speaker) => !selectedSpeakers.includes(speaker._id)
  );

  return (
    <div className="flex flex-col h-full overflow-y-scroll scroll">
      {/* Select All / Deselect All Button */}
      <div className="flex justify-between items-center p-2">
        <h2 className='text-2xl font-bold'>Select Speaker</h2>
      <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSelectAll}
        >
          {selectedSpeakers.length === allSpeakers.length
            ? 'Deselect All'
            : 'Select All'}
        </button>
      </div>

      {/* Selected Speakers Display */}
      <div className="flex flex-wrap gap-2 p-2">
        {selectedSpeakerData.map((speaker) => (
          <div
            key={speaker._id}
            className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1"
          >
            <img src={speaker.profilePic} alt={speaker.fullName} className="rounded-full w-10" />
            <p className="text-sm font-medium">{speaker.fullName}</p>
            <FaTimes
              size={14}
              className="cursor-pointer text-red-600"
              onClick={() => handleSelectSpeaker(speaker._id)}
            />
          </div>
        ))}
      </div>

      {/* Speakers List */}
      {unselectedSpeakers.map((speaker) => (
        <div
          key={speaker._id}
          className="flex items-center justify-between gap-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelectSpeaker(speaker._id)}
        >
          <div className="flex items-center gap-2">
            <img
              src={speaker.profilePic || 'https://via.placeholder.com/150'}
              alt={speaker.fullName}
              className="w-10 h-10 rounded-full object-cover border"
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
