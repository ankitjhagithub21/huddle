import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { setAttendees, setLoading } from '../redux/slices/attendeeSlice'
import { fetchAttendees } from '../api/attendees'

const useFetchAttendees = () => {

    const dispatch = useDispatch()
   
    
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetchAttendees()                
                if(res.status===200){
                    const attendees = await res.json()
                    dispatch(setAttendees(attendees.data))
                }

            } catch (error) {
                console.log(error.message)
            } finally {
                dispatch(setLoading(false))
            }
        }

        getData()

    }, [])

    
}

export default useFetchAttendees
