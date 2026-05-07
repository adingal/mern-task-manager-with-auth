import React from 'react'
import Container from './Container'

function TextInput() {
  return (
    <section>
      <Container>
        <form>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <input
                className="w-full bg-gray-200 p-3 rounded-l-md"
                type="text"
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
