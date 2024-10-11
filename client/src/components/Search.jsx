import { GoSearch } from 'react-icons/go'

const Search = () => {
    return (

        <div className='flex items-center border border-gray-800 rounded-lg p-2 w-full max-w-lg'>
            <input type="text" placeholder='Search' className='w-full  bg-transparent outline-none' />
            <GoSearch size={20} />
        </div>

    )
}

export default Search
