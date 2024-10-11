import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';

const CreateSpeaker = ({onClose,showForm}) => {
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
  }
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    const toastId = toast.loading("Creating user...")
    try {
     
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/speakers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

      })
      const data = await response.json()

      if (response.status === 201) {
        toast.success('Speaker created successfully!');
        setFormData(initialData);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error creating speaker. Please try again.');
      console.error(error);
    }finally{
      setLoading(false)
      toast.dismiss(toastId)
    }
  };

  return (
    <div className={`lg:w-[400px] w-full mx-auto  p-6 h-full overflow-y-scroll scroll shadow-md fixed ${showForm ? 'right-0' :'-right-full'} transition-all duration-500 top-0 bg-[var(--primary)]`}>
      <div className='flex items-center justify-between mb-4'>
      <h2 className="text-2xl font-semibold">Create New Speaker</h2>
      <button onClick={onClose}>
      <IoIosCloseCircleOutline size={25}/>
      </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            placeholder="Twitter profile"
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
            placeholder="LinkedIn profile"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        disabled={loading}>
          Create Speaker
        </button>
      </form>
    </div>
  );
};

export default CreateSpeaker;
