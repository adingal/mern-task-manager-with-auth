import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

function App() {
  const { pathname } = useLocation()

  return (
    <main>
      <Header />
      <section>
        <Container>
          {pathname === '/' ? <LoginForm /> : <SignupForm />}
        </Container>
      </section>
    </main>
  )
}

export default App
