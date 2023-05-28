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
} from './components'

export default function App() {
  const fetch = useFetch()
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <MainBoard />
      </div>
      <div className='fixed top-0 z-20'>
        {fetch.modalDisplay && <TaskModal />}
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
    </>
  )
}
