import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateSpeaker from './CreateSpeaker';
import { toast } from 'react-toastify';
import { deleteSpeaker } from '../redux/slices/speakerSlice';
import useFetchSpeakers from '../hooks/useFetchSpeakers';
import { deleteSpeakerById } from '../api/speakers';
import ListType from './shared/ListType';
import List from './shared/List';

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
        const toastId = toast.loading("Deleting speaker...");
        const res = await deleteSpeakerById(id);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteSpeaker(id));
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        toast.dismiss(toastId);
    };

    const columns = ['Image', 'Name', 'Mobile', 'Email', 'Action'];

    return (
        <>

            <ListType text={"Speakers List"} />
            <List columns={columns}
                data={speakers}
                loading={loading}
                onEdit={onEdit}
                onDelete={onDelete}
                onCreate={onCreate}
                listType="speaker" />

            <CreateSpeaker
                onClose={onClose}
                showForm={showForm}
                speakerData={selectedSpeaker}
            />
        </>

    );
};

export default SpeakerList;
