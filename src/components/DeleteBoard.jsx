import React from 'react'

export default function DeleteBoard() {
  return (
    <div>
      <div>
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the {'name'} board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}
