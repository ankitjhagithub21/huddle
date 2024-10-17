import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateSpeaker from './CreateSpeaker';
import Speaker from './Speaker';
import { toast } from 'react-toastify';
import { deleteSpeaker } from '../redux/slices/speakerSlice';
import useFetchSpeakers from '../hooks/useFetchSpeakers';
import { deleteSpeakerById } from '../api/speakers';
import ListHeader from './shared/ListHeader';
import ListType from './shared/ListType';
import ListTop from './shared/ListTop';

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
                <ListTop onCreate={onCreate} />
                <ListType text={"Speakers List"} />
                <ListHeader columns={['Image', 'Name', 'Mobile', 'Email', 'Action']} />
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
