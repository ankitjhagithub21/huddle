import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewEvent } from '../api/events';
import { addEvent, setSelectedAttendees, setSelectedSpeakers } from '../redux/slices/eventSlice';
import EventModal from './EventModal';

import UploadAndDisplayImage from './UploadAndDisplayImage';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const { selectedAttendees, selectedSpeakers } = useSelector((state) => state.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageURLs);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };


  const openModal = (type) => {
    setModalType(type);
    setModalData(type === 'speaker' ? selectedSpeakers : selectedAttendees);
    setIsModalOpen(true);
  };



  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setVideoUrl('');
    setIsPublic(false);
    setImages([]);
    dispatch(setSelectedSpeakers([]));
    dispatch(setSelectedAttendees([]));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);


    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('videoUrl', videoUrl);
      formData.append('isPublic', isPublic);
      formData.append('speakers', JSON.stringify(selectedSpeakers))
      formData.append('attendees', JSON.stringify(selectedAttendees))
      images.forEach((image) => formData.append('images', image));


      const response = await addNewEvent(formData);
      if (response.ok) {
        const data = await response.json()
        toast.success('Event created successfully!');

        dispatch(addEvent(data))
        navigate("/events")
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className='max-w-7xl mx-auto py-12 px-5'>
        <button className='px-4 py-2 bg-orange-500 text-white rounded-full mb-5' onClick={() => navigate(-1)}>Back</button>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Create new event
          </h2>

        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">

          <div className="mb-4">
            <label htmlFor="videoUrl" className="block font-medium">
              Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              className="w-full p-2 border rounded-lg mt-1"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <UploadAndDisplayImage onImageChange={onImageChange} imageURLs={imageURLs} />

          <div className="my-4">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded-lg mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={50}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-medium">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="date"
              className="w-full p-2 border rounded-lg mt-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-lg mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={300}
            ></textarea>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => openModal('speaker')}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
            >
              Select Speakers
            </button>
            <button
              type="button"
              onClick={() => openModal('attendee')}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
            >
              Select Attendees
            </button>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label htmlFor="isPublic" className="ml-2">
              Public Event
            </label>
          </div>

          <button
            type="submit"
            className="bg-[var(--secondary)] px-6 py-2  rounded-lg text-white mt-4"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Create Event'}
          </button>
        </form>


        {isModalOpen && (
          <EventModal
            setIsModalOpen={setIsModalOpen}
            type={modalType}
            data={modalData}
          />
        )}

      </div>
    </section>
  );
};

export default CreateEvent;
