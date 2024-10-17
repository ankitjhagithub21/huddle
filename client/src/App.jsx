import React from 'react'
import "./App.css"
import Sidebar from './components/shared/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SpeakerList from './components/SpeakerList'
import EventList from './components/EventList'
import AttendeeList from './components/AttendeeList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetails from './components/EventDetails'
import VenueList from './components/VenueList'


const App = () => {

  return (
    <div className='h-screen w-full flex'>
      <ToastContainer theme='dark' autoClose={1500} />

      <BrowserRouter>
        <Sidebar />
        <main className='w-full p-5 h-full  overflow-y-scroll main relative'>

          <div className='max-w-4xl p-4'>
            <Routes>
              <Route path='/' element={<SpeakerList />} />
              <Route path='/events' element={<EventList />} />
              <Route path='/attendees' element={<AttendeeList />} />
              <Route path='/event/:eventId' element={<EventDetails />} />
              <Route path='/venues' element={<VenueList />} />
            </Routes>
          </div>


        </main>
      </BrowserRouter>


    </div>
  )
}

export default App
