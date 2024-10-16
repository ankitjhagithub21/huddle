import React from 'react'
import useFetchVenues from '../hooks/useFetchVenues'

const VenueList = () => {
    useFetchVenues()
  return (
    <div>
      Venue
    </div>
  )
}

export default VenueList
