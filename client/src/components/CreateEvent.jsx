import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { addNewEvent, editEventById } from '../api/events';
import { addEvent, editEvent, setSelectedAttendees, setSelectedSpeakers } from '../redux/slices/eventSlice';
import EventModal from './EventModal';
import TextEditor from './TextEditor';

const CreateEvent = ({ showForm, onClose, eventData }) => {
  const dispatch = useDispatch();
  const { selectedAttendees, selectedSpeakers } = useSelector((state) => state.event);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || '');
      setDescription(eventData.description || '');
      setDate(new Date(eventData.date) || null);
      dispatch(setSelectedSpeakers(eventData.speakers || []));
      dispatch(setSelectedAttendees(eventData.attendees || []));
    } else {
      resetForm();
    }
  }, [eventData, dispatch]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(null);
    dispatch(setSelectedSpeakers([]));
    dispatch(setSelectedAttendees([]));
  };

  const openModal = (type) => {
    setModalType(type);
    setModalData(type === 'speaker' ? selectedSpeakers : selectedAttendees); // Set modal data based on type
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = {
      title,
      description,
      date,
      attendees: selectedAttendees,
      speakers: selectedSpeakers,
    };

    try {
      const response = eventData
        ? await editEventById(eventData._id, formData)
        : await addNewEvent(formData);
      const data = await response.json();
       if(response.ok){
        dispatch(eventData ? editEvent(data) : addEvent(data));
        toast.success(`${eventData ? 'Event updated' : 'Event created'} successfully!`);
       }else{
        toast.error(data.message);
       }
    
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`lg:w-[400px] w-full mx-auto p-6 h-full shadow-md fixed overflow-y-scroll ${
        showForm ? 'right-0' : '-right-full'
      } transition-all duration-500 top-0 bg-white`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {eventData ? 'Update Event' : 'Create New Event'}
        </h2>
        <IoIosCloseCircleOutline size={25} onClick={onClose} />
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2"
        />

        <TextEditor
          value={description}
          onChange={setDescription}
        />

        <DatePicker
          placeholderText="Enter date"
          className="w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2"
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          showPopperArrow={false}
        />

        <button
          onClick={() => openModal('speaker')}
          className="w-full bg-gray-200 hover:bg-gray-300 p-2 mt-2 rounded-lg"
        >
          Select Speakers
        </button>

        <button
          onClick={() => openModal('attendee')}
          className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
        >
          Select Attendees
        </button>

        <button
          onClick={handleSubmit}
          className="bg-[var(--secondary)] p-2 rounded-lg text-white mt-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : eventData ? 'Update Event' : 'Create Event'}
        </button>
      </div>

      {isModalOpen && (
        <EventModal
          setIsModalOpen={setIsModalOpen}
          type={modalType}
          data={modalData}
        />
      )}
    </div>
  );
};

export default CreateEvent;
