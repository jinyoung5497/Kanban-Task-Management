import React from 'react'
import { useFetch } from './hooks/UseFetch'
import {
  Navbar,
  Sidebar,
  MainBoard,
  TaskModal,
  AddTask,
  EditTask,
  AddBoard,
  EditBoard,
  BoardUpdate,
} from './components'

export default function App() {
  const fetch = useFetch()
  return (
    <>
      <div className='grid grid-cols-5'>
        <div className='col-start-1 row-start-1 col-span-5'>
          <Navbar />
          <div
            className={`transform transition duration-500 ease-in-out z-20 ${
              fetch.showSidebar ? 'translate-x-0' : 'translate-x-[300px]'
            }`}
          >
            <MainBoard />
          </div>
        </div>
        <div
          className={`col-start-1 row-start-1 transform transition duration-500 ease-in-out z-0 ${
            fetch.showSidebar ? '-translate-x-96' : 'translate-x-0'
          }`}
        >
          <Sidebar />
        </div>
      </div>
      <div className='absolute top-0 '>
        {fetch.modalDisplay && <TaskModal />}
      </div>
      <BoardUpdate />
      {/* <AddTask />
      <EditTask />
      <AddBoard />
      <EditBoard /> */}
    </>
  )
}
