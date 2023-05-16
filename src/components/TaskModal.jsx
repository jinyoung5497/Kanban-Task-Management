import React, { useRef, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon3, icon11 } from '../assets'

export default function TaskModal() {
  const fetch = useFetch()
  const modalRef = useRef()
  const initRender = useRef(false)

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
    // console.log(!fetch.subtaskComplete[index])
    // fetch.setSubtaskIsCompleted((prev) => !prev)
  }

  return (
    <>
      <div className='bg-[#6b6b6b77] fixed w-screen h-screen flex items-center justify-center'>
        <div className='bg-white w-[500px] p-8 rounded-lg' ref={modalRef}>
          <div className='flex items-center mb-5'>
            <h1 className='text-lg font-extrabold'>{fetch.taskTitle}</h1>
            <img src={icon11} alt='option icon' />
          </div>
          <p className='text-[14px] text-gray-light tracking-wide leading-6 mb-4'>
            {fetch.taskDescription}
          </p>
          {/* <p>{fetch.taskStatus}</p> */}
          <p className='text-[13px] text-gray-light font-bold mb-3'>
            Subtasks ({} of {fetch.subtaskTitle.length})
          </p>
          {fetch.subtaskTitleArray.map((value, index) => (
            <div
              key={index}
              className='mb-3 bg-gray-bright p-3 rounded-sm text-sm text-gray-500 font-bold flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black'
              onClick={() => subtaskBoolean(value, index)}
            >
              <div
                className={`w-4 h-4 rounded-sm mr-4 flex justify-center ${
                  index == fetch.subtaskIndex && fetch.subtaskIsCompleted
                    ? 'bg-purple'
                    : 'bg-white'
                }`}
              >
                <img
                  src={icon3}
                  alt='check icon'
                  className={`w-3 h-3 self-center ${
                    index == fetch.subtaskIndex && fetch.subtaskIsCompleted
                      ? 'block'
                      : 'hidden'
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
              <option key={index} value={value.name} onChange={handleChange}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
