import React from 'react'
import "./App.css"
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='h-screen w-full flex'>
       <ToastContainer />
     <Sidebar/>
     <Main/>
    </div>
  )
}

export default App
