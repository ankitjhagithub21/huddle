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
    <div className='w-full relative h-full p-5'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Main
