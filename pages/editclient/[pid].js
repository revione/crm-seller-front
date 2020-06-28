import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Input from '../../components/form/Input'
import { useQuery, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { GET_CLIENT, UPDATE_CLIENT } from '../../schemas'
import { Formik } from 'formik'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const EditClient = () => {
  // Router
  const router = useRouter()
  const { query: { id = 1 } } = router
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: { id }, 
    fetchPolicy: "cache-and-network"
  })
  const [ updateClient ] = useMutation(UPDATE_CLIENT)

  if (loading) return <Loader textShow="editClient" />
  const { getClient } = data
  
  const validationSchema = Yup.object({
    name: Yup.string()
                .required('Name is required'),
    lastname: Yup.string()
                .required('Last Name is required'),
    company: Yup.string()
                .required('Company is required'),
    email: Yup.string()
                .email('Email is not valid')
                .required('Email is required')
  })

  const onHandleSubmit = async (values, functions) => {
    const { name, lastname, company, email, telefono } = values
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastname,
            company,
            email,
            telefono
          }
        }
      })

      // Sweet Alert
      Swal.fire(
        'Updated!',
        'Client has been updated',
        'success'
      )
      // redirect
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Edit Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={ validationSchema }
            enableReinitialize
            initialValues={ getClient }
            onSubmit={onHandleSubmit}
          >
            {props => {
              return (

                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <Input 
                    text="Name"
                    id="name"
                    type="text"
                    placeholder="Name Client"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.name}
                    touched={props.touched.name}
                    errors={props.errors.name}
                  />
                  <Input 
                    text="Last Name"
                    id="lastname"
                    type="text"
                    placeholder="Apellido Client"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.lastname}
                    touched={props.touched.lastname}
                    errors={props.errors.lastname}
                  />
                  <Input 
                    text="Empresa"
                    id="company"
                    type="text"
                    placeholder="Empresa Client"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.company}
                    touched={props.touched.company}
                    errors={props.errors.company}
                  />
                  <Input 
                    text="Email"
                    id="email"
                    type="email"
                    placeholder="Email Client"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.email}
                    touched={props.touched.email}
                    errors={props.errors.email}
                  />
                  <Input 
                    text="Tel"
                    id="tel"
                    type="tel"
                    placeholder="91827492784"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.tel}
                  />

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Edit Client"
                  />
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
      </Layout>
   );
}
 
export default EditClient;