import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setevents, setLoading } from '../redux/slices/eventSlice'
import { fetchEvents } from '../api/events'


const useFetchEvents = () => {

    const dispatch = useDispatch()
    const { events } = useSelector(state => state.event)

    useEffect(() => {

        const getData = async () => {
            dispatch(setLoading(true))
            try {
                const response = await fetchEvents();
                const data = await response.json()
                dispatch(setevents(data))
            } catch (error) {
                console.error('Error fetching events:', error);

            } finally {
                dispatch(setLoading(false))
            }
        };

        if (!events) {
            getData()
        }

    }, [])


}

export default useFetchEvents
