import React, { useState, useRef, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon12, icon11 } from '../assets'

export default function Navbar() {
  const fetch = useFetch()
  const [openOption, setOpenOption] = useState(false)
  const modalRef = useRef()

  useEffect(() => {
    if (openOption) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [openOption])

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenOption(false)
    }
  }

  const openAddNewTask = () => {
    fetch.setAddTaskModalDisplay(true)
    fetch.setToggleResetValue((prev) => !prev)
  }

  const openEditModal = () => {
    setOpenOption(false)
    fetch.setEditBoardModalDisplay(true)
  }

  const openDeleteModal = () => {
    fetch.setDeleteBoardModalDisplay(true)
    setOpenOption(false)
  }

  return (
    <div className='z-10 w-full flex bg-white items-center border-b-[1px] border-gray-bright fixed top-0'>
      <div className='border-r-[1px] border-gray-bright w-[300px] h-[100px] flex items-center pl-8'>
        <img src={icon12} alt='Main logo' />
      </div>
      <div className='ml-5 text-xl font-bold'>{fetch.boardName}</div>
      <button
        className='ml-auto bg-purple p-3 px-5 text-white rounded-full hover:bg-purple-light'
        onClick={openAddNewTask}
      >
        + Add New Task
      </button>
      <div
        className='flex items-center justify-center w-10 h-10 mr-4 ml-2 cursor-pointer'
        onClick={() => setOpenOption((prev) => !prev)}
      >
        <img src={icon11} alt='option logo' />
      </div>

      {/* OPTION MODAL */}
      <div
        className={`flex flex-col bg-white absolute p-4 rounded-xl text-md w-48  items-start top-20 right-8 z-50 drop-shadow-md gap-y-3 ${
          openOption ? 'block' : 'hidden'
        }`}
      >
        <button
          className='text-gray-light hover:text-purple'
          onClick={openEditModal}
        >
          Edit Board
        </button>
        <button
          className='text-red hover:text-red-light'
          onClick={openDeleteModal}
        >
          Delete Board
        </button>
      </div>
    </div>
  )
}
