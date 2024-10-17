import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useFetchVenues from '../hooks/useFetchVenues';
import { deleteVenueById } from '../api/venue';
import { deleteVenue } from '../redux/slices/venueSlice';
import CreateVenue from './CreateVenue';
import ListType from './shared/ListType';
import List from './shared/List';

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
        const toastId = toast.loading('Deleting Venue...');
        const res = await deleteVenueById(id);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(deleteVenue(id));
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        toast.dismiss(toastId);
    };

    const columns = ['Building Number', 'Room Number', 'Room Capacity', 'Action'];

    return (
        <>
            <ListType text="Venue List" />
            <List columns={columns}
                data={venues}
                loading={loading}
                onEdit={onEdit}
                onDelete={onDelete}
                onCreate={onCreate}
                listType="venue" 
                />
            <CreateVenue onClose={onClose} showForm={showForm} venueData={selectedVenue} />
        </>
    );
};

export default VenueList;
