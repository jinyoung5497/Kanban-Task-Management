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
  DeleteBoard,
  DeleteTask,
  EmptyColumn,
} from './components'

export default function App() {
  const fetch = useFetch()
  return (
    <>
      <div
        className={`${
          fetch.darkMode ? 'bg-black-light ' : 'bg-linen'
        } w-fit min-w-[100vw] h-fit min-h-[100vh]`}
      >
        <Navbar />
        <Sidebar />
        <MainBoard />
      </div>
      {fetch.mainBoard.length == 0 && (
        <div className='fixed top-0 z-10'>
          <EmptyColumn />
        </div>
      )}
      <div className='fixed top-0 z-20'>
        <TaskModal />
      </div>
      <div className='fixed top-0 z-20'>
        <AddBoard />
      </div>
      <div className='fixed top-0 z-20'>
        <DeleteBoard />
      </div>
      <div className='fixed top-0 z-20'>
        <EditBoard />
      </div>
      <div className='fixed top-0 z-20'>
        <AddTask />
      </div>
      <div className='fixed top-0 z-20'>
        <EditTask />
      </div>
      <div className='fixed top-0 z-20'>
        <DeleteTask />
      </div>
    </>
  )
}
