import React, { useState, useEffect, useRef } from 'react'
import { icon4, icon6 } from '../assets'
import { useFetch } from '../hooks/UseFetch'

export default function EditTask() {
  const fetch = useFetch()
  const editTaskRef = useRef()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (fetch.editTaskModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.editTaskModalDisplay])

  const handleOutsideClick = (e) => {
    if (editTaskRef.current && !editTaskRef.current.contains(e.target)) {
      fetch.setEditTaskModalDisplay(false)
      fetch.setToggleEditTask((prev) => !prev)
    }
  }

  const handleDropdown = (title, index) => {
    setDropdownOpen(false)
    fetch.setTaskStatus(title)
    fetch.setStatusIndex(index)
    console.log('statusIndex:', index)
    fetch.setChangeStatus((prev) => !prev)
  }

  const newSubtask = () => {
    const newArray = [...fetch.subtasksArray]
    newArray.push({ title: '', isCompleted: false })
    fetch.setSubtasksArray(newArray)
  }

  const updateSubtask = (index) => {
    const newArray = [...fetch.subtasksArray]
    newArray[index].title = event.target.value
    fetch.setSubtasksArray(newArray)
  }

  const deleteSubtasks = (index) => {
    const newArray = [...fetch.subtasksArray]
    newArray.splice(index, 1)
    fetch.setSubtasksArray(newArray)
  }

  const saveChanges = () => {
    fetch.setToggleEditTask((prev) => !prev)
    fetch.setEditTaskModalDisplay(false)
    console.log(fetch.currentStatus)
  }

  return (
    <>
      <div
        className={` ${
          fetch.editTaskModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
      >
        <div
          className={`${
            fetch.editTaskModalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg`}
          ref={editTaskRef}
        >
          <h1 className='text-lg font-extrabold mb-5'>Edit Task</h1>
          {/* TITLE */}
          <p className='text-sm text-gray-light font-bold mb-2'>Title</p>
          <input
            type='text'
            placeholder='e.g. Take coffee break'
            value={fetch.taskTitle}
            className='p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full mb-3'
            onChange={() => fetch.setTaskTitle(event.target.value)}
          />
          {/* DESCRIPTION */}
          <p className='text-sm text-gray-light font-bold mb-2'>Description</p>
          <textarea
            type='text'
            placeholder="e.g. It's always good to take a break."
            value={fetch.taskDescription}
            className='p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full mb-3 h-32 break-all align-top flex items-start justify-start flex-wrap'
            onChange={() => fetch.setTaskDescription(event.target.value)}
          />
          {/* SUBTASKS */}
          <p className='text-sm text-gray-light font-bold mb-2'>Subtasks</p>
          {/* SUBTASKS INPUT */}
          {fetch.subtasksArray &&
            fetch.subtasksArray.map((value, index) => {
              return (
                <div
                  className='flex items-center justify-center mb-3'
                  key={index}
                >
                  <input
                    type='text'
                    placeholder='e.g. Make coffee'
                    className='p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full'
                    onChange={() => updateSubtask(index)}
                    value={value.title}
                  />
                  <img
                    src={icon6}
                    alt='delete icon'
                    className='w-4 h-4 ml-4'
                    onClick={() => deleteSubtasks(index)}
                  />
                </div>
              )
            })}
          <button
            className='bg-gray-bright block w-full rounded-full mb-5 p-3 text-purple font-bold text-[14px]'
            onClick={newSubtask}
          >
            + Add New Subtask
          </button>
          <p className='text-sm text-gray-light font-bold mb-2'>Status</p>

          {/* ============DROP DOWN ============ */}
          <div>
            <input
              type='text'
              value={fetch.taskStatus}
              placeholder={fetch.currentStatus}
              readOnly
              onClick={() => setDropdownOpen(true)}
              className='w-full text-[14px] border-[1px] border-gray-bright p-2 rounded-md placeholder:text-black'
            />
            {dropdownOpen && (
              <ul className='relative p-3 rounded-md'>
                {fetch.mainBoard.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleDropdown(value.name, index)}
                      className='mb-1 text-[14px] text-gray-light'
                    >
                      {value.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button
            className='mt-8 bg-purple w-full rounded-full p-3 text-[14px] text-linen'
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
