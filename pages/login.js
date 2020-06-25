import React, { useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { AUTHENTICATE_USER } from '../schemas'

const Login = () => {
  const router = useRouter()
  const [message, setMessage] = useState()
  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email('Email is not valid')
                .required('email is required'),
      password: Yup.string()
                .required('Password is required')
    }),
    onSubmit: async values => {
      const { email, password } = values;
      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password
            }
          }
        })
        setMessage('Authenticating...')
        console.log(data)
        // Save token in localStorege
        setTimeout( () => {
          const { token } = data.authenticateUser
          localStorage.setItem('token', token)
        }, 1000) 

        // redirect at clients
        setTimeout( () => {
          setMessage(null)
          router.push('/')
        }, 2000)

      } catch (error) {
        console.log(error)
        debugger
        setMessage(error.message.replace('GraphQL error: ', ''))
        setTimeout( () => { setMessage(null) }, 32234000)
      }
    }
  })

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return ( 
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      { message && showMessage() }
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <Input 
              text="Email"
              id="email"
              type="email"
              placeholder="Email"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.email}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
            <Input 
              text="Password"
              id="password"
              type="password"
              placeholder="**********"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.password}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />

            <input type="submit" 
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
              value="Log in"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
 
export default Login