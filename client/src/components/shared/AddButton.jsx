import { FaPlus } from "react-icons/fa"


const AddButton = ({text,onBtnClick}) => {
  return (
    <button className='text-white flex items-center hover:bg-[#e97d0a] gap-1 rounded-lg px-4 py-2 bg-[var(--secondary)]' onClick={onBtnClick}>
       <FaPlus />
       <span className='md:inline-block hidden'>{text}</span>
    </button>
  )
}

export default AddButton
