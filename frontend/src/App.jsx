import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <main>
      <Header />
      <section>
        <Container>
          <LoginForm />
        </Container>
      </section>
    </main>
  )
}

export default App
