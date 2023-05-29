import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'

const FetchContext = createContext(null)

export const FetchProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [mainBoard, setMainBoard] = useState([])
  const [boardIndex, setBoardIndex] = useState([])
  const [columnIndex, setColumnIndex] = useState([])
  const [taskIndex, setTaskIndex] = useState([])
  const [subtaskIndex, setSubtaskIndex] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [handleSelected, setHandleSelected] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [subtaskIsCompleted, setSubtaskIsCompleted] = useState(false)
  const [subtaskToggle, setSubtaskToggle] = useState(false)
  const [subtaskData, setSubtaskData] = useState([])
  const [toggleNewBoard, setToggleNewBoard] = useState(false)
  const [name, setName] = useState('')
  const [nameArray, setNameArray] = useState(['Todo', 'Doing', 'Done'])
  const [modalDisplay, setModalDisplay] = useState(false)
  const [newBoardModalDisplay, setNewBoardModalDisplay] = useState(false)
  const [deleteBoardModalDisplay, setDeleteBoardModalDisplay] = useState(false)
  const [editBoardModalDisplay, setEditBoardModalDisplay] = useState(false)
  const [addTaskModalDisplay, setAddTaskModalDisplay] = useState(false)
  const [editTaskModalDisplay, setEditTaskModalDisplay] = useState(false)
  const [updateToggle, setUpdateToggle] = useState(false)
  const [dropStatus, setDropStatus] = useState('')

  const initUpdate = useRef(false)
  const initUpdateTasks = useRef(false)
  const initSubtaskId = useRef(false)
  const initData = useRef(false)
  const initNewBoard = useRef(false)

  const getBoards = useEffect(() => {
    fetch(`http://localhost:4000/api/boards/data/645730237aace50e6a6193b0`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.boards)
        setBoardIndex(0)
        setBoardName(data.boards[0].name)
        console.log(data.boards)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (initData.current) {
      setMainBoard(data[boardIndex].columns)
      setBoardName(data[boardIndex].name)
      setDropStatus(data[boardIndex].columns[0].name)
    } else {
      initData.current = true
    }
  }, [boardIndex])

  useEffect(() => {
    console.log(boardIndex, columnIndex, taskIndex, subtaskIndex)
  }, [boardIndex, columnIndex, taskIndex, subtaskIndex])

  const getSubtaskId = useEffect(() => {
    if (initSubtaskId.current) {
      setSubtaskIsCompleted((prev) => !prev)
    } else {
      initSubtaskId.current = true
    }
  }, [subtaskToggle])

  useEffect(() => {
    if (initUpdate.current) {
      setData((prev) => {
        const newArray = [...prev]
        newArray[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
          subtaskIndex
        ].isCompleted = subtaskIsCompleted
        return newArray
      })
      setUpdateToggle((prev) => !prev)
    } else {
      initUpdate.current = true
    }
  }, [subtaskIsCompleted])

  const postData = useEffect(() => {
    if (initUpdateTasks.current) {
      fetch(
        'http://localhost:4000/api/boards/newboard/645730237aace50e6a6193af',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            boards: data,
          }),
        }
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(data)
    } else {
      initUpdateTasks.current = true
    }
  }, [updateToggle])

  const addNewBoard = useEffect(() => {
    if (initNewBoard.current) {
      const newData = [...data]
      newData.push({
        name: name,
        columns: nameArray.map((value) => ({
          name: value,
          tasks: [],
        })),
      })
      setData(newData)
      setUpdateToggle((prev) => !prev)
    } else {
      initNewBoard.current = true
    }
  }, [toggleNewBoard])

  return (
    <FetchContext.Provider
      value={{
        setTaskTitle,
        setBoardIndex,
        taskTitle,
        taskDescription,
        setTaskDescription,
        setTaskStatus,
        taskStatus,
        setColumnIndex,
        handleSelected,
        setHandleSelected,
        boardIndex,
        setDarkMode,
        darkMode,
        setShowSidebar,
        showSidebar,
        boardName,
        setTaskIndex,
        taskIndex,
        setSubtaskIndex,
        subtaskIndex,
        data,
        setData,
        setMainBoard,
        mainBoard,
        setSubtaskToggle,
        setSubtaskData,
        subtaskData,
        setToggleNewBoard,
        setName,
        setNameArray,
        nameArray,
        modalDisplay,
        setModalDisplay,
        setNewBoardModalDisplay,
        newBoardModalDisplay,
        setDeleteBoardModalDisplay,
        deleteBoardModalDisplay,
        setUpdateToggle,
        updateToggle,
        setEditBoardModalDisplay,
        editBoardModalDisplay,
        setBoardName,
        setAddTaskModalDisplay,
        addTaskModalDisplay,
        setDropStatus,
        dropStatus,
        setSubtaskIsCompleted,
        setEditTaskModalDisplay,
        editTaskModalDisplay,
      }}
    >
      {children}
    </FetchContext.Provider>
  )
}

export const useFetch = () => {
  return useContext(FetchContext)
}
