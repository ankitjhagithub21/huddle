// App.jsx
import React from 'react';
import './App.css';
import Sidebar from './components/shared/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpeakerList from './components/SpeakerList';
import EventList from './components/EventList';
import AttendeeList from './components/AttendeeList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetails from './components/EventDetails';
import VenueList from './components/VenueList';
import SelectSpeaker from './components/SelectSpeaker';

// Layout for routes that include the Sidebar
const AppLayout = () => (
  <div className="h-screen w-full flex">
    <ToastContainer theme="dark" autoClose={1500} />
    <Sidebar />
    
    <main className="w-full p-5 h-full overflow-y-scroll scroll main relative">
      <section className="p-4">
        <Routes>
          <Route path="/" element={<SpeakerList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/attendees" element={<AttendeeList />} />
          <Route path="/venues" element={<VenueList />} />
        </Routes>
      </section>
    </main>
  </div>
);

// App component to handle the routing
const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Route for EventDetails component rendered outside the layout */}
      <Route path="/publish/event/:eventId" element={<EventDetails />} />
      
      {/* All other routes use the AppLayout */}
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  </BrowserRouter>
);

export default App;
