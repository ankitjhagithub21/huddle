import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setevents, setLoading } from '../redux/slices/eventSlice'


const useFetchEvents = () => {

    const dispatch = useDispatch()
    const { events } = useSelector(state => state.event)

    useEffect(() => {


        const getData = async () => {
            dispatch(setLoading(true))
            try {
                const response = await axios.get(`${import.meta.env.VITE_EVENT_URL}`);
                dispatch(setevents(response.data))

            } catch (error) {
                console.error('Error fetching events:', error);

            } finally {
                setLoading(false)
            }
        };

        if (!events) {
            getData()
        }

    }, [])


}

export default useFetchEvents
