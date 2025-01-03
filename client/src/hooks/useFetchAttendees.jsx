import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAttendees, setLoading } from '../redux/slices/attendeeSlice'
import { fetchAttendees } from '../api/attendees'

const useFetchAttendees = () => {

    const dispatch = useDispatch()
    const { attendees } = useSelector(state => state.attendee)

    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetchAttendees()
                const data = await res.json()
                dispatch(setAttendees(data))

            } catch (error) {
                console.log(error.message)
            } finally {
                dispatch(setLoading(false))
            }
        }

        if (!attendees) {
            getData()
        }

    }, [])


}

export default useFetchAttendees
