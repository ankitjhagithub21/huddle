import React, { useState,useEffect } from 'react'
import CreateSpeaker from './CreateSpeaker'
import useFetchSpeakers from '../hooks/useFetchSpeakers'
import Search from './Search'
import Speaker from './Speaker'
import { toast } from 'react-toastify'

const SpeakerList = () => {
    const { data, loading } = useFetchSpeakers()
    const [speakers, setSpeakers] = useState([]) 
    const [showForm, setShowForm] = useState(false)

      // Update speakers when data is fetched from the API
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setSpeakers(data);
        }
    }, [data]);

    // Handle new speaker creation
    const handleAddSpeaker = (newSpeaker) => {
        setSpeakers([...speakers,newSpeaker])
    }

    // Handle speaker deletion
    const handleDelete = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_SPEAKER_URL}/${id}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (res.status === 200) {
            setSpeakers(speakers.filter(speaker => speaker._id !== id)) 
            toast.success(data.message)
        } else {
            toast.error(data.error)
        }
    }

    const onClose = () => {
        setShowForm(false)
    }

  

    if (loading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>Error fetching data.</p>
    }


    return (
        <div>
            <div className='flex items-center justify-start gap-2'>
                <Search />
                <button onClick={() => setShowForm(true)} className='text-white rounded-lg px-4 py-2 bg-[var(--secondary)]'>Add</button>
            </div>
            <div>
                <h2 className='my-5 text-3xl font-bold'>Speakers List</h2>
                <div className='grid grid-cols-5 items-center my-2 p-1 font-bold'>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Mobile</p>
                    <p>Email</p>
                    <p>Action</p>
                </div>
                {
                    speakers.length === 0 ? <p>No speaker found</p> :
                        speakers.map((speaker) => (
                            <Speaker key={speaker._id} speaker={speaker} onDelete={handleDelete} />
                        ))
                }
            </div>

            <CreateSpeaker onClose={onClose} showForm={showForm} onAddSpeaker={handleAddSpeaker} />
        </div>
    )
}

export default SpeakerList
