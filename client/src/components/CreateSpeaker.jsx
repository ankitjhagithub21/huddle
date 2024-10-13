import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSpeaker, editSpeaker } from '../redux/slices/speakerSlice';
import { addNewSpeaker, editSpeakerById } from '../api/speakers';

const CreateSpeaker = ({ onClose, showForm, currState, speakerData }) => {
    const dispatch = useDispatch();
    const initialData = {
        fullName: '',
        bio: '',
        email: '',
        mobile: '',
        profilePic: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
        },
    };

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currState === 'edit' && speakerData) {
            setFormData(speakerData);
        } else {
            setFormData(initialData);
        }
    }, [currState, speakerData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.socialLinks) {
            setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading(currState === 'add' ? "Creating speaker..." : "Updating speaker...");
    
        try {
            const res = currState === 'add'
                ? await addNewSpeaker(formData)
                : await editSpeakerById(speakerData._id, formData);
    
            const data = await res.json();
            
            if (res.status === (currState === 'add' ? 201 : 200)) {  
                toast.success(currState === 'add' ? 'Speaker created successfully!' : 'Speaker updated successfully!');
                if (currState === 'add') {
                    dispatch(addSpeaker(data.speaker));
                } else {
                    dispatch(editSpeaker(data.speaker));
                }
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error processing speaker. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };
    

    return (
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full overflow-y-scroll scroll shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-semibold">
                    {currState === "add" ? 'Create New Speaker' : 'Update Speaker'}
                </h2>
                <IoIosCloseCircleOutline size={25} onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields for speaker details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter speaker's full name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none"
                        placeholder="Enter speaker's bio"
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter speaker's email"
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter speaker's mobile number"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                    <input
                        type="text"
                        name="profilePic"
                        value={formData.profilePic}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter profile picture URL"
                        required
                    />
                </div>

                {/* Social media links */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={formData.socialLinks.facebook}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Facebook Profile"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <input
                        type="text"
                        name="twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Twitter Profile"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="LinkedIn Profile"
                    />
                </div>


                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full text-white bg-[var(--secondary)] rounded-lg py-2 px-4 flex justify-center"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSpeaker;
