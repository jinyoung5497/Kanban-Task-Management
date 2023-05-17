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
  }

  const handleColumnIndex = (index) => {
    fetch.setColumnIndex(index)
  }

  const editBoard = () => {}

  return (
    <>
      <div className='h-screen z-30'>
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
                  {value.name.toUpperCase()} ({value.tasks.length})
                </div>
                <div className=''>
                  {value.tasks.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className='bg-white m-4 p-5 rounded-xl drop-shadow-md cursor-pointer hover:text-purple'
                        onClick={() => getTasks(value, index)}
                      >
                        <div className='font-bold mb-2'>{value.title}</div>
                        <p className='text-sm text-gray-light'>
                          {
                            value.subtasks.filter(
                              (value) => value.isCompleted == true
                            ).length
                          }{' '}
                          out of {value.subtasks.length} subtasks
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div
            className='w-[350px] h-11/12 bg-gray-bright rounded-xl flex items-center justify-center text-gray-light font-bold text-xl ml-5 my-10 cursor-pointer hover:text-purple'
            onClick={editBoard}
          >
            + New Column
          </div>
        </div>
      </div>
    </>
  )
}
