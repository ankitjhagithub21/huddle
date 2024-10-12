import { useEffect, useState } from 'react'

const useFetchSpeakers = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const url = import.meta.env.VITE_SPEAKER_URL
                
                const res = await fetch(url)
                if (res.ok) { 
                    const speakers = await res.json()
                    setData(speakers)
                } else {
                    throw new Error(`Failed to fetch speakers: ${res.statusText}`)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])

    return { loading, data} 
}

export default useFetchSpeakers
