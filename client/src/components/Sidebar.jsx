import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-full w-fit px-10 bg-[var(--primary)] flex flex-col items-center justify-between py-5'>
      <h2 className='font-bold text-2xl'>HUDDLE</h2>
     <div className='flex flex-col gap-5'>
     <Link to={"/"}>
        Speakers
      </Link>
      <Link to={"/events"}>
        Events
      </Link>
      <Link to={"/attendees"}>
        Attendees
      </Link>
     </div>
     <button>Copyright &copy; {new Date().getFullYear()}</button>
    </div>
  )
}

export default Sidebar
