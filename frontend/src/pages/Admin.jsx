import { useEffect, useState } from 'react'
import Container from '../components/Container'

function Admin() {
  return (
    <main>
      <header className="bg-black mb-4">
        <Container>
          <p className="text-xl md:text-2xl lg:text-3xl text-center text-gray-200">
            Task Manager App
          </p>
        </Container>
      </header>
      <div className="text-center">Admin</div>
    </main>
  )
}

export default Admin
