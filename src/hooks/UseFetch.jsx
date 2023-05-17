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
  const [testToggle, setTestToggle] = useState(false)
  const [subtaskToggle, setSubtaskToggle] = useState(false)

  const [updateToggle, setUpdateToggle] = useState(false)
  const initRender = useRef(false)
  const initUpdate = useRef(false)
  const initUpdateTasks = useRef(false)
  const initTest = useRef(false)
  const initBoardName = useRef(false)
  const initColumnId = useRef(false)
  const initSubtaskId = useRef(false)
  const initData = useRef(false)
  const initDataUpdate = useRef(false)

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
    } else {
      initData.current = true
    }
  }, [data, boardIndex])

  const getBoardName = useEffect(() => {
    if (initBoardName.current) {
      setBoardName(data[boardIndex].name)
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
          // console.log(data[boardIndex].columns.map((value) => value.tasks));
          // console.log(
          //   data[boardIndex].columns.map((value) =>
          //     value.tasks.map((value) => value.subtasks)
          //   )
          // )
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

  const getSubtasks = useEffect(() => {
    if (initTest.current) {
      setSubtaskTitle(
        subTaskArray[columnIndex][taskIndex].map((value, index) => (
          <p key={index}>{value.title}</p>
        ))
      )
      setSubtaskTitleArray(subTaskArray[columnIndex][taskIndex])
      setSubtaskComplete(
        subTaskArray[columnIndex][taskIndex].map((value) => value.isCompleted)
      )
      setTaskId(columnName[columnIndex].tasks[taskIndex]._id)
      setDataIsCompleted(
        data[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks
      )
      console.log(
        data[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks
      )
    } else {
      initTest.current = true
    }
  }, [taskIndex])

  const getSubtaskId = useEffect(() => {
    if (initSubtaskId.current) {
      setSubtaskId(
        columnName[columnIndex].tasks[taskIndex].subtasks[subtaskIndex]._id
      )
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
      setTestToggle((prev) => !prev)
    } else {
      initUpdate.current = true
    }
  }, [subtaskIsCompleted])

  useEffect(() => {
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
  }, [testToggle])

  const updateData = useEffect(() => {
    if (initDataUpdate.current) {
    } else {
      initDataUpdate.current = true
    }
  }, [data])

  // const updateSubtaskField = useEffect(() => {
  //   // console.log(boardId)
  //   // console.log(columnId)
  //   // console.log(taskId)
  //   // console.log(subtaskId)
  //   if (initSubtaskUpdate.current) {
  //     fetch(
  //       `http://localhost:4000/api/boards/tasks/${boardId}/${columnId}/${taskId}/${subtaskId}`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(
  //           {
  //             'boards.$[].columns.$[].tasks.$[].subtasks.$[].isCompleted': `false`,
  //           },
  //           {
  //             arrayFilters: [{ 'subtask._id': subtaskId }],
  //           }
  //         ),
  //       }
  //     )
  //       .then((res) => {
  //         return res.json()
  //       })
  //       .then((data) => {
  //         console.log(data)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   } else {
  //     initSubtaskUpdate.current = true
  //   }
  // }, [subtaskIsCompleted])

  return (
    <FetchContext.Provider
      value={{
        columnArray,
        taskArray,
        setModalDisplay,
        setTaskTitle,
        setBoardIndex,
        setUpdateToggle,
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
      }}
    >
      {children}
    </FetchContext.Provider>
  )
}

export const useFetch = () => {
  return useContext(FetchContext)
}
