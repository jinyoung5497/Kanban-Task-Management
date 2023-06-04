import React, { useState, useEffect, useRef } from 'react'
import { icon4, icon6 } from '../assets'
import { useFetch } from '../hooks/UseFetch'

export default function EditTask() {
  const fetch = useFetch()
  const editTaskRef = useRef()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [arrayError, setArrayError] = useState(false)
  const [toggleResetValue, setToggleResetValue] = useState(false)

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
      setToggleResetValue((prev) => !prev)
      saveChanges()
      setDropdownOpen(false)
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
    if (
      fetch.taskTitle.length === 0 ||
      fetch.subtasksArray
        .map((value) => value.title.length === 0)
        .filter((value) => value == true)[0]
    ) {
      if (fetch.taskTitle.length === 0) {
        setTitleError(true)
      } else {
        setTitleError(false)
      }
      if (
        fetch.subtasksArray
          .map((value) => value.title.length === 0)
          .filter((value) => value == true)[0]
      ) {
        setArrayError(
          fetch.subtasksArray.map((value) => value.title.length === 0)
        )
      }
    } else {
      fetch.setToggleEditTask((prev) => !prev)
      fetch.setEditTaskModalDisplay(false)
      console.log(fetch.currentStatus)
      setToggleResetValue((prev) => !prev)
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    setTitleError(false)
    setArrayError([])
    console.log(arrayError)
  }, [toggleResetValue])

  // edit task click outside still updates
  // edit board click outside still updates
  // edit task subtask error doesn't reset
  // edit board subtask error doesn't reset

  return (
    <>
      <div
        className={` ${
          fetch.editTaskModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center ${
          fetch.darkMode ? 'bg-[#2c2c2c77]' : 'bg-[#6b6b6b77]'
        }`}
      >
        <div
          className={`${fetch.editTaskModalDisplay ? 'block' : 'hidden'} ${
            fetch.darkMode ? 'bg-gray-dark' : 'bg-white'
          } w-[500px] p-8 rounded-lg`}
          ref={editTaskRef}
        >
          <h1
            className={`text-lg font-extrabold mb-5 ${
              fetch.darkMode ? 'text-white' : 'text-black'
            }`}
          >
            Edit Task
          </h1>
          {/* TITLE */}
          <p
            className={`text-sm text-gray-light font-bold mb-2 ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            }`}
          >
            Title
          </p>
          <div className='flex items-center justify-end mb-3'>
            <input
              type='text'
              placeholder='e.g. Take coffee break'
              value={fetch.taskTitle}
              className={`p-2 text-[14px] border-[1px] outline-none focus:border-purple border-gray-bright ${
                fetch.darkMode
                  ? `bg-gray-dark text-white ${
                      titleError ? 'border-red' : 'border-gray-med'
                    }`
                  : ''
              } rounded-md w-full ${
                titleError && 'border-red focus:border-red'
              }`}
              onChange={() => fetch.setTaskTitle(event.target.value)}
            />
            {titleError && (
              <div className='absolute mr-3 text-[14px] text-red'>
                Can't be empty
              </div>
            )}
          </div>
          {/* DESCRIPTION */}
          <p
            className={`text-sm text-gray-light font-bold mb-2 ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            }`}
          >
            Description
          </p>
          <textarea
            type='text'
            placeholder="e.g. It's always good to take a break."
            value={fetch.taskDescription}
            className={`p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full mb-3 h-32 break-all align-top flex items-start justify-start flex-wrap outline-none focus:border-purple ${
              fetch.darkMode ? 'bg-gray-dark text-white border-gray-med' : ''
            }`}
            onChange={() => fetch.setTaskDescription(event.target.value)}
          />
          {/* SUBTASKS */}
          <p
            className={`text-sm text-gray-light font-bold mb-2 ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            }`}
          >
            Subtasks
          </p>
          {/* SUBTASKS INPUT */}
          {fetch.subtasksArray &&
            fetch.subtasksArray.map((value, index) => {
              return (
                <div className='flex items-center justify-end mb-3' key={index}>
                  <input
                    type='text'
                    placeholder='e.g. Make coffee'
                    className={`p-2 text-[14px] outline-none focus:border-purple border-[1px] border-gray-bright rounded-md w-full ${
                      fetch.darkMode
                        ? `bg-gray-dark text-white ${
                            arrayError[index] ? 'border-red' : 'border-gray-med'
                          }`
                        : ''
                    } ${arrayError[index] && 'border-red focus:border-red'}`}
                    onChange={() => updateSubtask(index)}
                    value={value.title}
                  />
                  <img
                    src={icon6}
                    alt='delete icon'
                    className='w-4 h-4 ml-4'
                    onClick={() => deleteSubtasks(index)}
                  />
                  {arrayError[index] && (
                    <div className='absolute mr-11 text-[14px] text-red'>
                      Can't be empty
                    </div>
                  )}
                </div>
              )
            })}
          <button
            className='bg-gray-bright hover:bg-indigo-200 block w-full rounded-full mb-5 p-3 text-purple font-bold text-[14px]'
            onClick={newSubtask}
          >
            + Add New Subtask
          </button>
          <p
            className={`text-sm text-gray-light font-bold mb-2 ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            }`}
          >
            Status
          </p>

          {/* ============DROP DOWN ============ */}
          <div>
            <div className='flex items-center justify-end'>
              <input
                type='text'
                value={fetch.taskStatus}
                placeholder={fetch.currentStatus}
                readOnly
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`w-full text-[14px] border-[1px] border-gray-bright p-2 rounded-md cursor-pointer placeholder:text-black focus:border-purple outline-none ${
                  fetch.darkMode
                    ? 'bg-gray-dark border-gray-med text-white'
                    : ''
                }`}
              />
              <img
                src={icon4}
                alt='checkdown icon'
                className='w-3 h-2 absolute cursor-pointer mr-3'
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
            </div>
            {dropdownOpen && (
              <ul
                className={`relative p-3 mt-2 rounded-md ${
                  fetch.darkMode ? 'bg-black-light' : ''
                }`}
              >
                {fetch.mainBoard.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleDropdown(value.name, index)}
                      className='mb-1 text-[14px] text-gray-light cursor-pointer'
                    >
                      {value.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button
            className='mt-8 bg-purple hover:bg-purple-light w-full rounded-full p-3 text-[14px] text-linen'
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
