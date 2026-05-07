import { useEffect, useState } from 'react'
import './App.css'
import Container from './components/Container'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'

import { addTask } from './utils/taskUtils'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/v1/tasks`)
        const { data } = await res.json()
        setTasks(data)
      } catch (error) {
        console.error(error)
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

  return (
    <main>
      <header className="bg-black mb-4">
        <Container>
          <p className="text-xl md:text-2xl lg:text-3xl text-center text-gray-200">
            Task Manager App
          </p>
        </Container>
      </header>
      <TextInput onAdd={handleAddTask} />
      <TaskList tasks={tasks} />
    </main>
  )
}

export default App
