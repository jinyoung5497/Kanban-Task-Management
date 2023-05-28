import React, { useRef, useState, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function DeleteBoard() {
  const fetch = useFetch()
  const deleteBoardRef = useRef()

  useEffect(() => {
    if (fetch.deleteBoardModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.deleteBoardModalDisplay])

  const handleOutsideClick = (e) => {
    if (deleteBoardRef.current && !deleteBoardRef.current.contains(e.target)) {
      fetch.setDeleteBoardModalDisplay(false)
    }
  }

  const deleteBoard = () => {
    fetch.setDeleteBoardModalDisplay(false)
    const newData = [...fetch.data]
    newData.splice(fetch.boardIndex, 1)
    fetch.setData(newData)
    fetch.setBoardIndex(0)
    fetch.setUpdateToggle((prev) => !prev)
  }

  return (
    <div
      className={`${
        fetch.deleteBoardModalDisplay ? 'block' : 'hidden'
      } w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
    >
      <div
        ref={deleteBoardRef}
        className={`${
          fetch.deleteBoardModalDisplay ? 'block' : 'hidden'
        } bg-white w-[500px] p-8 rounded-lg`}
      >
        <h1 className='text-lg font-extrabold mb-5 text-red'>
          Delete this board?
        </h1>
        <p className='text-md font- text-gray-light mb-8'>
          Are you sure you want to delete the {'name'} board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
        <div className='flex'>
          <button
            className='bg-red block w-full rounded-full mr-1 p-3 text-linen  text-md'
            onClick={deleteBoard}
          >
            Delete
          </button>
          <button
            className='bg-gray-bright block w-full rounded-full ml-1 p-3 text-purple font-bold text-md'
            onClick={() => fetch.setDeleteBoardModalDisplay(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
