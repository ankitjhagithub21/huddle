import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateSpeaker = () => {
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

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/speakers`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)

      })

      if (response.status === 201) {
        toast.success('Speaker created successfully!');
        setFormData(initialData);
      }
    } catch (error) {
      toast.error('Error creating speaker. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create New Speaker</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Create Speaker
        </button>
      </form>
    </div>
  );
};

export default CreateSpeaker;
