import React, { useEffect, useState } from 'react'
import { validateAndSanitizeTask } from '../utils/validateTask'
import Container from './Container'

const initialFormData = {
  title: '',
  description: '',
}

function TextInput({ onAdd, onEdit, onEditTask }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (onEditTask) {
      setFormData({
        ...onEditTask,
      })
    }
  }, [onEditTask])

  const onFormSubmit = (e) => {
    e.preventDefault()

    // Handle validation and sanitization
    const result = validateAndSanitizeTask(formData)
    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    if (!onEditTask) {
      onAdd(result.sanitized)
    } else {
      onEdit(result.sanitized)
    }

    setFormData(initialFormData)
    setErrors({})
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
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-0">
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
              {errors.title && (
                <p className="absolute -bottom-4 text-xs text-left text-red-500">
                  * {errors.title}
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-0">
              <textarea
                onChange={handleInputChange}
                className="w-full bg-gray-200 p-3 rounded-md h-24 resize-none"
                name="description"
                value={formData.description}
              ></textarea>
              {errors.description && (
                <p className="absolute -bottom-4 text-xs text-left text-red-500">
                  * {errors.description}
                </p>
              )}
            </div>
          </div>
        </form>
      </Container>
    </section>
  )
}

export default TextInput
