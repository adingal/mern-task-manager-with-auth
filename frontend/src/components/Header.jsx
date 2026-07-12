import React from 'react'
import Container from './Container'

function Header() {
  return (
    <header className="bg-gray-700 mb-4">
      <Container>
        <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold font-serif tracking-wide text-gray-200">
          Task Manager App
        </p>
      </Container>
    </header>
  )
}

export default Header
