import React, { useState } from 'react';
import Layout from '../components/Layout'
import Input from '../components/form/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { NEW_PRODUCT, GET_PRODUCTS } from '../schemas'

const CreateProduct = () => {
  // Router
  const router = useRouter()
  // Message
  const [message, setMessage] = useState()
  // Mutation to create a new product
  const [ createProduct ] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      // Get the cache object we want to update
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS })
      // Rewrite Cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [ ...getProducts, createProduct ]
        }
      })

    }
  })

  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      existence: '',
      price: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('Product name is requerid'),
      existence: Yup.number()
                  .required('Quantity available is required')
                  .integer('Quantity must be integer number')
                  .positive('Quantity must be positive number'),
      price: Yup.number()
                  .required('Price is required')
                  .positive('Price must be bigger than 0')
    }),
    onSubmit: async values => {
      const { name, existence, price } = values
      try {
        const { data } = await createProduct({
          variables: {
            input: {
              name,
              existence: parseInt(existence),
              price: parseInt(price)
            }
          }
        })
        Swal.fire(
        'Product created!',
        'Product has been created correctly',
        'success'
      )
        router.push('/products')
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''))
        setTimeout( () => {
          setMessage(null)
        }, 3000)
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
      <h1 className="text-2xl text-gray-800 font-light">Create Product</h1>
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
              placeholder="Product name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.name}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />
            <Input 
              text="Stock available"
              id="existence"
              type="number"
              placeholder="existence"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.existence}
              touched={formik.touched.existence}
              errors={formik.errors.existence}
            />
            <Input 
              text="Price"
              id="price"
              type="number"
              placeholder="200"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.price}
              touched={formik.touched.price}
              errors={formik.errors.price}
            />

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Add Product"
            />
          </form>
        </div>
      </div>

    </Layout>
   );
}
 
export default CreateProduct;