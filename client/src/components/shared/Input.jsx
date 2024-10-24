import React from 'react'

const Input = ({type,placeholder,name,value,setValue}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} className='w-full border-orange-500 border p-2 rounded-md focus:ring focus:ring-[var(--secondary)] mt-2' value={value} onChange={setValue} required/>
  )
}

export default Input
