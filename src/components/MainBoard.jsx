import React from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function MainBoard() {
  const fetch = useFetch()

  const getTasks = (value, index) => {
    fetch.setModalDisplay(true)
    fetch.setTaskIndex(index)
    fetch.setTaskTitle(value.title)
    fetch.setTaskDescription(value.description)
    fetch.setTaskStatus(value.status)
    fetch.setSubtaskData(value.subtasks)
    fetch.setCheckStatus((prev) => !prev)
    console.log('currentStatus:', fetch.currentStatus)
    console.log('taskStatus:', value.status)
  }

  const handleColumnIndex = (index) => {
    fetch.setColumnIndex(index)
  }

  const editBoard = () => {
    fetch.setEditBoardModalDisplay(true)
  }

  return (
    <>
      <div
        className={`-z-10 mt-[101px] h-screen w-full transform transition duration-500 ease-in-out ${
          fetch.showSidebar ? '-translate-x-0' : 'translate-x-[300px]'
        }`}
      >
        <div className={`w-full h-full px-10 pt-5 bg-linen flex`}>
          {fetch.mainBoard.map((value, index) => {
            return (
              <div
                key={index}
                className={`w-[350px]`}
                onClick={() => handleColumnIndex(index)}
              >
                <div className='ml-4 flex items-center text-gray-light text-sm font-bold tracking-[2px]'>
                  <section className='w-4 h-4 bg-teal-400 rounded-full mr-2'></section>
                  {value.name && value.name.toUpperCase()} (
                  {value.tasks ? value.tasks.length : 0})
                </div>
                <div className=''>
                  {value.tasks
                    ? value.tasks.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className='bg-white m-4 p-5 rounded-xl drop-shadow-md cursor-pointer hover:text-purple'
                            onClick={() => getTasks(value, index)}
                          >
                            <div className='font-bold mb-2'>{value.title}</div>
                            <p className='text-sm text-gray-light'>
                              {value.subtasks
                                ? value.subtasks.filter(
                                    (value) => value.isCompleted == true
                                  ).length
                                : null}{' '}
                              out of {value.subtasks.length} subtasks
                            </p>
                          </div>
                        )
                      })
                    : null}
                </div>
              </div>
            )
          })}
          {fetch.mainBoard.length == 0 ? (
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <p className='text-lg text-gray-light font-bold mb-8'>
                This board is empty. Create a new column to get started.
              </p>
              <button
                className=' bg-purple p-3 px-5 text-white rounded-full hover:bg-purple-light'
                onClick={editBoard}
              >
                + Add New Column
              </button>
            </div>
          ) : (
            <div
              className='w-[350px] h-11/12 bg-gray-bright rounded-xl flex items-center justify-center text-gray-light font-bold text-xl ml-5 my-10 cursor-pointer hover:text-purple'
              onClick={editBoard}
            >
              + New Column
            </div>
          )}
        </div>
      </div>
    </>
  )
}
