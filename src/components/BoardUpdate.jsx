import React from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function Boards() {
  const fetch = useFetch()

  const handleClick = () => {
    fetch.data[0].name = 'real'
  }

  const consoling = () => {
    console.log(fetch.data)
  }

  return (
    <>
      <button onClick={handleClick}>update</button>
      <button onClick={consoling}>console</button>
    </>
  )
}
