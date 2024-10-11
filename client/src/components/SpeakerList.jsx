import React,{useState} from 'react'
import CreateSpeaker from './CreateSpeaker'
import useFetchSpeakers from '../hooks/useFetchSpeakers'
import Search from './Search'
import Speaker from './Speaker'
import { toast } from 'react-toastify'

const SpeakerList = () => {
  const {data,loading} = useFetchSpeakers()
  const [showForm,setShowForm] = useState(false)

  
  const handleDelete = async(id) =>{
    const res = await fetch(`${import.meta.env.VITE_SPEAKER_URL}/${id}`,{
      method:"DELETE",
    })
    const data = await res.json()
    if(res.status===200){
       toast.success(data.message)
    }else{
      toast.error(data.error)
    }
  }
  
  const onClose = () =>{
    setShowForm(false)
  }
  if(loading){
    return <p>Loading...</p>
  }
  if(!data){
    return <p>Error.</p>
  }
  
  return (
    <div>
      <div className='flex items-center justify-start gap-2'>
        <Search/>
        <button onClick={()=>setShowForm(true)} className=' text-white rounded-lg px-4 py-2 bg-[var(--primary)]'>Add</button>
      </div>
     <div>
      <h2 className='my-5 text-3xl font-bold'>Speakers List</h2>
      <div className='grid grid-cols-5 items-center my-2  p-1 font-bold'>
        <p>Image</p>
        <p>Name</p>
        <p>Mobile</p>
        <p>Email</p>
        <p>Action</p>
      </div>
     {
      data.length==0 ? <p>No speaker found</p> :  data.map((speaker)=>{
        return <Speaker key={speaker._id} speaker={speaker} onDelete={handleDelete}/>
      })
     }
     </div>
      
     
      <CreateSpeaker onClose={onClose} showForm={showForm}/>
     
    </div>
  )
}

export default SpeakerList
