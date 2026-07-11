import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './App.css'
import Container from './components/Container'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log(pathname)
  }, [])

  return (
    <main>
      <header className="bg-gray-700 mb-4">
        <Container>
          <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold font-serif tracking-wide text-gray-200">
            Task Manager App
          </p>
        </Container>
      </header>
      <section>
        <Container>
          {pathname === '/' ? <LoginForm /> : <SignupForm />}
        </Container>
      </section>
    </main>
  )
}

export default App
