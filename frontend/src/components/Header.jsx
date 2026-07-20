import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../store/auth/authSlice'
import Container from './Container'

function Header() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user)

  return (
    <header className="bg-gray-700 mb-4">
      <Container>
        <div
          className={`flex flex-row justify-${isAuthenticated ? 'between' : 'center'}`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold font-serif tracking-wide text-gray-200">
            Task Manager App
          </p>
          {isAuthenticated && (
            <div>
              <button
                className="text-sm md:text-base text-white hover:text-gray-300 transition-colors cursor-pointer"
                type="button"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
