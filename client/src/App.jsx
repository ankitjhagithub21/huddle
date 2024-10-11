import React from 'react'
import "./App.css"
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SpeakerList from './components/SpeakerList'
import EventList from './components/EventList'
import AttendeeList from './components/AttendeeList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {


  return (
    <div className='h-screen w-full flex'>
      <ToastContainer theme='dark' autoClose={1500} />

      <BrowserRouter>
        <Sidebar />
        <div className='w-full p-5'>
          <Routes>
            <Route path='/' element={<SpeakerList />} />
            <Route path='/events' element={<EventList />} />
            <Route path='/attendees' element={<AttendeeList />} />
          </Routes>
        </div>
      </BrowserRouter>


    </div>
  )
}

export default App
