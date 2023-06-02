import React, { useState, useEffect, useRef } from 'react'
import { icon6 } from '../assets'
import { useFetch } from '../hooks/UseFetch'

export default function EditBoard() {
  const fetch = useFetch()
  const [indexValue, setIndexValue] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [arrayError, setArrayError] = useState(false)
  const [toggleResetValue, setToggleResetValue] = useState(false)
  const editBoardRef = useRef()

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
  }

  const editBoard = () => {
    if (
      fetch.boardName.length === 0 ||
      fetch.mainBoard
        .map((value) => value.name.length === 0)
        .filter((value) => value == true)[0]
    ) {
      if (fetch.boardName.length === 0) {
        setTitleError(true)
      } else {
        setTitleError(false)
      }
      if (
        fetch.mainBoard
          .map((value) => value.name.length === 0)
          .filter((value) => value == true)[0]
      ) {
        setArrayError(fetch.mainBoard.map((value) => value.name.length === 0))
      }
    } else {
      const newData = [...fetch.data]
      newData.splice(fetch.boardIndex, 1)
      newData.splice(fetch.boardIndex, 0, {
        name: fetch.boardName,
        columns: [...fetch.mainBoard],
      })
      fetch.setData(newData)
      fetch.setUpdateToggle((prev) => !prev)
      fetch.setEditBoardModalDisplay(false)
      setToggleResetValue((prev) => !prev)
      console.log(fetch.data)
      console.log(newData)
    }
  }

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
      editBoard()
      setToggleResetValue((prev) => !prev)
    }
  }

  useEffect(() => {
    setTitleError(false)
    setArrayError(false)
  }, [toggleResetValue])

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
          <div className='flex items-center justify-end  mb-3'>
            <input
              type='text'
              value={fetch.boardName}
              className={`p-2 border-[1px] border-gray-bright rounded-md w-full outline-none focus:border-purple ${
                titleError && 'border-red focus:border-red'
              }`}
              onChange={updateName}
            />
            {titleError && (
              <div className='absolute mr-3 text-[14px] text-red'>
                Can't be empty
              </div>
            )}
          </div>
          <p className='text-sm text-gray-light font-bold mb-2'>
            Board Columns
          </p>
          {fetch.mainBoard.map((value, index) => {
            return (
              <div
                key={index}
                className='flex items-center justify-end mb-3 cursor-pointer'
              >
                <input
                  type='text'
                  // placeholder='Enter new name'
                  className={`w-full placeholder:text-black p-2 border-[1px] border-gray-bright rounded-md outline-none focus:border-purple ${
                    arrayError[index] && 'border-red focus:border-red'
                  }`}
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
                {arrayError[index] && (
                  <div className='absolute mr-11 text-[14px] text-red'>
                    Can't be empty
                  </div>
                )}
              </div>
            )
          })}
          <button
            onClick={columnIncrement}
            className='bg-gray-bright hover:bg-indigo-200 block w-full rounded-full mb-5 p-3 text-purple font-bold text-md'
          >
            + Add New Column
          </button>
          <button
            onClick={editBoard}
            className='bg-purple hover:bg-purple-light w-full rounded-full p-3 text-md text-linen'
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}
