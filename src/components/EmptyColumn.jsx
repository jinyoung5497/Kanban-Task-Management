import React from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function EmptyColumn() {
  const fetch = useFetch()
  const editBoard = () => {
    fetch.setEditBoardModalDisplay(true)
  }
  return (
    <>
      <div
        className={`transform transition duration-500 ease-in-out ${
          fetch.showSidebar ? '-translate-x-0' : 'translate-x-[100px]'
        } flex flex-col items-center justify-center w-screen h-screen`}
      >
        <p className='text-lg text-gray-light font-bold mb-8'>
          This board is empty. Create a new column to get started.
        </p>
        <button
          className=' bg-purple p-3 px-5 text-white rounded-full hover:bg-purple-light'
          onClick={editBoard}
        >
          + Add New Column
        </button>
      </div>
    </>
  )
}
