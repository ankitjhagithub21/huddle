import React from 'react';
import SelectAttendee from './SelectAttendee';
import SelectSpeaker from './SelectSpeaker';


const EventModal = ({ setIsModalOpen, type, data }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-50 overlay backdrop-blur-lg flex items-center justify-center p-5">
      <div className="p-5 shadow-xl bg-white rounded-xl h-[80vh] gap-2 max-w-xl w-full flex flex-col justify-between">
      
        <h1 className="text-2xl font-semibold mb-5">Select {type}</h1>
        {type === 'speaker' && <SelectSpeaker data={data} />}
        {type === 'attendee' && <SelectAttendee data={data} />}
        <button onClick={() => setIsModalOpen(false)} className="bg-[var(--secondary)] text-white rounded-lg p-2 ">
          Close
        </button>
      </div>
      
    </div>
  );
};

export default EventModal;
