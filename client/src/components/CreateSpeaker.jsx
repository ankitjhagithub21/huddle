import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSpeaker, editSpeaker } from '../redux/slices/speakerSlice';
import { addNewSpeaker, editSpeakerById } from '../api/speakers';

const CreateSpeaker = ({ onClose, showForm, speakerData }) => {
    const dispatch = useDispatch();
    const initialData = {
        salutation: '',
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
    const classnames = 'w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2';

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (speakerData) {
            setFormData(speakerData);
        } else {
            setFormData(initialData);
        }
    }, [speakerData]);

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
        const toastId = toast.loading(speakerData ? "Updating speaker..." : "Creating speaker...");

        try {
            const res = speakerData
                ? await editSpeakerById(speakerData._id, formData)
                : await addNewSpeaker(formData);

            const data = await res.json();

            if (res.status === (speakerData ? 200 : 201)) {
                toast.success(speakerData ? 'Speaker updated successfully!' : 'Speaker created successfully!');
                if (speakerData) {
                    dispatch(editSpeaker(data.speaker));
                } else {
                    dispatch(addSpeaker(data.speaker));
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
                    {speakerData ? 'Update Speaker' : 'Create New Speaker'}
                </h2>
                <IoIosCloseCircleOutline size={25} onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Salutation</label>
                    <input
                        type="text"
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleInputChange}
                        className={classnames}
                        placeholder="Enter speaker's salutation"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={classnames}
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
                        className={classnames}
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
                        className={classnames}
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
                        className={classnames}
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
                        className={classnames}
                        placeholder="Enter profile picture URL"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={formData.socialLinks.facebook}
                        onChange={handleInputChange}
                        className={classnames}
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
                        className={classnames}
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
                        className={classnames}
                        placeholder="LinkedIn Profile"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-[var(--secondary)] text-white rounded-md mt-4"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : speakerData ? 'Update Speaker' : 'Create Speaker'}
                </button>
            </form>
        </div>
    );
};

export default CreateSpeaker;
