import React from 'react'
import Container from './Container'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'

function TaskList() {
  return (
    <section>
      <Container>
        <ul className="flex flex-col gap-4">
          <li className="cursor-pointer">
            <span className="w-full flex flex-row gap-2">
              <span className="flex flex-row gap-2">
                <input type="checkbox" />
                <span className="text-base text-gray-700">Task 1</span>
              </span>
              <span className="flex flex-row gap-2 ml-auto">
                <button className="bg-green-400 py-1 px-2 rounded-md cursor-pointer">
                  <img className="h-4" src={editIcon} alt="Edit" />
                </button>
                <button className="bg-red-400 py-1 px-2 rounded-md cursor-pointer">
                  <img className="h-4" src={deleteIcon} alt="Delete" />
                </button>
              </span>
            </span>
            <span className="text-sm text-gray-500 pl-5">
              - <span>Some task 1 description</span>
            </span>
          </li>
          <li className="cursor-pointer">
            <span className="w-full flex flex-row gap-2">
              <span className="flex flex-row gap-2">
                <input type="checkbox" />
                <span className="text-base text-gray-700">Task 2</span>
              </span>
              <span className="flex flex-row gap-2 ml-auto">
                <button className="bg-green-400 py-1 px-2 rounded-md cursor-pointer">
                  <img className="h-4" src={editIcon} alt="Edit" />
                </button>
                <button className="bg-red-400 py-1 px-2 rounded-md cursor-pointer">
                  <img className="h-4" src={deleteIcon} alt="Delete" />
                </button>
              </span>
            </span>
            <span className="text-sm text-gray-500 pl-5">
              - <span>Some task 2 description</span>
            </span>
          </li>
        </ul>
      </Container>
    </section>
  )
}

export default TaskList
