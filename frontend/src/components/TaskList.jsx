import React from 'react'
import { useDispatch } from 'react-redux'
import Container from './Container'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import { editTaskAsync, deleteTaskAsync } from '../store/tasks/tasksSlice'

function TaskList({ tasks, setOnEditTask }) {
  const dispatch = useDispatch()

  const handleToggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed }
    dispatch(editTaskAsync(updatedTask))
  }

  const handleDelete = (id) => {
    dispatch(deleteTaskAsync(id))
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
                      className={`text-base text-gray-600 ${
                        item.completed ? 'line-through' : ''
                      }`}
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
                      onClick={() => handleDelete(item._id)}
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
