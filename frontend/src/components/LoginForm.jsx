import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/auth/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address.')
        .required('Email is required.'),
      password: Yup.string()
        .min(8, 'A password must have atleast 8 or more characters.')
        .max(30, 'A password must have a max of 30 or less characters.')
        .required('Password is required.'),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values))
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-100 border border-gray-200 p-6 rounded-sm flex flex-col gap-3"
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif tracking-wide text-gray-500 text-center mb-4">
        Login
      </h1>
      <div className="relative flex flex-col gap-0 pb-4">
        <label
          htmlFor="email"
          className="text-xs md:text-sm lg:text-base text-gray-400 mb-0"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="absolute bottom-0 text-xs text-red-500">
            {formik.errors.email}
          </p>
        ) : null}
      </div>

      <div className="relative flex flex-col gap-0 pb-4">
        <label
          htmlFor="password"
          className="text-xs md:text-sm lg:text-base text-gray-400 mb-0"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="absolute bottom-0 text-xs text-red-500">
            {formik.errors.password}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer p-3 border-gray-400 rounded-sm text-sm md:text-base lg:text-lg text-black"
      >
        Submit
      </button>
      {error !== null && (
        <p className="text-xs text-red-500 text-center">
          Email or password is incorrect.
        </p>
      )}
      <p className="text-xs md:text-sm lg:text-base text-center text-gray-400 hover:text-gray-500 mt-8">
        <Link to="/signup">or Sign up?</Link>
      </p>
    </form>
  )
}

export default LoginForm
