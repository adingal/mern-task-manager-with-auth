import React from 'react'
import { editTask } from '../utils/taskUtils'
import Container from './Container'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'

function TaskList({ tasks, setTasks, setOnEditTask, onDelete }) {
  const handleToggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed }
    editTask(task._id, updatedTask)
    setTasks((prev) => prev.map((t) => (t._id === task._id ? updatedTask : t)))
  }

  return (
    <section>
      <Container>
        {tasks && tasks.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {tasks.map((item) => (
              <li className="cursor-pointer" key={item._id}>
                <span className="w-full flex flex-row gap-2">
                  <span className="flex flex-row gap-2">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleComplete(item)}
                    />
                    <span
                      className={`text-base text-gray-700 ${item.completed ? 'line-through' : ''}`}
                    >
                      {item.title}
                    </span>
                  </span>
                  <span className="flex flex-row gap-2 ml-auto">
                    <button
                      onClick={() => setOnEditTask(item)}
                      className="bg-green-400 py-1 px-2 rounded-md cursor-pointer"
                    >
                      <img className="h-4" src={editIcon} alt="Edit" />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="bg-red-400 py-1 px-2 rounded-md cursor-pointer"
                    >
                      <img className="h-4" src={deleteIcon} alt="Delete" />
                    </button>
                  </span>
                </span>
                <span className="text-sm text-gray-500 pl-5">
                  - <span>{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No task added for today.
          </p>
        )}
      </Container>
    </section>
  )
}

export default TaskList
