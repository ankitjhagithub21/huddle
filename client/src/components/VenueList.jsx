import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useFetchVenues from '../hooks/useFetchVenues';
import { deleteVenueById } from '../api/venue';
import { deleteVenue } from '../redux/slices/venueSlice';
import Venue from './Venue';
import CreateVenue from './CreateVenue';
import Search from './Search';


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
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteVenue(id));
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <section>
            <div className='max-w-4xl p-4'>
                <div className='flex items-center gap-2 justify-between'>
                    <Search />
                    <button onClick={onCreate} className='text-white flex items-center gap-1 rounded-lg px-4 py-2 bg-[var(--secondary)]'>
                        <FaPlus />
                        <span className='md:inline-block hidden'>Add Venue</span>
                    </button>
                </div>
                <h2 className='mt-5 text-2xl font-bold'>Venues List</h2>
                <div className='lg:grid hidden grid-cols-4 items-center my-2 p-2 font-bold'>
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
