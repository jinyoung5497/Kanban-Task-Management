import React, { useState } from 'react'
import { useFetch } from '../hooks/UseFetch'
import {
  icon1,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  BoardIcon,
  EyeHide,
} from '../assets'

export default function Sidebar() {
  const fetch = useFetch()
  const [hoverState, setHoverState] = useState(false)
  const [hideSidebarColour, setHideSidebarColour] = useState('#828FA3')

  const handleClickBoard = (index) => {
    fetch.setBoardIndex(index)
  }

  const hideSidebar = () => {
    fetch.setShowSidebar((prev) => !prev)
  }

  const toggleDarkMode = () => {
    fetch.setDarkMode((prev) => !prev)
  }

  const hoverEffect = (index) => {
    index == fetch.boardIndex && setHoverState(true)
  }

  const hoverEffectOff = (index) => {
    index == fetch.boardIndex && setHoverState(false)
  }

  const createBoard = () => {
    fetch.setNewBoardModalDisplay(true)
  }

  return (
    <>
      <div
        className={`z-20 fixed top-0 w-[300px] bg-white h-screen flex flex-col border-r-[1px] border-gray-bright transform transition duration-500 ease-in-out ${
          fetch.showSidebar ? '-translate-x-96' : '-translate-x-0'
        }`}
      >
        <div className='flex flex-col'>
          <img src={icon12} alt='logo' className='mb-14 w-40 m-8' />
          <div className='text-gray-light text-sm font-bold tracking-[3px] mx-8 mb-5'>
            ALL BOARDS ({fetch.data.length})
          </div>
          {fetch.data.map((value, index) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center text-md font-bold text-gray-light p-3 mb-1 mr-5 hover:bg-gray-bright hover:rounded-r-full hover:text-purple ${
                fetch.boardIndex == index &&
                `bg-purple rounded-r-full text-white`
              }`}
              onClick={() => handleClickBoard(index)}
              onMouseEnter={() => hoverEffect(index)}
              onMouseLeave={() => hoverEffectOff(index)}
            >
              <div className='w-4 h-4 mx-5'>
                <BoardIcon
                  colour={
                    hoverState
                      ? fetch.boardIndex == index
                        ? '#635FC7'
                        : '#828FA3'
                      : fetch.boardIndex == index
                      ? '#FFFFFF'
                      : '#828FA3'
                  }
                />
              </div>
              <div key={value._id} className=''>
                {value.name}
              </div>
            </div>
          ))}
        </div>
        <div
          className='flex items-center mt-2 mx-8 cursor-pointer'
          onClick={createBoard}
        >
          <div className='w-4 h-4 mr-4'>
            <BoardIcon colour={'#635FC7'} />
          </div>
          <div className='font-bold text-purple text-md hover:text-purple-light'>
            + Create New Board
          </div>
        </div>

        <div className='mx-2 mt-auto mb-10'>
          {/* --------DARK MODE TOGGLE------- */}
          <div className='flex items-center bg-linen p-3 place-content-around rounded-md px-14 w-full mb-3'>
            <img src={icon9} alt='icon light' />
            <div
              className={`w-10 h-5 bg-purple rounded-full flex items-center cursor-pointer hover:bg-purple-light ${
                fetch.darkMode && 'justify-end'
              }`}
              onClick={toggleDarkMode}
            >
              <section className='w-[14px] h-[14px] bg-white rounded-full mx-1 '></section>
            </div>
            <img src={icon7} alt='icon night' />
          </div>

          {/* ---------HIDE SIDEBAR TOGGLE--------- */}
          <div
            className='flex items-center ml-0 cursor-pointer rounded-r-full mr-5 w-full hover:bg-gray-100 hover:text-purple text-gray-light'
            onClick={hideSidebar}
            onMouseEnter={() => setHideSidebarColour('#635FC7')}
            onMouseLeave={() => setHideSidebarColour('#828FA3')}
          >
            <div className='mx-6'>
              <EyeHide colour={hideSidebarColour} />
            </div>
            <p className=' font-bold text-md my-4 '>Hide Sidebar</p>
          </div>
        </div>
      </div>

      {/* --------HIDE SIDEBAR TOGGLE--------- */}
      <div
        className={`bg-purple z-50 h-fit cursor-pointer w-fit p-5 pr-7 rounded-r-full fixed bottom-20 transform transition duration-500 ease-in-out ${
          fetch.showSidebar ? 'translate-x-0' : '-translate-x-20'
        }`}
        onClick={hideSidebar}
      >
        <img src={icon10} alt='icon eye' />
      </div>
    </>
  )
}
