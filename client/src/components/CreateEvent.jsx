import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react'; // Import JoditEditor
import { useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const CreateEvent = ({ showForm, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); // Use this state to store the editor content
    const [date, setDate] = useState('');
    const [selectedSpeakers,setSelectedSpeakers] = useState([])
    const [selectedAttendees,setSelectedAttendees] = useState([])
    const [allSpeakers,setAllSpeakers] = useState([])
    const [allAttendees,setAllAttendees] = useState([])
   

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
                console.error('Error fetching speakers:', error);
                toast.error('Error fetching speakers');
            }
        };
        fetchSpeakers();
        fetchAttendees();
    }, []);
    
    const editor = useRef(null); // Ref for Jodit editor

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !date || selectedSpeakers.length === 0 || selectedAttendees.length === 0) {
            toast.error('All fields are required');
            return;
        }

        const newEvent = {
            title,
            description, // Send the HTML content of the description
            date,
            speakers: selectedSpeakers,
            attendees: selectedAttendees,
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_EVENT_URL}`, newEvent);
            toast.success('Event created successfully!');
            onAdd(res.data.event);
            // Reset the form
            setTitle('');
            setDescription('');
            setDate('');
            setSelectedSpeakers([]);
            setSelectedAttendees([]);
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Error creating event');
        }
    };

    return (
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full overflow-y-scroll scroll shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
          <div className='flex items-center justify-between mb-3'>
          <h2 className="text-2xl font-bold ">Create Event</h2>
          <IoIosCloseCircleOutline size={25} onClick={onClose} />
          </div>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Jodit Description Field */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1} // Tab index of textarea
                        onBlur={newContent => setDescription(newContent)} // Save HTML content to the state
                        onChange={newContent => {}} // Handle real-time updates (optional)
                    />
                </div>

                {/* Date Field */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                        className="mt-1 block w-full h-20 overflow-y-scroll p-2 border border-gray-300 rounded-md"
                        multiple
                        value={selectedSpeakers}
                        onChange={(e) => setSelectedSpeakers([...e.target.selectedOptions].map(option => option.value))}
                        required
                    >
                        {allSpeakers?.map((speaker) => (
                            <option key={speaker._id} value={speaker._id} className='text-gray-800'>
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
                        className="mt-1 block w-full h-20 overflow-y-scroll p-2 border border-gray-300 rounded-md"
                        multiple
                        value={selectedAttendees}
                        onChange={(e) => setSelectedAttendees([...e.target.selectedOptions].map(option => option.value))}
                        required
                    >
                        {allAttendees?.map((attendee) => (
                            <option key={attendee._id} value={attendee._id} className='text-gray-800'>
                                {attendee.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[var(--secondary)] text-white px-4 py-2 rounded-md"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
