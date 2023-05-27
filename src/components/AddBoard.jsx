import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon6 } from '../assets'

export default function AddBoard() {
  const fetch = useFetch()
  const [indexValue, setIndexValue] = useState('')
  const newBoardRef = useRef()

  const columnIncrement = () => {
    fetch.setNameArray((prev) => [...prev, ''])
  }

  const updateName = () => {
    fetch.setName(event.target.value)
  }

  const updateValue = () => {
    const newArray = [...fetch.nameArray]
    newArray[indexValue] = event.target.value
    fetch.setNameArray(newArray)
  }

  const createNewBoard = () => {
    console.log(fetch.name)
    console.log(fetch.nameArray)
    // console.log(fetch.data)
    fetch.setToggleNewBoard((prev) => !prev)
  }

  useEffect(() => {
    if (fetch.newBoardModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.newBoardModalDisplay])

  const handleOutsideClick = (e) => {
    if (newBoardRef.current && !newBoardRef.current.contains(e.target)) {
      fetch.setNewBoardModalDisplay(false)
    }
  }

  return (
    <>
      <div
        className={` ${
          fetch.newBoardModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
      >
        <div
          className={`${
            fetch.newBoardModalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg`}
          ref={newBoardRef}
        >
          <h2 className='text-lg font-extrabold mb-5'>Add New Board</h2>
          <p className='text-sm text-gray-light font-bold mb-2'>Name</p>
          <input
            type='text'
            placeholder='e.g. Web Design'
            className='p-2 border-[1px] border-gray-bright rounded-md w-full mb-3'
            onChange={updateName}
          />
          <p className='text-sm text-gray-light font-bold mb-2'>Columns</p>
          {fetch.nameArray.map((value, index) => {
            return (
              <div
                key={index}
                className='flex items-center justify-center mb-3 cursor-pointer'
              >
                <input
                  type='text'
                  // placeholder='Enter new name'
                  className='w-full placeholder:text-black p-2 border-[1px] border-gray-bright rounded-md'
                  value={value}
                  onMouseDown={() => {
                    setIndexValue(index)
                  }}
                  onChange={updateValue}
                />
                <img
                  src={icon6}
                  alt='cross icon'
                  onClick={() => {
                    const newArray = [...fetch.nameArray]
                    newArray.splice(index, 1)
                    fetch.setNameArray(newArray)
                  }}
                  className='ml-4'
                />
              </div>
            )
          })}
          <button
            onClick={columnIncrement}
            className='bg-gray-bright block w-full rounded-full mb-5 p-3 text-purple font-bold text-md'
          >
            + Add New Column
          </button>
          <button
            onClick={createNewBoard}
            className='bg-purple w-full rounded-full p-3 text-md text-linen'
          >
            Create New Board
          </button>
        </div>
      </div>
    </>
  )
}
