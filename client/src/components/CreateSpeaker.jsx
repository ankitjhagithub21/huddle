import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSpeaker, editSpeaker } from '../redux/slices/speakerSlice';
import { addNewSpeaker, editSpeakerById } from '../api/speakers';

const CreateSpeaker = ({ onClose, showForm, speakerData }) => {
    const dispatch = useDispatch();
    const [profilePic, setProfilePic] = useState(null);

    const initialData = {
        salutation: '',
        fullName: '',
        bio: '',
        email: '',
        mobile: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
        },
    };

    const classnames = 'w-full border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2';

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    // Cleanup URL.createObjectURL when the component is closed or unmounted
    useEffect(() => {
        return () => {
            if (profilePic) {
                URL.revokeObjectURL(profilePic);
            }
        };
    }, [profilePic]);

    useEffect(() => {
        if (speakerData) {
            setFormData(speakerData);
            setProfilePic(speakerData.profilePic || '');
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading(speakerData ? "Updating speaker..." : "Creating speaker...");

        const formDataToSend = new FormData();
        formDataToSend.append('salutation', formData.salutation);
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('profilePic', profilePic);
        formDataToSend.append(
            'socialLinks',
            JSON.stringify({
                facebook: formData.socialLinks.facebook,
                linkedin: formData.socialLinks.linkedin,
                twitter: formData.socialLinks.twitter,
            })
        );

        try {
            const res = speakerData
                ? await editSpeakerById(speakerData._id, formDataToSend)
                : await addNewSpeaker(formDataToSend);

            const data = await res.json();

            if (res.status === (speakerData ? 200 : 201)) {
                toast.success(speakerData ? 'Speaker updated successfully!' : 'Speaker created successfully!');
                if (speakerData) {
                    dispatch(editSpeaker(data.speaker));
                } else {
                    dispatch(addSpeaker(data.speaker));
                }
                setFormData(initialData);
                setProfilePic(null);
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
                <IoIosCloseCircleOutline size={25} onClick={() => {
                    setFormData(initialData);
                    setProfilePic(null);
                    onClose();
                }} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='bg-gray-200 w-20 h-20 rounded-full mx-auto cursor-pointer overflow-hidden flex items-center justify-center text-center'>
                    <label htmlFor="profilePic">
                        {profilePic ? (
                            <img
                                src={speakerData ? profilePic : URL.createObjectURL(profilePic)}
                                alt="Profile Preview"
                                className="w-full h-full object-cover object-center"
                            />
                        ) : (
                            <p className='text-xs'>Choose Profile Pic</p>
                        )}
                    </label>
                    <input
                        type="file"
                        name='profilePic'
                        id='profilePic'
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!speakerData}
                    />
                </div>




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
                    className="w-full p-2 bg-[var(--secondary)] text-white rounded-md mt-4"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : speakerData ? 'Update Speaker' : 'Create Speaker'}
                </button>
            </form>
        </div>
    );
};

export default CreateSpeaker;
