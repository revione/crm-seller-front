import React, { useState } from 'react';
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { NEW_CLIENT, GET_CLIENTS_SELLER } from '../schemas'

const CreateClient = () => {
  const router = useRouter()
  const [message, setMessage] = useState()
  const [ createClient ] = useMutation(NEW_CLIENT, {
    update(cache, { data: { createClient } }) {
      const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_SELLER })
      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: {
          getClientsSeller: [ ...getClientsSeller, createClient ]
        }
      })
    }
  })

  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      company: '',
      email: '',
      tel: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('Name is required'),
      lastname: Yup.string()
                  .required('Last name is required '),
      company: Yup.string()
                  .required('Company is required'),
      email: Yup.string()
                  .email('Email is not valid')
                  .required('email del client es obligatorio')
    }),
    onSubmit: async values => {
      const { name, lastname, company, email, tel } = values
      try {
        const { data } = await createClient({
          variables: {
            input: {
              name,
              lastname,
              company,
              email,
              tel
            }
          }
        })
        router.push('/')
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''))
        setTimeout( () => { setMessage(null) }, 3000)
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
      <h1 className="text-2xl text-gray-800 font-light">Create Client</h1>
      { message && showMessage() }

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <Input 
              text="Name"
              id="name"
              type="text"
              placeholder="Name Client"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.name}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />
            <Input 
              text="Last Name"
              id="lastname"
              type="text"
              placeholder="Last Name Client"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.lastname}
              touched={formik.touched.lastname}
              errors={formik.errors.lastname}
            />
            <Input 
              text="Company"
              id="company"
              type="text"
              placeholder="Company Client"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.company}
              touched={formik.touched.company}
              errors={formik.errors.company}
            />
            <Input 
              text="Email"
              id="email"
              type="email"
              placeholder="Email Client"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.email}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
            <Input 
              text="Tel"
              id="tel"
              type="tel"
              placeholder="Tel Client"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.tel}
            />

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Add Client"
            />
          </form>
        </div>
      </div>

    </Layout>
   );
}
 
export default CreateClient;