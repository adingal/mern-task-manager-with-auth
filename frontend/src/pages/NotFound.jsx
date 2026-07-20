import React from 'react'
import Header from '../components/Header'
import Container from '../components/Container'

function NotFound() {
  return (
    <main>
      <Header />
      <section>
        <Container>
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-center text-red-600 font-bold mb-4">
            404
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-center text-gray-600">
            Page not found.
          </p>
        </Container>
      </section>
    </main>
  )
}

export default NotFound
