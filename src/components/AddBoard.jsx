import React, { useState, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function AddBoard() {
  const fetch = useFetch()
  const [columnCount, setColumnCount] = useState(0)
  const [columnArray, setColumnArray] = useState([...Array(0)])
  const [columnName, setColumnName] = useState('')
  const [columnNameArray, setColumnNameArray] = useState([])

  const deleteBoard = (index) => {
    setColumnArray((value) => value.filter((_, i) => i !== index))
  }

  const columnIncrement = () => {
    setColumnCount((prev) => prev + 1)
  }

  useEffect(() => {
    setColumnArray([...columnArray, columnCount])
  }, [columnCount])

  const storeColumnName = (event) => {
    setColumnName(event.target.value)
    setColumnNameArray((prev) => [...prev, event.target.value])
  }

  const createNewBoard = () => {
    console.log(columnNameArray)
  }

  return (
    <>
      <div>
        <h2>Add New Board</h2>
        <p>Name</p>
        <input type='text' placeholder='e.g. Web Design' />
        <p>Columns</p>
        {columnArray.map((value, index) => {
          return (
            <div key={index}>
              <input
                type='text'
                placeholder='Enter new name'
                onChange={() => storeColumnName(event)}
              />
              <button onClick={() => deleteBoard(index)}>X</button>
            </div>
          )
        })}
        <button onClick={columnIncrement}>+ Add New Column</button>
        <button onClick={createNewBoard}>Create New Board</button>
      </div>
    </>
  )
}
