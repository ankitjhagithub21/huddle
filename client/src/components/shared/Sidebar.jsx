import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaMicrophone, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";

const Sidebar = () => {
  // Array of links with paths, labels, and icons
  const sidebarLinks = [
    { path: '/', label: 'Speakers', icon: <FaMicrophone /> },
    { path: '/attendees', label: 'Attendees', icon: <FaUsers /> },
    { path: '/events', label: 'Events', icon: <FaCalendarAlt /> },
    { path: '/venues', label: 'Venues', icon: <FaLocationDot /> },
  ];

  return (
    <div className='h-full lg:w-1/5 w-fit md:px-4 px-0 bg-[var(--secondary)] flex flex-col  justify-between py-5'>
      <h2 className='font-semibold  tracking-wider text-3xl text-white'>H<span className='lg:inline-block'>uddle</span></h2>
     

      <div className='flex flex-col gap-5 md:w-full w-fit'>
        {/* Map through sidebarLinks array to render links */}
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center w-full gap-2 text-lg p-2 rounded-lg ${
                isActive
                  ? 'bg-white text-gray-800'
                  : 'text-white hover:bg-white hover:text-gray-800'
              }`
            }
          >
            {link.icon}
            <span className='lg:block hidden'>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <button className='text-sm text-white'>
        <span className='lg:inline-block hidden'>Copyright</span> &copy; {new Date().getFullYear()} Huddle
      </button>
    </div>
  )
}

export default Sidebar
