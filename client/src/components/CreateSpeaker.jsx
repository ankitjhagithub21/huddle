import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSpeaker, editSpeaker } from '../redux/slices/speakerSlice';
import { addNewSpeaker, editSpeakerById } from '../api/speakers';
import Input from './shared/Input';
import Label from './shared/Label';

const CreateSpeaker = ({ onClose, showForm, speakerData }) => {
    const dispatch = useDispatch();
    const [profilePic, setProfilePic] = useState(null);
    const [profilePreview, setProfilePreview] = useState(''); // Added to handle preview image

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

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    // Cleanup URL.createObjectURL on unmount or close
    useEffect(() => {
        return () => {
            if (profilePreview) URL.revokeObjectURL(profilePreview);
        };
    }, [profilePreview]);

    useEffect(() => {
        if (speakerData) {
            setFormData(speakerData);
            setProfilePreview(speakerData.profilePic || ''); // Set preview for existing speaker
        } else {
            setFormData(initialData);
            setProfilePreview(''); // Reset preview for new speaker
        }
    }, [speakerData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.socialLinks) {
            setFormData((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, [name]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setProfilePreview(URL.createObjectURL(file)); // Set preview for uploaded file
        }
    };

    const handleClose = () => {
        setFormData(initialData);
        setProfilePic(null);
        setProfilePreview(''); // Reset preview on close
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profilePic) {
            return toast.error("Please upload profile image.");
        }

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
            JSON.stringify(formData.socialLinks)
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
                handleClose();
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
        <div className={`lg:w-[400px] w-full mx-auto p-6 h-full scroll overflow-y-scroll shadow-md fixed ${showForm ? 'right-0' : '-right-full'} transition-all duration-500 top-0 bg-white`}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-2xl font-semibold">
                    {speakerData ? 'Update Speaker' : 'Create New Speaker'}
                </h2>
                <button onClick={handleClose}>
                    <IoIosCloseCircleOutline size={25} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='bg-gray-200 w-28 h-28 rounded-full mx-auto overflow-hidden flex items-center justify-center'>
                    <label htmlFor="profilePic">
                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Profile Preview"
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        ) : (
                            <p className='text-sm p-3 text-center'>Choose Profile Pic</p>
                        )}
                    </label>
                    <input
                        type="file"
                        name="profilePic"
                        id="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div>
                    <Label htmlFor="salutation" text="Salutation" />
                    <Input type="text" name="salutation" value={formData.salutation} setValue={handleInputChange} placeholder="Enter speaker's salutation" />
                </div>

                <div>
                    <Label htmlFor="fullName" text="Full Name" />
                    <Input type="text" name="fullName" value={formData.fullName} setValue={handleInputChange} placeholder="Enter speaker's full name" />
                </div>

                <div>
                    <Label htmlFor="bio" text="Bio" />
                    <Input type="text" name="bio" value={formData.bio} setValue={handleInputChange} placeholder="Enter speaker's bio" />
                </div>

                <div>
                    <Label htmlFor="email" text="Email" />
                    <Input type="email" name="email" value={formData.email} setValue={handleInputChange} placeholder="Enter speaker's email" />
                </div>

                <div>
                    <Label htmlFor="mobile" text="Mobile" />
                    <Input type="text" name="mobile" value={formData.mobile} setValue={handleInputChange} placeholder="Enter speaker's mobile number" />
                </div>

                <div>
                    <Label htmlFor="facebook" text="Facebook" />
                    <Input type="text" name="facebook" value={formData.socialLinks.facebook} setValue={handleInputChange} placeholder="Facebook Profile" />
                </div>

                <div>
                    <Label htmlFor="twitter" text="Twitter" />
                    <Input type="text" name="twitter" value={formData.socialLinks.twitter} setValue={handleInputChange} placeholder="Twitter Profile" />
                </div>

                <div>
                    <Label htmlFor="linkedin" text="LinkedIn" />
                    <Input type="text" name="linkedin" value={formData.socialLinks.linkedin} setValue={handleInputChange} placeholder="LinkedIn Profile" />
                </div>

                <button type="submit" className="w-full p-2 bg-[var(--secondary)] text-white rounded-md mt-4" disabled={loading}>
                    {loading ? 'Processing...' : speakerData ? 'Update Speaker' : 'Create Speaker'}
                </button>
            </form>
        </div>
    );
};

export default CreateSpeaker;
