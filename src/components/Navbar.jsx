import React, { useState } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon12, icon11 } from '../assets'

export default function Navbar() {
  const fetch = useFetch()
  const [openOption, setOpenOption] = useState(false)

  const getOption = () => {}
  return (
    <div className='flex items-center border-b-[1px] border-gray-bright'>
      <div className='border-r-[1px] border-gray-bright w-[300px] h-[100px] flex items-center pl-8'>
        <img src={icon12} alt='Main logo' />
      </div>
      <div className='ml-5 text-xl font-bold'>{fetch.boardName}</div>
      <button className='ml-auto bg-purple p-3 px-5 text-white rounded-full mr-8 hover:bg-purple-light'>
        + Add New Task
      </button>
      <img
        src={icon11}
        alt='option logo'
        className='mr-8 cursor-pointer'
        onClick={() => setOpenOption((prev) => !prev)}
      />
      <div
        className={`flex flex-col bg-white absolute p-4 rounded-xl text-md w-48 items-start top-20 right-8 z-10 drop-shadow-md gap-y-3 ${
          openOption ? 'block' : 'hidden'
        }`}
      >
        <button className='text-gray-light hover:text-purple'>
          Edit Board
        </button>
        <button className='text-red hover:text-red-light'>Delete Board</button>
      </div>
    </div>
  )
}
