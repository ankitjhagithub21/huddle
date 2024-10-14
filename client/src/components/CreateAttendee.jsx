import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addAttendee, editAttendee } from '../redux/slices/attendeeSlice';
import { addNewAttendee, editAttendeeById } from '../api/attendees';

const CreateAttendee = ({ onClose, showForm, currState, attendeeData }) => {
    const dispatch = useDispatch();
    const initialData = {
        fullName: '',
        email: '',
        mobile: ''
    };
    const classnames = 'w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2'

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currState === 'edit' && attendeeData) {
            setFormData(attendeeData);
        } else {
            setFormData(initialData);
        }
    }, [currState, attendeeData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading(currState === 'add' ? 'Creating attendee...' : 'Updating attendee...');

        try {
            const res = currState === 'add'
                ? await addNewAttendee(formData)
                : await editAttendeeById(attendeeData._id, formData);

            const data = await res.json();

            if (res.status === (currState === 'add' ? 201 : 200)) {
                toast.success(currState === 'add' ? 'Attendee created successfully!' : 'Attendee updated successfully!');
                if (currState === 'add') {
                    dispatch(addAttendee(data.attendee));
                } else {
                    dispatch(editAttendee(data.attendee));
                }
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error processing attendee. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full  shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-semibold">
                    {currState === "add" ? 'Create New Attendee' : 'Update Attendee'}
                </h2>
                <IoIosCloseCircleOutline size={25} onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields for attendee details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={classnames}
                        placeholder="Enter attendee's full name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={classnames}
                        placeholder="Enter attendee's email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={classnames}
                        placeholder="Enter attendee's mobile number"
                        required
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
                        type='submit'
                        className='bg-[var(--secondary)] text-white px-4 py-2 rounded-md'
                    >
                        {currState === 'add' ? 'Add' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAttendee;
