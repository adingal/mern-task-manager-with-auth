import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import TextInput from './components/TextInput'
import LoginForm from './components/LoginForm'
import CreateUser from './components/CreateUser'

function App() {
  const { pathname } = useLocation()

  return (
    <main>
      <Header />
      <section>
        <Container>
          {pathname === '/' ? <LoginForm /> : <CreateUser />}
        </Container>
      </section>
    </main>
  )
}

export default App
