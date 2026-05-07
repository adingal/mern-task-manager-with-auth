import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <header className="bg-black">
        <div className="max-w-md mx-auto p-4">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200">
            Task Manager App
          </p>
        </div>
      </header>
    </main>
  )
}

export default App
