import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewEvent } from '../api/events';
import { addEvent, setSelectedAttendees, setSelectedSpeakers } from '../redux/slices/eventSlice';
import EventModal from './EventModal';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedAttendees, selectedSpeakers } = useSelector((state) => state.event);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviewURLs, setImagePreviewURLs] = useState([]);
  const [uploadedImageURLs, setUploadedImageURLs] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generate preview URLs for each file
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreviewURLs(previewURLs);
  };


  const openModal = (type) => {
    setModalType(type);
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

  const uploadImages = async () => {
    setUploadingImages(true);
    const uploadedUrls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'huddle');
      formData.append('folder', 'huddle');

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dijp45drq/image/upload`,
          formData
        );
        uploadedUrls.push({
          imageUrl: res.data.secure_url,
          publicId: res.data.public_id,
        });
      } catch (err) {
        console.error('Error uploading image:', err);
        toast.error('Error uploading one or more images.');
      }
    }

    setUploadingImages(false);
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadingImages) return;

    try {
      const imageUploadResults = await uploadImages();
      setUploadedImageURLs(imageUploadResults);

      const formData = {
        title,
        description,
        date,
        videoUrl,
        isPublic,
        speakers: selectedSpeakers,
        attendees: selectedAttendees,
        images: imageUploadResults,
      };

      const response = await addNewEvent(formData);
      if (response.ok) {
        const data = await response.json();
        toast.success('Event created successfully!');
        dispatch(addEvent(data));
        navigate("/events");
        resetForm();
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <section>
      <div className='max-w-7xl mx-auto py-12 px-5'>
        <button className='px-4 py-2 bg-orange-500 text-white rounded-full mb-5' onClick={() => navigate(-1)}>Back</button>
        <h2 className="text-2xl font-semibold">Create new event</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <UploadAndDisplayImage onImageChange={onImageChange} imageURLs={imagePreviewURLs} />

          <div className="my-4">
            <label htmlFor="videoUrl" className="block font-medium">Video URL</label>
            <input
              type="url"
              id="videoUrl"
              className="w-full p-2 border rounded-lg mt-1"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <div className="my-4">
            <label htmlFor="title" className="block font-medium">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded-lg mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={10}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block font-medium">Date and Time</label>
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
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-lg mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={50}
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
            <label htmlFor="isPublic" className="ml-2">Public Event</label>
          </div>
          
          <button
            type="submit"
            className="bg-[var(--secondary)] px-6 py-2 rounded-lg text-white mt-4"
            disabled={uploadingImages}
          >
            {uploadingImages ? 'Uploading Images...' : 'Create Event'}
          </button>
        </form>

        {isModalOpen && (
          <EventModal
            setIsModalOpen={setIsModalOpen}
            type={modalType}
          />
        )}
      </div>
    </section>
  );
};

export default CreateEvent;
