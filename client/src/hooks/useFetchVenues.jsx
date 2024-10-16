import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setVenues } from '../redux/slices/venueSlice'
import { fetchVenues } from '../api/venue'

const useFetchVenues = () => {

    const dispatch = useDispatch()
    const {venues} = useSelector(state=>state.venue)
    
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const data = await fetchVenues()                
                dispatch(setVenues(data))

            } catch (error) {
                console.log(error.message)
            } finally {
                dispatch(setLoading(false))
            }
        }

        if(!venues){
            getData()
        }
        
    }, [])

    
}

export default useFetchVenues
