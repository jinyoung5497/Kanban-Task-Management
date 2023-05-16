import React from 'react'

export default function DeleteTask() {
  return (
    <div>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the {'name'} task and its subtasks? This
        action cannot be reversed.
      </p>
      <button>Delete</button>
      <button>Cancel</button>
    </div>
  )
}
