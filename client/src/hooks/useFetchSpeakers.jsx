import { useEffect, useState } from 'react'

const useFetchSpeakers = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {

        const getData = async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_URL}/speakers`
                setLoading(true)
                const res = await fetch(url)
                if (res.status === 200) {
                    const speakers = await res.json()
                    setData(speakers)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return { loading, data }
}

export default useFetchSpeakers
