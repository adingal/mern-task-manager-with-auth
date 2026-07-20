import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Header from '../components/Header'
import Container from '../components/Container'
import TextInput from '../components/TextInput'
import TaskList from '../components/TaskList'
import {
  fetchTasks,
  addTaskAsync,
  editTaskAsync,
  deleteTaskAsync,
} from '../store/tasks/tasksSlice'

function UserHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: tasks, loading, error } = useSelector((state) => state.tasks)
  const { isAuthenticated } = useSelector((state) => state.user)
  const [onEditTask, setOnEditTask] = useState(null)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const handleAddTask = (task) => dispatch(addTaskAsync(task))
  const handleEditTask = (task) => dispatch(editTaskAsync(task))
  const handleDeleteTask = (id) => dispatch(deleteTaskAsync(id))

  return (
    <main>
      <Header />
      <TextInput
        onAdd={handleAddTask}
        onEdit={handleEditTask}
        setOnEditTask={setOnEditTask}
        onEditTask={onEditTask}
      />
      {loading ? (
        <Container>
          <p className="text-sm text-gray-500 text-center">Loading tasks...</p>
        </Container>
      ) : error ? (
        <Container>
          <p className="text-sm text-red-500 text-center">{error.message}</p>
        </Container>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          setOnEditTask={setOnEditTask}
        />
      )}
    </main>
  )
}

export default UserHome
