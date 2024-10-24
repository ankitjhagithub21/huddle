import React from 'react'

const Label = ({htmlFor,text}) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{text}</label>
  )
}

export default Label
