import React,{useState} from 'react'
import CreateSpeaker from './createSpeaker'
import useFetchSpeakers from '../hooks/useFetchSpeakers'
import Search from './Search'
import Speaker from './Speaker'

const SpeakerList = () => {
  const {data,loading} = useFetchSpeakers()
  const [showForm,setShowForm] = useState(false)

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
        <button onClick={()=>setShowForm(true)} className='bg-blue-500 text-white rounded-lg px-4 py-2'>Add</button>
      </div>
     <div>
      <h2 className='my-5 text-3xl font-bold'>Speakers List</h2>
     {
      data.map((speaker)=>{
        return <Speaker key={speaker._id} speaker={speaker}/>
      })
     }
     </div>
      
     
      <CreateSpeaker onClose={onClose} showForm={showForm}/>
     
    </div>
  )
}

export default SpeakerList
