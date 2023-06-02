import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon4, icon6 } from '../assets'

export default function AddTask() {
  const fetch = useFetch()
  const addTaskRef = useRef()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subtasksArray, setSubtasksArray] = useState([])
  const [subtaskIndex, setSubtaskIndex] = useState(0)
  const [arrayError, setArrayError] = useState([false])
  const [error, setError] = useState(false)

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
      fetch.setToggleResetValue((prev) => !prev)
      setError(false)
      setArrayError([false])
    }
  }

  const handleDropdown = (name, index) => {
    setDropdownOpen(false)
    fetch.setDropStatus(name)
    console.log(fetch.taskStatus)
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

  const validateTask = () => {
    if (
      title.length === 0 ||
      subtasksArray
        .map((value) => value.length === 0)
        .filter((value) => value == true)[0]
    ) {
      if (title.length === 0) {
        setError(true)
      } else {
        setError(false)
      }
      if (
        subtasksArray
          .map((value) => value.length === 0)
          .filter((value) => value == true)[0]
      ) {
        setArrayError(subtasksArray.map((value) => value.length === 0))
      }
    } else {
      createTask()
    }
  }

  const createTask = () => {
    const newData = [...fetch.data]
    newData[fetch.boardIndex].columns[subtaskIndex].tasks.push({
      title: title,
      description: description,
      status: fetch.dropStatus,
      subtasks: subtasksArray.map((value) => ({
        title: value,
        isCompleted: false,
      })),
    })
    // subtasksArray.map((value) =>
    //   value.length === 0
    //     ? setArrayError((prev) => [...prev], 'true')
    //     : setArrayError((prev) => [...prev], 'false')
    // )

    fetch.setData(newData)
    fetch.setAddTaskModalDisplay(false)
    fetch.setUpdateToggle((prev) => !prev)
  }

  useEffect(() => {
    setTitle('')
    setDescription('')
    setSubtasksArray([])
    setSubtaskIndex(0)
    setError(false)
    setArrayError([])
  }, [fetch.toggleResetValue])

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
          <div className='flex items-center justify-end mb-3'>
            <input
              type='text'
              placeholder='e.g. Take coffee break'
              value={title}
              className={`p-2 border-[1px] border-gray-bright text-[14px] rounded-md w-full  outline-none focus:border-purple ${
                error && 'border-red focus:border-red'
              }`}
              onChange={() => setTitle(event.target.value)}
            />
            {error && (
              <div className='absolute mr-3 text-red text-[14px]'>
                Can't be empty
              </div>
            )}
          </div>
          {/* DESCRIPTION */}
          <p className='text-sm text-gray-light font-bold mb-2'>Description</p>
          <textarea
            type='text'
            placeholder="e.g. It's always good to take a break."
            value={description}
            className='p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full mb-3 h-32 break-all align-top flex items-start justify-start flex-wrap outline-none focus:border-purple'
            onChange={() => setDescription(event.target.value)}
          />
          {/* SUBTASKS */}
          <p className='text-sm text-gray-light font-bold mb-2'>Subtasks</p>
          {/* SUBTASKS INPUT */}
          {subtasksArray &&
            subtasksArray.map((value, index) => {
              return (
                <div className='flex items-center justify-end mb-3' key={index}>
                  <input
                    type='text'
                    placeholder='e.g. Make coffee'
                    className={`p-2 text-[14px] border-[1px] border-gray-bright rounded-md w-full outline-none focus:border-purple ${
                      arrayError[index] ? 'border-red focus:border-red' : ''
                    }`}
                    onChange={() => updateSubtask(index)}
                    value={value}
                    id={`subtask`}
                  />
                  {arrayError[index] ? (
                    <div className='text-red text-[14px] absolute mr-11'>
                      Can't be empty
                    </div>
                  ) : (
                    ''
                  )}
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
            className='bg-gray-bright block w-full rounded-full mb-5 p-3 text-purple font-bold text-[14px] hover:bg-indigo-200'
            onClick={newSubtask}
          >
            + Add New Subtask
          </button>
          <p className='text-sm text-gray-light font-bold mb-2'>Status</p>

          {/* ============ STATUS DROP DOWN ============ */}
          <div>
            <div className='w-full flex items-center justify-center'>
              <input
                type='text'
                value={fetch.dropStatus}
                readOnly
                onClick={() => setDropdownOpen((prev) => !prev)}
                className='w-full text-[14px] border-[1px] border-gray-bright p-2 rounded-md outline-none focus:border-purple'
              />
              <img
                src={icon4}
                alt='checkdown icon'
                className='w-3 h-2 relative right-8'
              />
            </div>
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
            className='relative mt-8 bg-purple w-full rounded-full p-3 text-[14px] text-linen hover:bg-purple-light'
            onClick={validateTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </>
  )
}
