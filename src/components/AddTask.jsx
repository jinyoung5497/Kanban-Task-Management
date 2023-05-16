import React from "react";
import { useFetch } from "../hooks/UseFetch";

export default function AddTask() {
  const fetch = useFetch()

  return (
    <>
      <div>
        <h1>Add New Task</h1>
        <p>Title</p>
        <input type="text" placeholder="e.g. Take coffee break" />
        <p>Description</p>
        <input
          type="text"
          placeholder="e.g. It's always good to take a break."
        />
        <p>Subtasks</p>
        <input type="text" placeholder="e.g. Make coffee" />
        <input type="text" placeholder="e.g. Drink coffee & smile" />
        <button>+ Add New Subtask</button>
        <p>Status</p>
        <select>
          {fetch.columnName.map((value, index) => (
            <option
              key={index}
              value={value.name}
              onChange={(event) => handleChange()}
            >
              {value.name}
            </option>
          ))}
        </select>
        <button>Create Task</button>
      </div>
    </>
  );
}
