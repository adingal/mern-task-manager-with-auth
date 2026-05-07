import React from 'react'
import Container from './Container'

function TextInput({ onAdd }) {
  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const description = formData.get('description')

    onAdd({ title, description })
  }

  return (
    <section>
      <Container>
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <input
                className="w-full bg-gray-200 p-3 rounded-l-md"
                type="text"
                name="title"
              />
              <button
                className="bg-gray-400 py-2 px-4 rounded-r-md cursor-pointer hover:bg-gray-500 transition-colors"
                type="submit"
              >
                Add
              </button>
            </div>
            <textarea
              className="w-full bg-gray-200 p-3 rounded-md"
              name="description"
            ></textarea>
          </div>
        </form>
      </Container>
    </section>
  )
}

export default TextInput
