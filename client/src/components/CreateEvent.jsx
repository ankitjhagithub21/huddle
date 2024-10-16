import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { addNewEvent, editEventById} from '../api/events';
import { addEvent, editEvent} from '../redux/slices/eventSlice';

const CreateEvent = ({ showForm, onClose, eventData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedSpeakers, setSelectedSpeakers] = useState([]);
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [allSpeakers, setAllSpeakers] = useState([]);
    const [allAttendees, setAllAttendees] = useState([]);
    const dispatch = useDispatch();
    const classnames = 'w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2';

    const editor = useRef(null);

    // Fetch speakers and attendees when the component mounts or when showForm changes
    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SPEAKER_URL}`);
                setAllSpeakers(response.data);
            } catch (error) {
                console.error('Error fetching speakers:', error);
                toast.error('Error fetching speakers');
            }
        };

        const fetchAttendees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_ATTENDEE_URL}`);
                setAllAttendees(response.data.data);
            } catch (error) {
                console.error('Error fetching attendees:', error);
                toast.error('Error fetching attendees');
            }
        };

        if (showForm) {
            fetchSpeakers();
            fetchAttendees();
        }

        if (eventData) {
            setTitle(eventData.title);
            setDescription(eventData.description);
            setDate(eventData.date);
            setSelectedSpeakers(eventData.speakers || []);
            setSelectedAttendees(eventData.attendees || []);
        } else {
            setTitle('');
            setDescription('');
            setDate('');
            setSelectedSpeakers([]);
            setSelectedAttendees([]);
        }
    }, [showForm, eventData]);

    // Handle form submission for both creating and editing an event
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation to ensure all fields are filled
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

        try {
            if (eventData) {
                // Update existing event
                const res = await editEventById(eventData._id, eventDetails);
                const data = await res.json();
                dispatch(editEvent(data));
                toast.success('Event updated successfully!');
            } else {
                // Create new event
                const res = await addNewEvent(eventDetails);
                const data = await res.json();
                dispatch(addEvent(data));
                toast.success('Event created successfully!');
            }

            onClose();
        } catch (error) {
            console.error('Error creating/updating event:', error);
            toast.error('Error creating/updating event');
        }
    };

    return (
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full overflow-y-scroll scroll shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <div className='flex items-center justify-between mb-3'>
                <h2 className="text-2xl font-bold">{eventData ? 'Edit Event' : 'Create Event'}</h2>
                <IoIosCloseCircleOutline size={25} onClick={onClose} className="cursor-pointer" />
            </div>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        className={classnames}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Jodit Editor for Description */}
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

                {/* Date Field */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        className={classnames}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Speakers Selection */}
                <div className="mb-4">
                    <label htmlFor="speakers" className="block text-sm font-medium text-gray-700">Speakers</label>
                    <select
                        id="speakers"
                        className={classnames}
                        multiple
                        value={selectedSpeakers}
                        onChange={(e) => setSelectedSpeakers([...e.target.selectedOptions].map(option => option.value))}
                        required
                    >
                        {allSpeakers?.map((speaker) => (
                            <option key={speaker._id} value={speaker._id}>
                                {speaker.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Attendees Selection */}
                <div className="mb-4">
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">Attendees</label>
                    <select
                        id="attendees"
                        className={classnames}
                        multiple
                        value={selectedAttendees}
                        onChange={(e) => setSelectedAttendees([...e.target.selectedOptions].map(option => option.value))}
                        required
                    >
                        {allAttendees?.map((attendee) => (
                            <option key={attendee._id} value={attendee._id}>
                                {attendee.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-[var(--secondary)] text-white px-4 py-2 rounded-lg w-full"
                >
                    {eventData ? 'Update Event' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
