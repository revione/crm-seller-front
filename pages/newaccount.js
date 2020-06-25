import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'

import { NUEVA_CUENTA } from '../schemas'

const NewAccount = () => {
  const [ message, setMessage ] = useState()
  const [ newUser ] = useMutation(NUEVA_CUENTA)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('Name is required'),
      lastname: Yup.string()
                  .required('Last name is required'),
      email: Yup.string()
                  .email('Email is not valid')
                  .required('mail is required'),
      password: Yup.string()
                  .required('Password is required')
                  .min(6, 'Password most have 6 caracters.'),
    }),
    onSubmit: async values => {
      const { name, lastname, email, password } = values

      try {
        const {data} = await newUser({
          variables : {
            input : {
              name, lastname, email, password
            }
          }
        })
        setMessage(`Se creo correctamente el User: ${data.newUser.name}`)
        setTimeout(() => {
          setMessage(null)
          router.push('/login')
        }, 5000)
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''));
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
      { message && showMessage() }
      <h1 className="text-center text-2xl text-white font-light">Create new account</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <Input 
              text="Name"
              id="name"
              type="text"
              placeholder="User Name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.name}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />
            <Input 
              text="Last name"
              id="lastname"
              type="text"
              placeholder="Last Name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.lastname}
              touched={formik.touched.lastname}
              errors={formik.errors.lastname}
            />
            <Input 
              text="Email"
              id="email"
              type="text"
              placeholder="email@email.com"
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
              placeholder="***********"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.password}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />

            <input type="submit" 
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
              value="Create account"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
 
export default NewAccount