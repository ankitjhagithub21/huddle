import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchAttendees } from '../api/attendees';
import { setSelectedAttendees } from '../redux/slices/eventSlice';
import ExcelUploader from './ExcelUploader';

const SelectAttendee = () => {
  const [attendees, setAttendees] = useState([]);
  const { selectedAttendees } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    const updated = selectedAttendees.includes(id)
      ? selectedAttendees.filter((aid) => aid !== id)
      : [...selectedAttendees, id];
    dispatch(setSelectedAttendees(updated));
  };

  const handleSelectAll = () => {
    if (selectedAttendees.length === attendees.length) {
      // Deselect all if all are currently selected
      dispatch(setSelectedAttendees([]));
    } else {
      // Select all attendees' IDs
      const allAttendeeIds = attendees.map((attendee) => attendee._id);
      dispatch(setSelectedAttendees(allAttendeeIds));
    }
  };

  useEffect(() => {
    const loadAttendees = async () => {
      try {
        const res = await fetchAttendees();
        if (res.ok) {
          const data = await res.json();
          setAttendees(data);
        } else {
          throw new Error('Failed to fetch attendees.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadAttendees();
  }, [dispatch]);

  // Callback function to handle imported attendees
  const handleImportedAttendees = (importedData) => {
    const uniqueAttendees = importedData.filter((imported) => 
      !attendees.some(existing => existing.email === imported.email)
    );

    setAttendees(prev => [...prev, ...uniqueAttendees]);
    const newSelected = uniqueAttendees.map(item => item._id);
    dispatch(setSelectedAttendees([...selectedAttendees, ...newSelected]));
  };

  return (
    <div className="flex flex-col gap-3 px-2 h-full overflow-y-scroll scroll">
     <div className='flex items-center justify-between mb-3'>
     <ExcelUploader onImport={handleImportedAttendees} />
      
      <button
        className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        onClick={handleSelectAll}
      >
        {selectedAttendees.length === attendees.length ? 'Remove All' : 'Select All'}
      </button>
     </div>

      {attendees.map((attendee) => (
        <div
          key={attendee._id}
          className="flex items-center justify-between p-2 border rounded-lg cursor-pointer"
          onClick={() => handleSelect(attendee._id)}
        >
          <p>{attendee.fullName}</p>
          {selectedAttendees.includes(attendee._id) && <FaCheckCircle size={20} color="green" />}
        </div>
      ))}
    </div>
  );
};

export default SelectAttendee;
