import React from 'react'
import useFetchAttendees from '../hooks/useFetchAttendees'

const AttendeeList = () => {
  useFetchAttendees()
  return (
    <div>
      Attendee
    </div>
  )
}

export default AttendeeList
