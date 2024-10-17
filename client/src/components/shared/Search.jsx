import { GoSearch } from 'react-icons/go'

const Search = () => {
  return (
    <div className='flex items-center bg-gray-200 border-gray-800 rounded-lg pl-4  pr-2 py-2 w-full max-w-lg'>
    <input type="text" placeholder='Search' className='w-full  bg-transparent outline-none ' />
    <GoSearch size={20} />
</div>
  )
}

export default Search
