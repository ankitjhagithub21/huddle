import React, { useState, useEffect, useRef } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { addNewEvent, editEventById } from '../api/events';
import { addEvent, editEvent, setSelectedAttendees, setSelectedSpeakers } from '../redux/slices/eventSlice';
import EventModal from './EventModal';
import JoditEditor from 'jodit-react';


const CreateEvent = ({ showForm, onClose, eventData }) => {
  const dispatch = useDispatch();
  const { selectedAttendees, selectedSpeakers } = useSelector((state) => state.event);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);

  const editor = useRef(null)


  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || '');
      setDescription(eventData.description || '');
      setDate(new Date(eventData.date) || '');
      dispatch(setSelectedSpeakers(eventData.speakers || []));
      dispatch(setSelectedAttendees(eventData.attendees || []));
    } else {
      resetForm();
    }
  }, [eventData, showForm]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    dispatch(setSelectedSpeakers([]));
    dispatch(setSelectedAttendees([]));
  };

  const openModal = (type) => {
    setModalType(type);
    setModalData(type === 'speaker' ? selectedSpeakers : selectedAttendees); // Set modal data based on type
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {

    if (!title || !description || !date || selectedSpeakers.length === 0 || selectedAttendees.length === 0) {
      toast.error('All fields are required');
      return;
    }


    const eventDetails = {
      title,
      description,
      date,
      speakers: selectedSpeakers,
      attendees: selectedAttendees,
    };

    setLoading(true)
    const toastId = toast.loading("Processing...")

    try {
      if (eventData) {
        const res = await editEventById(eventData._id, eventDetails);
        const data = await res.json();
        if (res.ok) {
          dispatch(editEvent(data));
          toast.success('Event updated successfully!');
        }

      } else {
        const res = await addNewEvent(eventDetails);
        const data = await res.json();
        if (res.ok) {
          dispatch(addEvent(data));
          toast.success('Event created successfully!');
        }
      }

      onClose();
    } catch (error) {
      console.error('Error creating/updating event:', error);
      toast.error('Error creating/updating event');
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }

  };

  return (
    <div
      className={`lg:w-[400px] w-full mx-auto p-6 h-full shadow-md fixed overflow-y-scroll ${showForm ? 'right-0' : '-right-full'
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

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <JoditEditor
            ref={editor}
            value={description}
            tabIndex={1}
            onBlur={(newContent) => setDescription(newContent)}
            onChange={() => { }}
          />
        </div>

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
