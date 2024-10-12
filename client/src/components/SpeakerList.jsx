import React, { useState, useEffect } from 'react'
import CreateSpeaker from './CreateSpeaker'
import useFetchSpeakers from '../hooks/useFetchSpeakers'
import Search from './Search'
import Speaker from './Speaker'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'

const SpeakerList = () => {
    const { data, loading } = useFetchSpeakers();
    const [speakers, setSpeakers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currState, setCurrState] = useState(null);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null); // For edit

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setSpeakers(data);
        }
    }, [data]);

    const handleAddSpeaker = (newSpeaker) => {
        setSpeakers([...speakers, newSpeaker]);
    };

    const handleEditSpeaker = (updatedSpeaker) => {
        setSpeakers(speakers.map(speaker =>
            speaker._id === updatedSpeaker._id ? updatedSpeaker : speaker
        ));
    };

    const onDelete = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_SPEAKER_URL}/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (res.status === 200) {
            setSpeakers(speakers.filter(speaker => speaker._id !== id));
            toast.success(data.message);
        } else {
            toast.error(data.error);
        }
    };

    const onClose = () => {
        setShowForm(false);

    };

    const onEdit = (speaker) => {
        setSelectedSpeaker(speaker); // Pass speaker data to the form
        setCurrState('edit');
        setShowForm(true);
    };

    const onCreate = () => {
        setSelectedSpeaker(null); // Reset for new speaker creation
        setCurrState('add');
        setShowForm(true);
    };

    return (
        <>
            <div className='flex items-center justify-start gap-2 sticky bg-white top-0 w-full left-0'>
                <Search />
                <button onClick={onCreate} className='text-white flex items-center gap-1 rounded-lg p-2 bg-[var(--secondary)]'>
                    <FaPlus />
                    <span className='md:inline-block hidden'>Add Speaker</span>
                </button>
            </div>
            {/* Speaker list rendering */}
            <h2 className='mt-5 text-2xl font-bold'>Speakers List</h2>

            <div className='lg:grid hidden grid-cols-5 items-center my-2 p-1 font-bold'>
                <p>Image</p>
                <p>Name</p>
                <p>Mobile</p>
                <p>Email</p>
                <p>Action</p>
            </div>


            <div>
                {
                    loading ? <p>Loading...</p> : speakers.length === 0 ? <p>No speaker found</p> :
                        speakers.map((speaker) => (
                            <Speaker key={speaker._id} speaker={speaker} onDelete={onDelete} onEdit={onEdit} />
                        ))
                }
            </div>

            <CreateSpeaker
                onClose={onClose}
                showForm={showForm}
                currState={currState}
                onAddSpeaker={handleAddSpeaker}
                speakerData={selectedSpeaker} // Pass selected speaker data
                onEditSpeaker={handleEditSpeaker}
            />
        </>
    );
};

export default SpeakerList
