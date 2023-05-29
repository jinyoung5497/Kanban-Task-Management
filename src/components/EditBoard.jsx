import React, { useState, useEffect, useRef } from 'react'
import { icon6 } from '../assets'
import { useFetch } from '../hooks/UseFetch'

export default function EditBoard() {
  const fetch = useFetch()
  const [indexValue, setIndexValue] = useState('')
  const editBoardRef = useRef()
  const initTest = useRef(false)

  const columnIncrement = () => {
    const newArray = [...fetch.mainBoard]
    newArray.push({ name: '', tasks: [] })
    fetch.setMainBoard(newArray)
  }

  const updateName = () => {
    fetch.setBoardName(event.target.value)
  }

  const updateValue = () => {
    const newArray = [...fetch.mainBoard]
    newArray[indexValue].name = event.target.value
    fetch.setMainBoard(newArray)
    console.log(newArray)
  }

  const editBoard = () => {
    const newData = [...fetch.data]
    newData.splice(fetch.boardIndex, 1)
    newData.push({
      name: fetch.boardName,
      columns: [...fetch.mainBoard],
    })
    fetch.setData(newData)
    fetch.setUpdateToggle((prev) => !prev)
    fetch.setEditBoardModalDisplay(false)
  }

  useEffect(() => {
    console.log(fetch.data)
  }, [fetch.updateToggle])

  useEffect(() => {
    if (fetch.editBoardModalDisplay) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [fetch.editBoardModalDisplay])

  const handleOutsideClick = (e) => {
    if (editBoardRef.current && !editBoardRef.current.contains(e.target)) {
      fetch.setEditBoardModalDisplay(false)
    }
  }

  return (
    <>
      <div
        className={` ${
          fetch.editBoardModalDisplay ? 'block' : 'hidden'
        }  w-screen h-screen flex items-center justify-center bg-[#6b6b6b77]`}
      >
        <div
          className={`${
            fetch.editBoardModalDisplay ? 'block' : 'hidden'
          } bg-white w-[500px] p-8 rounded-lg`}
          ref={editBoardRef}
        >
          <h2 className='text-lg font-extrabold mb-5'>Edit Board</h2>
          <p className='text-sm text-gray-light font-bold mb-2'>Board Name</p>
          <input
            type='text'
            value={fetch.boardName}
            className='p-2 border-[1px] border-gray-bright rounded-md w-full mb-3'
            onChange={updateName}
          />
          <p className='text-sm text-gray-light font-bold mb-2'>
            Board Columns
          </p>
          {fetch.mainBoard.map((value, index) => {
            return (
              <div
                key={index}
                className='flex items-center justify-center mb-3 cursor-pointer'
              >
                <input
                  type='text'
                  // placeholder='Enter new name'
                  className='w-full placeholder:text-black p-2 border-[1px] border-gray-bright rounded-md'
                  value={value.name}
                  onMouseDown={() => {
                    setIndexValue(index)
                  }}
                  onChange={updateValue}
                />
                <img
                  src={icon6}
                  alt='cross icon'
                  onClick={() => {
                    const newArray = [...fetch.mainBoard]
                    newArray.splice(index, 1)
                    fetch.setMainBoard(newArray)
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
            onClick={editBoard}
            className='bg-purple w-full rounded-full p-3 text-md text-linen'
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
