import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchAttendees } from '../api/attendees';
import { setSelectedAttendees } from '../redux/slices/eventSlice';
import ExcelUploader from './ExcelUploader'; // Import the ExcelUploader component

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
    // Filter out duplicates based on email or any unique identifier
    const uniqueAttendees = importedData.filter((imported) => 
      !attendees.some(existing => existing.email === imported.email)
    );

    // Update the attendees state with unique imported attendees
    setAttendees(prev => [...prev, ...uniqueAttendees]);
    // Optionally, you can also automatically select the newly imported attendees
    const newSelected = uniqueAttendees.map(item => item._id);
    dispatch(setSelectedAttendees([...selectedAttendees, ...newSelected]));
  };

  return (
    <div className="flex flex-col gap-3 px-2 h-full overflow-y-scroll scroll">
      <ExcelUploader onImport={handleImportedAttendees} /> {/* Pass the callback */}
      
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
