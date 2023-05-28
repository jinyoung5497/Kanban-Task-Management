import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'

const FetchContext = createContext(null)

export const FetchProvider = ({ children }) => {
  const [columnArray, setColumnArray] = useState([])
  const [boardIndex, setBoardIndex] = useState([])
  const [taskArray, setTaskArray] = useState([])
  const [subTaskArray, setSubTaskArray] = useState([])
  const [modalDisplay, setModalDisplay] = useState(false)
  const [taskIndex, setTaskIndex] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [subtaskTitle, setSubtaskTitle] = useState('')
  const [columnIndex, setColumnIndex] = useState([])
  const [columnName, setColumnName] = useState([])
  const [handleSelected, setHandleSelected] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [subtaskTitleArray, setSubtaskTitleArray] = useState([])
  const [subtaskComplete, setSubtaskComplete] = useState([])
  const [boardId, setBoardId] = useState('')
  const [columnId, setColumnId] = useState('')
  const [taskId, setTaskId] = useState('')
  const [subtaskId, setSubtaskId] = useState('')
  const [subtaskIndex, setSubtaskIndex] = useState([])
  const [subtaskIsCompleted, setSubtaskIsCompleted] = useState()
  const [updateIsCompleted, setUpdateIsCompleted] = useState()
  const [data, setData] = useState([])
  const [dataIsCompleted, setDataIsCompleted] = useState([])
  const [mainBoard, setMainBoard] = useState([])
  const [subtaskToggle, setSubtaskToggle] = useState(false)
  const [subtaskData, setSubtaskData] = useState([])
  const [task, setTask] = useState([])
  const [toggleNewBoard, setToggleNewBoard] = useState(false)
  const [toggleNewColumn, setToggleNewColumn] = useState(false)
  const [name, setName] = useState('')
  const [nameArray, setNameArray] = useState(['Todo', 'Doing', 'Done'])
  const [newColumnId, setNewColumnId] = useState('')
  const [toggleColumnId, setToggleColumnId] = useState(false)
  const [newBoardModalDisplay, setNewBoardModalDisplay] = useState(false)
  const [deleteBoardModalDisplay, setDeleteBoardModalDisplay] = useState(false)
  const [editBoardModalDisplay, setEditBoardModalDisplay] = useState(false)
  const [addTaskModalDisplay, setAddTaskModalDisplay] = useState(false)
  const [updateToggle, setUpdateToggle] = useState(false)
  const [dropStatus, setDropStatus] = useState('')

  const initRender = useRef(false)
  const initUpdate = useRef(false)
  const initUpdateTasks = useRef(false)
  const initTest = useRef(false)
  const initBoardName = useRef(false)
  const initColumnId = useRef(false)
  const initSubtaskId = useRef(false)
  const initData = useRef(false)
  const initDataUpdate = useRef(false)
  const initNewBoard = useRef(false)
  const initNewColumn = useRef(false)
  const initNewColumnId = useRef(false)

  const getBoards = useEffect(() => {
    fetch(`http://localhost:4000/api/boards/data/645730237aace50e6a6193b0`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.boards)
        setBoardIndex(0)
        setBoardName(data.boards[0].name)
        setBoardId(data.boards[0]._id)
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

  const getBoardName = useEffect(() => {
    if (initBoardName.current) {
      setBoardId(data[boardIndex]._id)
    } else {
      initBoardName.current = true
    }
  }, [boardIndex])

  const getColumns = useEffect(() => {
    if (initRender.current) {
      fetch(`http://localhost:4000/api/boards/${'645730237aace50e6a6193b0'}`)
        .then((res) => res.json())
        .then((data) => {
          setColumnArray(
            data[boardIndex].columns.map((value, index) => (
              <div key={index} className='mr-2 '>
                {value.name}
              </div>
            ))
          )
          setTaskArray(data[boardIndex].columns.map((value) => value.tasks))
          setSubTaskArray(
            data[boardIndex].columns.map((value) =>
              value.tasks.map((value) => value.subtasks)
            )
          )
          setColumnName(data[boardIndex].columns)
        })
        .catch((error) => console.log(error))
    } else {
      initRender.current = true
    }
  }, [boardIndex])

  const getColumnId = useEffect(() => {
    if (initColumnId.current) {
      setColumnId(columnName[columnIndex]._id)
    } else {
      initColumnId.current = true
    }
  }, [columnIndex])

  // const getSubtasks = useEffect(() => {
  //   if (initTest.current) {
  //     setSubtaskTitle(
  //       subTaskArray[columnIndex][taskIndex].map((value, index) => (
  //         <p key={index}>{value.title}</p>
  //       ))
  //     )
  //     setSubtaskTitleArray(subTaskArray[columnIndex][taskIndex])
  //     setSubtaskComplete(
  //       subTaskArray[columnIndex][taskIndex].map((value) => value.isCompleted)
  //     )
  //     setTaskId(columnName[columnIndex].tasks[taskIndex]._id)
  //     setDataIsCompleted(
  //       data[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks
  //     )
  //     console.log(boardIndex, columnIndex, taskIndex)
  //     console.log(
  //       data[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks
  //     )
  //   } else {
  //     initTest.current = true
  //   }
  // }, [taskIndex])

  const getSubtaskId = useEffect(() => {
    if (initSubtaskId.current) {
      // setSubtaskId(
      //   columnName[columnIndex].tasks[taskIndex].subtasks[subtaskIndex]._id
      // )
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
      console.log(data)
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
    } else {
      initUpdateTasks.current = true
    }
  }, [updateToggle])

  const updateData = useEffect(() => {
    if (initDataUpdate.current) {
    } else {
      initDataUpdate.current = true
    }
  }, [data])

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
        columnArray,
        taskArray,
        setModalDisplay,
        setTaskTitle,
        setBoardIndex,
        taskTitle,
        taskDescription,
        setTaskDescription,
        setTaskStatus,
        taskStatus,
        subTaskArray,
        subtaskTitle,
        setColumnIndex,
        columnName,
        handleSelected,
        setHandleSelected,
        boardIndex,
        setDarkMode,
        darkMode,
        setShowSidebar,
        showSidebar,
        boardName,
        modalDisplay,
        subtaskTitleArray,
        subtaskComplete,
        setSubtaskComplete,
        boardId,
        setBoardId,
        columnId,
        setColumnId,
        taskId,
        setTaskId,
        subtaskId,
        setSubtaskId,
        setTaskIndex,
        taskIndex,
        setSubtaskIndex,
        subtaskIndex,
        setSubtaskIsCompleted,
        subtaskIsCompleted,
        data,
        setData,
        setUpdateIsCompleted,
        updateIsCompleted,
        dataIsCompleted,
        setDataIsCompleted,
        setMainBoard,
        mainBoard,
        setSubtaskToggle,
        setSubtaskData,
        subtaskData,
        setTask,
        task,
        setToggleNewBoard,
        setName,
        setNameArray,
        nameArray,
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
      }}
    >
      {children}
    </FetchContext.Provider>
  )
}

export const useFetch = () => {
  return useContext(FetchContext)
}
