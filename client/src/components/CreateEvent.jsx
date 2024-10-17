import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { addNewEvent, editEventById } from '../api/events';
import { addEvent, editEvent } from '../redux/slices/eventSlice';
import { fetchSpeakers } from '../api/speakers';
import { fetchAttendees } from '../api/attendees';


const CreateEvent = ({ showForm, onClose, eventData }) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [selectedSpeakers, setSelectedSpeakers] = useState([]);
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [allSpeakers, setAllSpeakers] = useState([]);
    const [allAttendees, setAllAttendees] = useState([]);
    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch();
 
    const classnames = 'w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2';

    const editor = useRef(null);

    useEffect(() => {
        const getSpeakers = async () => {
            try {
                const response = await fetchSpeakers();
                const data = await response.json();
                setAllSpeakers(data);
            } catch (error) {
                console.error('Error fetching speakers:', error);
            }
        };

        const getAttendees = async () => {
            try {
                const response = await fetchAttendees();
                const data = await response.json();
                setAllAttendees(data);
            } catch (error) {
                console.error('Error fetching attendees:', error);
            }
        };

        if (showForm) {
            getSpeakers();
            getAttendees();
        }

        if (eventData) {
            setTitle(eventData.title);
            setDescription(eventData.description);
            const formattedDate = new Date(eventData.date).toISOString().split('T')[0];
            setDate(formattedDate);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
       

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
                dispatch(editEvent(data));
                toast.success('Event updated successfully!');
            } else {
                const res = await addNewEvent(eventDetails);
                const data = await res.json();
                dispatch(addEvent(data));
                toast.success('Event created successfully!');
            }

            onClose();
        } catch (error) {
            console.error('Error creating/updating event:', error);
            toast.error('Error creating/updating event');
        }finally{
            setLoading(false)
            toast.dismiss(toastId)
        }
    };

    // Toggle speaker selection
    const toggleSpeaker = (speaker) => {
        const isSpeakerSelected = selectedSpeakers.find(sp => sp._id === speaker._id);
        if (isSpeakerSelected) {
            setSelectedSpeakers(selectedSpeakers.filter(sp => sp._id !== speaker._id));
        } else {
            setSelectedSpeakers([...selectedSpeakers, speaker]);
        }
    };

    // Toggle attendee selection
    const toggleAttendee = (attendee) => {
        const isAttendeeSelected = selectedAttendees.find(at => at._id === attendee._id);
        if (isAttendeeSelected) {
            setSelectedAttendees(selectedAttendees.filter(at => at._id !== attendee._id));
        } else {
            setSelectedAttendees([...selectedAttendees, attendee]);
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

                {/* Selected Speakers Pills */}
                <p className="mb-2">Selected Speakers</p>
                <div className="flex gap-2 items-center flex-wrap mb-4">
                    {selectedSpeakers.length > 0 &&
                        selectedSpeakers.map((speaker) => (
                            <div key={speaker._id} className="bg-[var(--secondary)] text-sm text-white px-3 py-1 rounded-lg flex items-center">
                                {speaker.fullName}
                                <IoIosCloseCircleOutline
                                    size={18}
                                    className="ml-2 cursor-pointer"
                                    onClick={() => toggleSpeaker(speaker)}
                                />
                            </div>
                        ))}
                </div>

                {/* Speakers Selection */}
                <div className="mb-4">
                    <label htmlFor="speakers" className="block text-sm font-medium text-gray-700">Speakers</label>
                    <div className="flex flex-col gap-2">
                        {allSpeakers?.map((speaker) => (
                            <div key={speaker._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`speaker-${speaker._id}`}
                                    checked={selectedSpeakers.some(sp => sp._id === speaker._id)}
                                    onChange={() => toggleSpeaker(speaker)}
                                    className="mr-2"
                                />
                                <label htmlFor={`speaker-${speaker._id}`} className="text-gray-700">{speaker.fullName}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Attendees Pills */}
                <p className="mb-2">Selected Attendees</p>
                <div className="flex gap-2 items-center flex-wrap mb-4">
                    {selectedAttendees.length > 0 &&
                        selectedAttendees.map((attendee) => (
                            <div key={attendee._id} className="bg-[var(--secondary)] text-sm text-white px-3 py-1 rounded-lg flex items-center">
                                {attendee.fullName}
                                <IoIosCloseCircleOutline
                                    size={18}
                                    className="ml-2 cursor-pointer"
                                    onClick={() => toggleAttendee(attendee)}
                                />
                            </div>
                        ))}
                </div>

                {/* Attendees Selection */}
                <div className="mb-4">
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">Attendees</label>
                    <div className="flex flex-col gap-2 h-20 overflow-y-scroll">
                        {allAttendees?.map((attendee) => (
                            <div key={attendee._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`attendee-${attendee._id}`}
                                    checked={selectedAttendees.some(at => at._id === attendee._id)}
                                    onChange={() => toggleAttendee(attendee)}
                                    className="mr-2"
                                />
                                <label htmlFor={`attendee-${attendee._id}`} className="text-gray-700">{attendee.fullName}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[var(--secondary)] text-white px-4 py-2 rounded-lg w-full"
                >
                    {eventData ? 'Update Event' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
