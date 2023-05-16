import React from "react";
import { useFetch } from "../hooks/UseFetch";

export default function EditTask() {
  const fetch = useFetch()

  return (
    <>
      <div>
        <h1>Edit Task</h1>
        <p>Title</p>
        <input type="text" placeholder="e.g. Take coffee break" defaultValue="hi"/>
        <p>Description</p>
        <input
          type="text"
          placeholder="e.g. It's always good to take a break."
        />
        <p>Subtasks</p>
        <input type="text" placeholder="e.g. Make coffee"  defaultValue="hi"/>
        <input type="text" placeholder="e.g. Drink coffee & smile"  defaultValue="hi"/>
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