import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useFetchVenues from '../hooks/useFetchVenues';
import { deleteVenueById } from '../api/venue';
import { deleteVenue } from '../redux/slices/venueSlice';
import Venue from './Venue';
import CreateVenue from './CreateVenue';
import ListHeader from './shared/ListHeader';
import ListType from './shared/ListType';
import ListTop from './shared/ListTop';


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
                <ListTop onCreate={onCreate}/>
                <ListType text={"Venue List"}/>
                <ListHeader columns={['Building Number', 'Room Number', 'Room Capacity', 'Action']} />
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
