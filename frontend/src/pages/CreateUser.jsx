import Header from '../components/Header'
import Container from '../components/Container'
import CreateUserForm from '../components/CreateUserForm'

const CreateUser = () => {
  return (
    <main>
      <Header />
      <section>
        <Container>
          <CreateUserForm />
        </Container>
      </section>
    </main>
  )
}

export default CreateUser
