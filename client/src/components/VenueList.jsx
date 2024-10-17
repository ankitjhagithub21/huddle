import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useFetchVenues from '../hooks/useFetchVenues';
import { deleteVenueById } from '../api/venue';
import { deleteVenue } from '../redux/slices/venueSlice';
import Venue from './Venue';
import CreateVenue from './CreateVenue';
import Search from './Search';
import AddButton from './shared/AddButton';


const VenueList = () => {
    useFetchVenues();
    const dispatch = useDispatch();
    const { venues, loading } = useSelector((state) => state.venue);
    const [showForm, setShowForm] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);

    const onClose = () => {
        setShowForm(false);
        setSelectedVenue(null);
    };

    const onEdit = (venue) => {
        setSelectedVenue(venue);
        setShowForm(true);
    };

    const onCreate = () => {
        setSelectedVenue(null);
        setShowForm(true);
    };

    const onDelete = async (id) => {
        const res = await deleteVenueById(id);
        const toastId = toast.loading("Deleting Venue...")
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteVenue(id));
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
                     <AddButton text={"Add Venue"} onBtnClick={onCreate}/>
                </div>
                <h2 className='mt-5 text-2xl font-bold'>Venues List</h2>
                <div className='lg:grid hidden grid-cols-4 items-center my-2  font-bold'>
                    <p>Building Number</p>
                    <p>Room Number</p>
                    <p>Room Capacity</p>
                    <p className='text-end'>Action</p>
                </div>
                <div>
                    {loading ? <p>Loading...</p> : venues?.length === 0 ? <p>No venues found</p> :
                        venues?.map((venue) => (
                            <Venue key={venue._id} venue={venue} onDelete={onDelete} onEdit={onEdit} />
                        ))
                    }
                </div>
                <CreateVenue
                    onClose={onClose}
                    showForm={showForm}
                    venueData={selectedVenue}
                />
            </div>
        </section>
    );
};

export default VenueList;
