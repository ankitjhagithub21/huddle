import { changeVisibility } from '../../api/events'
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { setIsPublic } from '../../redux/slices/eventSlice'

const EyeButton = ({id,isPublic}) => {
    const dispatch = useDispatch()
    const handleEyeButtonClick = async () => {
        try {
            const res = await changeVisibility(id)
            const data = await res.json()
            if (res.ok) {
                dispatch(setIsPublic(id))
                toast.success(data.message)
            } else {
                toast(data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <button
            onClick={handleEyeButtonClick}
            className="text-white bg-[var(--secondary)] p-2 rounded-md transition"
        >
            {
                isPublic ? <FaEye /> : <FaEyeSlash/>
            }
        </button>
    )
}

export default EyeButton
