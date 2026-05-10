import { useEffect, useState } from 'react'
import './App.css'
import Container from './components/Container'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'

import { addTask, editTask, deleteTask } from './utils/taskUtils'

function App() {
  const [tasks, setTasks] = useState([])
  const [onEditTask, setOnEditTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/v1/tasks`)
        const { data } = await res.json()
        setTasks(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleAddTask = async (task) => {
    try {
      const res = await addTask(task)
      setTasks((prev) => [...prev, res])
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditTask = async (task) => {
    try {
      const { _id, title, description, completed } = task
      const updatedTask = await editTask(_id, { title, description, completed })
      setTasks((prev) => prev.map((t) => (t._id === _id ? updatedTask : t)))
      setOnEditTask(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <header className="bg-black mb-4">
        <Container>
          <p className="text-xl md:text-2xl lg:text-3xl text-center text-gray-200">
            Task Manager App
          </p>
        </Container>
      </header>
      <TextInput
        onAdd={handleAddTask}
        onEdit={handleEditTask}
        onEditTask={onEditTask}
      />
      {isLoading ? (
        <Container>
          <p className="text-sm text-gray-500 text-center">Loading tasks...</p>
        </Container>
      ) : (
        <TaskList
          tasks={tasks}
          setOnEditTask={setOnEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  )
}

export default App
