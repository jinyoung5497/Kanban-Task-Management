import React, { useState } from 'react'
import { useFetch } from '../hooks/UseFetch'

export default function Boards() {
  const fetch = useFetch()
  const [info, setInfo] = useState('')

  const consoling = () => {
    console.log(fetch.data)
    setInfo(fetch.data)
  }

  return (
    <>
      <button onClick={consoling}>console</button>
      <div className=''>{JSON.stringify(info)}</div>
    </>
  )
}
