import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewEvent } from '../api/events';
import { setSelectedAttendees, setSelectedSpeakers } from '../redux/slices/eventSlice';
import EventModal from './EventModal';
import UploadAndDisplayImage from './UploadAndDisplayImage';

const CreateEvent = ({ showForm, onClose, eventData }) => {
  const dispatch = useDispatch();
  const { selectedAttendees, selectedSpeakers } = useSelector((state) => state.event);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageURLs);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || '');
      setDescription(eventData.description || '');
      setDate(eventData.date ? new Date(eventData.date).toISOString().slice(0, 16) : '');
      setVideoUrl(eventData.videoUrl || '');
      dispatch(setSelectedSpeakers(eventData.speakers || []));
      dispatch(setSelectedAttendees(eventData.attendees || []));
    } else {
      resetForm();
    }
  }, [eventData, showForm]);

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

  const openModal = (type) => {
    setModalType(type);
    setModalData(type === 'speaker' ? selectedSpeakers : selectedAttendees);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
 

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('videoUrl', videoUrl);
      formData.append('isPublic', isPublic);
      formData.append('speakers',JSON.stringify(selectedSpeakers))
      formData.append('attendees',JSON.stringify(selectedAttendees))
      images.forEach((image) => formData.append('images', image));


      const response = await addNewEvent(formData);
      if (response.ok) {
        toast.success('Event created successfully!');
        // resetForm();
        onClose();
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
    <div
      className={`w-full mx-auto p-6 h-full shadow-md fixed top-0 left-0 scroll bg-white overflow-y-scroll transition-all duration-500 ${
        showForm ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {eventData ? 'Update Event' : 'Create New Event'}
        </h2>
        <button onClick={onClose}>
          <IoIosCloseCircleOutline size={25} />
        </button>
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
          className="bg-[var(--secondary)] p-2 rounded-lg text-white mt-4 w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : eventData ? 'Update Event' : 'Create Event'}
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
  );
};

export default CreateEvent;
