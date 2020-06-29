import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { AUTHENTICATE_USER } from '../schemas'
import OrderContext from '../context/orders/OrderContext'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const [message, setMessage] = useState()
  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER)
  const orderContext = useContext(OrderContext)
  const { triggerLogged } = orderContext

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
        !data && setMessage('Authenticating...')
        // Save token in localStorege
        data && setMessage('Log in success')
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
        setMessage(error.message.replace('GraphQL error: ', ''))
        setTimeout( () => { setMessage(null) }, 5000)
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
        <div className="w-full max-w-sm bg-white rounded shadow-md">
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
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
          <div className="text-center">
            <Link href="/createaccount">
              <a className="inline-block text-sm hover:bg-gray-200 mb-3 w-full lg:w-auto text-center">
                Create Account
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
 
export default Login