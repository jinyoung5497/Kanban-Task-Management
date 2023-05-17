import React, { useRef, useEffect, useState } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon3, icon11 } from '../assets'

export default function TaskModal() {
  const fetch = useFetch()
  const modalRef = useRef()
  const [openOption, setOpenOption] = useState(false)

  const handleChange = (event) => {
    fetch.setHandleSelected(event.target.value == fetch.taskStatus)
  }

  const handleDisplayModal = () => {
    fetch.setHandleDisplayModal(true)
  }

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      fetch.setModalDisplay(false)
    }
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

  const subtaskBoolean = (value, index) => {
    fetch.setSubtaskIndex(index)
    fetch.setSubtaskIsCompleted(fetch.subtaskData[index].isCompleted)
    fetch.setSubtaskToggle((prev) => !prev)
  }

  return (
    <>
      <div className='bg-[#6b6b6b77] w-screen h-screen flex items-center justify-center'>
        <div className='bg-white w-[500px] p-8 rounded-lg' ref={modalRef}>
          <div className='flex items-center mb-5'>
            <h1 className='text-lg font-extrabold'>{fetch.taskTitle}</h1>
            <div
              className='w-8 h-8 ml-auto flex items-center justify-center cursor-pointer flex-col '
              onClick={() => setOpenOption((prev) => !prev)}
            >
              <img src={icon11} alt='option icon' className='fixed' />
              <div
                className={`${
                  openOption ? 'block' : 'hidden'
                } relative top-20 z-10 w-40 bg-white rounded-md flex flex-col justify-center items-start p-5 gap-y-3 text-md shadow-lg`}
              >
                <button className='text-gray-light'>Edit Task</button>
                <button className='text-red'>Delete Task</button>
              </div>
            </div>
          </div>
          <p className='text-[14px] text-gray-light tracking-wide leading-6 mb-4'>
            {fetch.taskDescription}
          </p>
          <p className='text-[13px] text-gray-light font-bold mb-3'>
            Subtasks (
            {
              fetch.subtaskData.filter((value) => value.isCompleted == true)
                .length
            }{' '}
            of {fetch.subtaskData.length})
          </p>
          {fetch.subtaskData.map((value, index) => (
            <div
              key={index}
              className='mb-3 bg-gray-bright p-3 rounded-sm text-sm text-gray-500 font-bold flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black'
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
              <div className='flex-1'>{value.title}</div>
            </div>
          ))}
          <p className='text-gray-light text-sm mb-2 font-bold'>
            Current Status
          </p>
          <select
            defaultValue={fetch.taskStatus}
            className='border-[1px] border-purple w-full p-2 rounded-sm'
          >
            {fetch.columnName.map((value, index) => (
              <option
                key={index}
                value={value.name}
                onChange={handleChange}
                className='text-gray-light text-md '
              >
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
