import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon6 } from '../assets'

export default function AddTask() {
  const fetch = useFetch()
  const addTaskRef = useRef()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subtasksArray, setSubtasksArray] = useState([])
  const [subtaskIndex, setSubtaskIndex] = useState(0)

  useEffect(() => {
    if (fetch.addTaskModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.addTaskModalDisplay])

  const handleOutsideClick = (e) => {
    if (addTaskRef.current && !addTaskRef.current.contains(e.target)) {
      fetch.setAddTaskModalDisplay(false)
    }
  }

  const handleDropdown = (name, index) => {
    setDropdownOpen(false)
    fetch.setDropStatus(name)
    setSubtaskIndex(index)
  }

  const newSubtask = () => {
    const newArray = [...subtasksArray]
    newArray.push('')
    setSubtasksArray(newArray)
  }

  const updateSubtask = (index) => {
    const newArray = [...subtasksArray]
    newArray[index] = event.target.value
    setSubtasksArray(newArray)
  }

  const deleteSubtasks = (index) => {
    const newArray = [...subtasksArray]
    newArray.splice(index, 1)
    setSubtasksArray(newArray)
  }

  const createTask = () => {
    const newData = [...fetch.mainBoard]
    newData[subtaskIndex].tasks.push({
      title: title,
      description: description,
      status: fetch.dropStatus,
      subtasks: subtasksArray.map((value) => ({
        title: value,
        isCompleted: false,
      })),
    })
    fetch.setAddTaskModalDisplay(false)
    fetch.setUpdateToggle((prev) => !prev)
  }

  return (
    <>
      <div
        className={` ${
          fetch.addTaskModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
      >
        <div
          className={`${
            fetch.addTaskModalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg`}
          ref={addTaskRef}
        >
          <h1 className='text-lg font-extrabold mb-5'>Add New Task</h1>
          {/* TITLE */}
          <p className='text-sm text-gray-light font-bold mb-2'>Title</p>
          <input
            type='text'
            placeholder='e.g. Take coffee break'
            className='p-2 border-[1px] border-gray-bright rounded-md w-full mb-3'
            onChange={() => setTitle(event.target.value)}
          />
          {/* DESCRIPTION */}
          <p className='text-sm text-gray-light font-bold mb-2'>Description</p>
          <textarea
            type='text'
            placeholder="e.g. It's always good to take a break."
            className='p-2 border-[1px] border-gray-bright rounded-md w-full mb-3 h-32 break-all align-top flex items-start justify-start flex-wrap'
            onChange={() => setDescription(event.target.value)}
          />
          {/* SUBTASKS */}
          <p className='text-sm text-gray-light font-bold mb-2'>Subtasks</p>
          {/* SUBTASKS INPUT */}
          {subtasksArray &&
            subtasksArray.map((value, index) => {
              return (
                <div
                  className='flex items-center justify-center mb-3'
                  key={index}
                >
                  <input
                    type='text'
                    placeholder='e.g. Make coffee'
                    className='p-2 border-[1px] border-gray-bright rounded-md w-full'
                    onChange={() => updateSubtask(index)}
                    value={value}
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
            className='bg-gray-bright block w-full rounded-full mb-5 p-3 text-purple font-bold text-md'
            onClick={newSubtask}
          >
            + Add New Subtask
          </button>
          <p className='text-sm text-gray-light font-bold mb-2'>Status</p>

          {/* ============DROP DOWN ============ */}
          <div>
            <input
              type='text'
              value={fetch.dropStatus}
              readOnly
              onClick={() => setDropdownOpen(true)}
              className='w-full border-[1px] border-gray-bright p-2 rounded-md'
            />
            {dropdownOpen && (
              <ul className='relative p-3 rounded-md'>
                {fetch.mainBoard.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleDropdown(value.name, index)}
                      className='mb-1 text-gray-light'
                    >
                      {value.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button
            className='mt-8 bg-purple w-full rounded-full p-3 text-md text-linen'
            onClick={createTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </>
  )
}
