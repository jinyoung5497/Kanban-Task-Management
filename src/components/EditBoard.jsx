import React from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function EditBoard() {
  const fetch = useFetch()

  const deleteBoard = (index) => {
    console.log(index)
  }

  return (
    <div>
      <h1>Edit Board</h1>
      <p>Board Name</p>
      <input type='text' defaultValue={'Platform Launch'} />
      <p>Board Columns</p>
      {fetch.columnName.map((value, index) => {
        return (
          <div key={index}>
            <input type='text' defaultValue={value.name} />
            <button onClick={() => deleteBoard(index)}>X</button>
          </div>
        )
      })}
    </div>
  )
}
