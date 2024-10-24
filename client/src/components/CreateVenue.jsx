import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewVenue, editVenueById } from '../api/venue';
import { addVenue, editVenue } from '../redux/slices/venueSlice';
import Input from './shared/Input';
import Label from './shared/Label';

const CreateVenue = ({ onClose, showForm, venueData }) => {
    const dispatch = useDispatch();
    const initialData = {
        buildingNumber: '',
        roomNumber: '',
        roomCapacity: ''
    };

   
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (venueData) {
            setFormData(venueData);
        } else {
            setFormData(initialData);
        }
    }, [venueData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading(venueData ? 'Updating venue...' : 'Creating venue...');

        try {
            const res = venueData
                ? await editVenueById(venueData._id, formData)
                : await addNewVenue(formData);

            const data = await res.json();

            if (res.status === (venueData ? 200 : 201)) {
                toast.success(venueData ? 'Venue updated successfully!' : 'Venue created successfully!');
                if (venueData) {
                    dispatch(editVenue(data));
                } else {
                    dispatch(addVenue(data));
                }
                setFormData(initialData);
                onClose();
            } else {
                toast.error("Error processing venue.");
            }
        } catch (error) {
            toast.error('Error processing venue.');
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-semibold">
                    {venueData ? 'Update Venue' : 'Create New Venue'}
                </h2>
                <IoIosCloseCircleOutline size={25} onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor={"buildingNumber"} text={"Building Number"}/>
                    <Input
                        type="text"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        setValue={handleInputChange}
                        placeholder="Enter building number"
                    />
                </div>
                <div>
                   <Label htmlFor={"roomNumber"} text={"Room Number"}/>
                    <Input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        setValue={handleInputChange}
                        placeholder="Enter room number"
                    />
                </div>
                <div>
                  <Label htmlFor={"roomCapacity"} text={"Room Capacity"}/>
                    <Input
                     type="number"
                     name="roomCapacity"
                     value={formData.roomCapacity}
                     setValue={handleInputChange}
                     placeholder="Enter room capacity"
                    />
                </div>
                <div className='flex justify-end gap-2'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type='submit'
                        className='bg-[var(--secondary)] text-white px-4 py-2 rounded-md'
                    >
                        {loading ? 'Processing...' : venueData ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVenue;
