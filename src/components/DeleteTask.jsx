import React, { useRef, useState, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function DeleteTask() {
  const fetch = useFetch()
  const deleteTaskRef = useRef()

  useEffect(() => {
    if (fetch.deleteTaskModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.deleteTaskModalDisplay])

  const handleOutsideClick = (e) => {
    if (deleteTaskRef.current && !deleteTaskRef.current.contains(e.target)) {
      fetch.setDeleteTaskModalDisplay(false)
    }
  }

  const deleteTask = () => {
    fetch.setToggleDeleteTask((prev) => !prev)
    fetch.setDeleteTaskModalDisplay(false)
  }

  return (
    <>
      <div
        className={`${
          fetch.deleteTaskModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
      >
        <div
          ref={deleteTaskRef}
          className={`${
            fetch.deleteTaskModalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg`}
        >
          <h1 className='text-lg font-extrabold mb-5 text-red'>
            Delete this task?
          </h1>
          <p className='text-md font- text-gray-light mb-8'>
            Are you sure you want to delete the {fetch.taskTitle} task and its
            subtasks? This action cannot be reversed.
          </p>
          <div className='flex'>
            <button
              className='bg-red block w-full rounded-full mr-1 p-3 text-linen  text-md'
              onClick={deleteTask}
            >
              Delete
            </button>
            <button
              className='bg-gray-bright block w-full rounded-full ml-1 p-3 text-purple font-bold text-md'
              onClick={() => fetch.setDeleteTaskModalDisplay(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
