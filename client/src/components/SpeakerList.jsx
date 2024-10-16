import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateSpeaker from './CreateSpeaker';
import Speaker from './Speaker';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Search from './Search';
import { deleteSpeaker } from '../redux/slices/speakerSlice';
import useFetchSpeakers from '../hooks/useFetchSpeakers';
import { deleteSpeakerById } from '../api/speakers';

const SpeakerList = () => {
    useFetchSpeakers();
    const dispatch = useDispatch();
    const { speakers, loading } = useSelector((state) => state.speaker);
    const [showForm, setShowForm] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    const onClose = () => {
        setShowForm(false);
        setSelectedSpeaker(null);
    };

    const onEdit = (speaker) => {
        setSelectedSpeaker(speaker);
        setShowForm(true);
    };

    const onCreate = () => {
      
       setSelectedSpeaker(null);
       setShowForm(true);
    };

    const onDelete = async (id) => {
        const toastId = toast.loading("Deleting speaker...")
        const res = await deleteSpeakerById(id);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteSpeaker(id));
            
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        toast.dismiss(toastId)

    };

    

    return (
        <section>
          <div className='max-w-4xl p-4'>
          <div className='flex items-center gap-2 justify-between'>
                <Search />
                <button onClick={onCreate} disabled={selectedSpeaker} className='text-white flex items-center gap-1 rounded-lg p-2 bg-[var(--secondary)]'>
                    <FaPlus />
                    <span className='md:inline-block hidden'>Add Speaker</span>
                </button>
            </div>
            <h2 className='mt-5 text-2xl font-bold'>Speakers List</h2>
            <div className='lg:grid hidden grid-cols-5 items-center my-2 p-1 font-bold'>
                <p>Image</p>
                <p>Name</p>
                <p>Mobile</p>
                <p>Email</p>
                <p className='text-end'>Action</p>
            </div>
            <div>
                {loading ? <p>Loading...</p> : speakers.length === 0 ? <p>No speaker found</p> :
                    speakers.map((speaker) => (
                        <Speaker key={speaker._id} speaker={speaker} onDelete={onDelete} onEdit={onEdit} />
                    ))
                }
            </div>
            <CreateSpeaker
                onClose={onClose}
                showForm={showForm}
                speakerData={selectedSpeaker}
            />
          </div>
        </section>
    );
};

export default SpeakerList;
