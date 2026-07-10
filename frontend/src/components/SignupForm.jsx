import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address.')
        .required('Email is required.'),
      password: Yup.string()
        .min(8, 'A password must have atleast 8 or more characters.')
        .max(30, 'A password must have a max of 30 or less characters.')
        .required('Password is required.'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required('Confirm password is required.'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-100 p-6 rounded-sm flex flex-col gap-3"
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 text-center mb-4">
        Signup
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
          value={formik.values.password}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="absolute bottom-0 text-xs text-red-500">
            {formik.errors.password}
          </p>
        ) : null}
      </div>

      <div className="relative flex flex-col gap-0 pb-4">
        <label
          htmlFor="passwordConfirm"
          className="text-xs md:text-sm lg:text-base text-gray-400 mb-0"
        >
          Password Confirm
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-sm p-3 outline-gray-400"
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <p className="absolute bottom-0 text-xs text-red-500">
            {formik.errors.passwordConfirm}
          </p>
        ) : null}
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
