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
  const [columnIndex, setColumnIndex] = useState('')
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
  const [deleteTaskModalDisplay, setDeleteTaskModalDisplay] = useState(false)
  const [updateToggle, setUpdateToggle] = useState(false)
  const [dropStatus, setDropStatus] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [changeStatus, setChangeStatus] = useState(false)
  const [checkStatus, setCheckStatus] = useState(false)
  const [statusIndex, setStatusIndex] = useState('')
  const [toggleEditTask, setToggleEditTask] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subtasksArray, setSubtasksArray] = useState([])
  const [toggleDeleteTask, setToggleDeleteTask] = useState(false)

  const initUpdate = useRef(false)
  const initUpdateTasks = useRef(false)
  const initSubtaskId = useRef(false)
  const initData = useRef(false)
  const initNewBoard = useRef(false)
  const initTask = useRef(false)
  const initTaskStatus = useRef(false)
  const initEditTask = useRef(false)
  const initDeleteTask = useRef(false)

  //* ================= Get Data from server =============

  const getBoards = useEffect(() => {
    fetch(`http://localhost:4000/api/boards/data/645730237aace50e6a6193b0`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.boards)
        setBoardIndex(0)
        setBoardName(data.boards[0].name)
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

  //* ================= Test index =============

  useEffect(() => {
    console.log(boardIndex, columnIndex, taskIndex, subtaskIndex)
  }, [boardIndex, columnIndex, taskIndex, subtaskIndex])

  //* ================= Task Status =============

  const getTaskStatus = useEffect(() => {
    if (initTaskStatus.current) {
      setCurrentStatus(
        data[boardIndex].columns[columnIndex].tasks[taskIndex].status
      )
      console.log(
        'currentStatus:',
        data[boardIndex].columns[columnIndex].tasks[taskIndex].status
      )
    } else {
      initTaskStatus.current = true
    }
  }, [checkStatus, changeStatus])

  const updateTaskStatus = useEffect(() => {
    if (initTask.current) {
      const newArray = [...data]
      newArray[boardIndex].columns[columnIndex].tasks[taskIndex].status =
        taskStatus
      const movedArray = newArray[boardIndex].columns[columnIndex].tasks.splice(
        taskIndex,
        1
      )
      newArray[boardIndex].columns[statusIndex].tasks.push(...movedArray)
      setData(newArray)
      setUpdateToggle((prev) => !prev)
      setColumnIndex(statusIndex)
      setTaskIndex(newArray[boardIndex].columns[statusIndex].tasks.length - 1)
    } else {
      initTask.current = true
    }
  }, [changeStatus])

  //* ================= Edit Tasks =============

  const editTasks = useEffect(() => {
    if (initEditTask.current) {
      const newData = [...data]
      newData[boardIndex].columns[columnIndex].tasks[taskIndex].title =
        taskTitle
      newData[boardIndex].columns[columnIndex].tasks[taskIndex].description =
        taskDescription
      newData[boardIndex].columns[columnIndex].tasks[taskIndex].status =
        taskStatus
      newData[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks =
        subtasksArray.map((value) => ({
          title: value.title,
          isCompleted: value.isCompleted,
        }))
      setData(newData)
      setUpdateToggle((prev) => !prev)
    } else {
      initEditTask.current = true
    }
  }, [toggleEditTask])

  //* ================= Delete Task =============
  const deleteTask = useEffect(() => {
    if (initDeleteTask.current) {
      const newArray = [...data]
      newArray[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1)
      setData(newArray)
      setUpdateToggle((prev) => !prev)
    } else {
      initDeleteTask.current = true
    }
  }, [toggleDeleteTask])

  //* ================= Subtask IsCompleted =============

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

  //* ================= Update data to server =============

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

  //* ================= Add New Board =============

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
        setChangeStatus,
        currentStatus,
        setCheckStatus,
        setStatusIndex,
        setToggleEditTask,
        setTitle,
        title,
        setDescription,
        description,
        setSubtasksArray,
        subtasksArray,
        setDeleteTaskModalDisplay,
        deleteTaskModalDisplay,
        setToggleDeleteTask,
      }}
    >
      {children}
    </FetchContext.Provider>
  )
}

export const useFetch = () => {
  return useContext(FetchContext)
}
