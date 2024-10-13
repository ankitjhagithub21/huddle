import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setSpeakers } from '../redux/slices/speakerSlice'
import { fetchSpeakers } from '../api/speakers'

const useFetchSpeakers = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetchSpeakers()                
                if(res.status===200){
                    const data = await res.json()
                    dispatch(setSpeakers(data))
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

export default useFetchSpeakers
