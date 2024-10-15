import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react'; // Import JoditEditor

const CreateEvent = ({ showForm, onClose,onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); // Use this state to store the editor content
    const [date, setDate] = useState('');
    const [speakers, setSpeakers] = useState([]);
    const [allSpeakers, setAllSpeakers] = useState([]);
    
    const editor = useRef(null); // Ref for Jodit editor

    // Fetch available speakers from the backend
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
        fetchSpeakers();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !date || speakers.length === 0) {
            toast.error('All fields are required');
            return;
        }

        const newEvent = {
            title,
            description, // Send the HTML content of the description
            date,
            speakers,
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_EVENT_URL}`, newEvent);
            toast.success('Event created successfully!');
           onAdd(res.data.event)
            setTitle('');
            setDescription('');
            setDate('');
            setSpeakers([]);
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Error creating event');
        }
    };

    return (
        <div className={`lg:w-1/2 w-full mx-auto p-6 h-full overflow-y-scroll scroll shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
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
                        onChange={newContent => {}} // Handle real-time updates
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
                        className="mt-1 block w-full h-20 overflow-y-scroll scroll p-2 border border-gray-300 rounded-md"
                        multiple
                        value={speakers}
                        onChange={(e) => setSpeakers([...e.target.selectedOptions].map(o => o.value))}
                        required
                    >
                        {allSpeakers.map((speaker) => (
                            <option key={speaker._id} value={speaker._id} className='text-gray-800'>
                                {speaker.fullName}
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
