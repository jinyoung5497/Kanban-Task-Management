import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { icon6 } from '../assets'

export default function AddBoard() {
  const fetch = useFetch()
  const [indexValue, setIndexValue] = useState('')
  const [error, setError] = useState(false)
  const [arrayError, setArrayError] = useState(false)
  const [toggleResetValue, setToggleResetValue] = useState(false)
  const newBoardRef = useRef()

  const columnIncrement = () => {
    fetch.setNameArray((prev) => [...prev, ''])
  }

  const updateValue = () => {
    const newArray = [...fetch.nameArray]
    newArray[indexValue] = event.target.value
    fetch.setNameArray(newArray)
  }

  const createNewBoard = () => {
    if (
      fetch.name.length === 0 ||
      fetch.nameArray
        .map((value) => value.length === 0)
        .filter((value) => value == true)[0]
    ) {
      if (fetch.name.length === 0) {
        console.log('no title')
        setError(true)
      } else {
        setError(false)
      }
      if (
        fetch.nameArray
          .map((value) => value.length === 0)
          .filter((value) => value == true)[0]
      ) {
        console.log('no column')
        setArrayError(fetch.nameArray.map((value) => value.length === 0))
      }
    } else {
      fetch.setToggleNewBoard((prev) => !prev)
      fetch.setNewBoardModalDisplay(false)
      setToggleResetValue((prev) => !prev)
    }
  }

  useEffect(() => {
    fetch.setName('')
    fetch.setNameArray(['Todo', 'Doing', 'Done'])
    setError(false)
    setArrayError(false)
  }, [toggleResetValue])

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
      setToggleResetValue((prev) => !prev)
    }
  }

  return (
    <>
      <div
        className={` ${
          fetch.newBoardModalDisplay ? 'block' : 'hidden'
        } w-screen h-screen flex items-center justify-center ${
          fetch.darkMode ? 'bg-[#2c2c2c77]' : 'bg-[#6b6b6b77]'
        }`}
      >
        <div
          className={`${fetch.newBoardModalDisplay ? 'block' : 'hidden'} ${
            fetch.darkMode ? 'bg-gray-dark' : 'bg-white'
          } w-[500px] p-8 rounded-lg`}
          ref={newBoardRef}
        >
          <h2
            className={`text-lg font-extrabold mb-5 ${
              fetch.darkMode ? 'text-white' : 'text-black'
            }`}
          >
            Add New Board
          </h2>
          <p
            className={`text-sm ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            } font-bold mb-2`}
          >
            Name
          </p>
          <div className='flex items-center justify-end mb-3'>
            <input
              type='text'
              placeholder='e.g. Web Design'
              className={`p-2 border-[1px] border-gray-bright outline-none rounded-md w-full focus:border-purple text-[14px] ${
                fetch.darkMode
                  ? `bg-gray-dark text-white ${
                      error ? 'border-red' : 'border-gray-med'
                    }`
                  : ''
              } ${error && 'border-red focus:border-red'}`}
              value={fetch.name}
              onChange={() => fetch.setName(event.target.value)}
            />
            {error && (
              <div className='absolute mr-3 text-[14px] text-red'>
                Can't be empty
              </div>
            )}
          </div>
          <p
            className={`text-sm ${
              fetch.darkMode ? 'text-white' : 'text-gray-light'
            } font-bold mb-2`}
          >
            Columns
          </p>
          {fetch.nameArray.map((value, index) => {
            return (
              <div
                key={index}
                className='flex items-center justify-end mb-3 cursor-pointer'
              >
                <input
                  type='text'
                  placeholder='Enter new name'
                  className={`w-full ${
                    fetch.darkMode
                      ? `bg-gray-dark text-white ${
                          arrayError[index] ? 'border-red' : 'border-gray-med'
                        }`
                      : 'border-gray-bright'
                  } p-2 border-[1px]  outline-none rounded-md focus:border-purple text-[14px] ${
                    arrayError[index] && 'border-red focus:border-red'
                  }`}
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
            className='bg-gray-bright hover:bg-indigo-200 block w-full rounded-full my-5 p-3 text-purple font-bold text-md'
          >
            + Add New Column
          </button>
          <button
            onClick={createNewBoard}
            className='bg-purple hover:bg-purple-light w-full rounded-full p-3 text-md text-linen'
          >
            Create New Board
          </button>
        </div>
      </div>
    </>
  )
}
