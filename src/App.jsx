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
        <div className='fixed w-full'>
          <Navbar />
        </div>
        <section className='flex'>
          <Sidebar />
          <MainBoard />
        </section>
      </div>
      <div className='fixed top-0'>{fetch.modalDisplay && <TaskModal />}</div>
      <div className='fixed top-0'>
        <AddBoard />
      </div>
      <div className='fixed top-0'>
        <DeleteBoard />
      </div>
    </>
  )
}
