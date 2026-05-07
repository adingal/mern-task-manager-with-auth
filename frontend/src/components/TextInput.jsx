import React, { useEffect, useState } from 'react'
import Container from './Container'

const initialFormData = {
  title: '',
  description: '',
}

function TextInput({ onAdd, onEdit, onEditTask }) {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (onEditTask) {
      setFormData({
        ...onEditTask,
      })
    }
  }, [onEditTask])

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (!onEditTask) {
      onAdd(formData)
    } else {
      onEdit(formData)
    }
    setFormData(initialFormData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section>
      <Container>
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <input
                onChange={handleInputChange}
                className="w-full bg-gray-200 p-3 rounded-l-md"
                type="text"
                name="title"
                value={formData.title}
              />
              <button
                className="bg-gray-400 py-2 px-4 rounded-r-md cursor-pointer hover:bg-gray-500 transition-colors"
                type="submit"
              >
                {onEditTask ? 'Edit' : 'Add'}
              </button>
            </div>
            <textarea
              onChange={handleInputChange}
              className="w-full bg-gray-200 p-3 rounded-md"
              name="description"
              value={formData.description}
            ></textarea>
          </div>
        </form>
      </Container>
    </section>
  )
}

export default TextInput
