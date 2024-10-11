import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SpeakerList from './SpeakerList'

const Main = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<SpeakerList/>
    }
  ])
  return (
    <div className='w-3/4 bg-blue-500 h-full'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Main
