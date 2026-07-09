import { useEffect, useState } from 'react'
import '../App.css'
import Container from '../components/Container'
import TextInput from '../components/TextInput'
import TaskList from '../components/TaskList'
import SignupForm from '../components/SignupForm'

function App() {
  return (
    <main>
      <header className="bg-black mb-4">
        <Container>
          <p className="text-xl md:text-2xl lg:text-3xl text-center text-gray-200">
            Task Manager App
          </p>
        </Container>
      </header>
      <section>
        <Container>
          <SignupForm />
        </Container>
      </section>
    </main>
  )
}

export default App
