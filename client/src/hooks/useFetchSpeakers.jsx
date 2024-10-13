import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setSpeakers } from '../redux/slices/speakerSlice'

const useFetchSpeakers = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetch(import.meta.env.VITE_SPEAKER_URL)
                if (res.status===200) { 
                    const speakers = await res.json()
                    dispatch(setSpeakers(speakers))
                } else {
                    throw new Error(`Failed to fetch speakers: ${res.statusText}`)
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
