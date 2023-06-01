import React, { useRef, useEffect, useState } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon4, icon3, icon11 } from '../assets'

export default function TaskModal() {
  const fetch = useFetch()
  const modalRef = useRef()
  const [openOption, setOpenOption] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleChange = (event) => {
    fetch.setHandleSelected(event.target.value == fetch.taskStatus)
  }

  const handleDisplayModal = () => {
    fetch.setHandleDisplayModal(true)
  }

  useEffect(() => {
    if (fetch.modalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.modalDisplay])

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      fetch.setModalDisplay(false)
      setDropdownOpen(false)
    }
  }

  const subtaskBoolean = (value, index) => {
    fetch.setSubtaskIndex(index)
    fetch.setSubtaskIsCompleted(fetch.subtaskData[index].isCompleted)
    fetch.setSubtaskToggle((prev) => !prev)
    console.log(value.isCompleted)
  }

  const handleDropdown = (title, index) => {
    setDropdownOpen(false)
    fetch.setTaskStatus(title)
    fetch.setStatusIndex(index)
    console.log('statusIndex:', index)
    fetch.setChangeStatus((prev) => !prev)
  }

  const openEditTask = () => {
    fetch.setEditTaskModalDisplay(true)
    fetch.setModalDisplay(false)
    fetch.setSubtasksArray(fetch.subtaskData)
  }

  const openDeleteTask = () => {
    fetch.setDeleteTaskModalDisplay(true)
    fetch.setModalDisplay(false)
  }

  return (
    <>
      <div
        className={`${
          fetch.modalDisplay ? 'block' : 'hidden'
        } bg-[#6b6b6b77] w-screen h-screen flex items-center justify-center`}
      >
        <div
          className={`${
            fetch.modalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg absolute`}
          ref={modalRef}
        >
          <div className='flex items-center mb-5'>
            {/* TITLE */}
            <h1 className='text-lg font-extrabold'>{fetch.taskTitle}</h1>
            {/* OPTION */}
            <div
              className='w-8 h-8 ml-auto flex items-center justify-center cursor-pointer flex-col'
              onClick={() => setOpenOption((prev) => !prev)}
            >
              <img src={icon11} alt='option icon' className='absolute' />
              <div
                className={`${
                  openOption ? 'block' : 'hidden'
                } absolute top-20 z-10 w-40 bg-white rounded-md flex flex-col justify-center items-start p-5 gap-y-3 text-md shadow-lg`}
              >
                <button className='text-gray-light' onClick={openEditTask}>
                  Edit Task
                </button>
                <button className='text-red' onClick={openDeleteTask}>
                  Delete Task
                </button>
              </div>
            </div>
          </div>
          {/* DESCRIPTION */}
          <p className='text-[14px] text-gray-light tracking-wide leading-6 mb-4'>
            {fetch.taskDescription}
          </p>
          {/* SUBTASKS */}
          <p className='text-[13px] text-gray-light font-bold mb-3'>
            Subtasks (
            {
              fetch.subtaskData.filter((value) => value.isCompleted == true)
                .length
            }{' '}
            of {fetch.subtaskData.length})
          </p>
          {/* SUBTASKS CHECKBOX */}
          {fetch.subtaskData.map((value, index) => (
            <div
              key={index}
              className='mb-3 bg-gray-bright p-3 rounded-sm text-sm text-gray-500 font-bold flex items-center cursor-pointer hover:bg-indigo-200 hover:text-black'
              onClick={() => subtaskBoolean(value, index)}
            >
              <div
                className={`w-4 h-4 rounded-sm mr-4 flex justify-center ${
                  fetch.subtaskData[index].isCompleted
                    ? 'bg-purple'
                    : 'bg-white'
                }`}
              >
                <img
                  src={icon3}
                  alt='check icon'
                  className={`w-3 h-3 self-center ${
                    fetch.subtaskData[index].isCompleted ? 'block' : 'hidden'
                  }`}
                />
              </div>
              <div
                className={`flex-1 ${
                  fetch.subtaskData[index].isCompleted
                    ? 'text-gray line-through'
                    : 'text-black'
                }`}
              >
                {value.title}
              </div>
            </div>
          ))}
          {/* CURRENT STATUS */}
          <p className='text-gray-light text-sm mb-2 font-bold'>
            Current Status
          </p>
          <div>
            <div className='w-full flex justify-center items-center'>
              <input
                type='text'
                value={fetch.taskStatus}
                placeholder={fetch.currentStatus}
                readOnly
                onClick={() => setDropdownOpen((prev) => !prev)}
                className='w-full border-[1px] border-gray-bright p-2 rounded-md placeholder:text-gray text-[14px] cursor-pointer outline-none focus:border-purple'
              />
              <img
                src={icon4}
                alt='checkdown icon'
                className='w-3 h-2 absolute right-11 cursor-pointer'
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
            </div>
            {dropdownOpen && (
              <ul className='absolute bg-white w-[430px] p-3 rounded-md cursor-pointer'>
                {fetch.mainBoard.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleDropdown(value.name, index)}
                      className='mb-2 text-gray-light text-[14px]'
                    >
                      {value.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
