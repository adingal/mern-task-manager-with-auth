import React from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-100 p-6 rounded-sm flex flex-col gap-3"
    >
      <div className="flex flex-col gap-0">
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
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
      </div>

      <div className="flex flex-col gap-0">
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
          value={formik.values.password}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
      </div>

      <div className="flex flex-col gap-0">
        <label
          htmlFor="password-confirm"
          className="text-xs md:text-sm lg:text-base text-gray-400 mb-0"
        >
          Password Confirm
        </label>
        <input
          id="password-confirm"
          name="password-confirm"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
      </div>

      <button
        type="submit"
        className="bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer p-3 border-gray-400 rounded-sm text-sm md:text-base lg:text-lg text-black"
      >
        Submit
      </button>
      <p className="text-xs md:text-sm lg:text-base text-center text-gray-400 hover:text-gray-500 mt-8">
        <Link to="/">or Login?</Link>
      </p>
    </form>
  )
}

export default SignupForm
