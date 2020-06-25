import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Input from '../../components/form/Input'
import { useQuery, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../schemas'
import { Formik } from 'formik'
import Swal from 'sweetalert2'

const EditProduct = () => {
  const router = useRouter()
  const { query: { id = 1 } } = router
  // Ask for product
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id }
  })
  // Update Product
  const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

  if (loading) return 'loading...'
  if (!data) return 'Action is not available'
  
  const { getProduct } = data
  
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
                .required('Name is required'),
    existence: Yup.number()
                .required('Existence is required')
                .integer('Existence must be integer number')
                .positive('Existence must be positive number'),
    price: Yup.number()
                .required('Price must ve integer number')
                .positive('Price must be positive number')
  })

  const onHandleSubmit = async (values, functions) => {
    const { name, existence, price} = values

    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            existence: parseInt(existence),
            price: parseInt(price)
          }
        }
      })

      // Sweet Alert
      Swal.fire(
        'Updated!',
        'Product has been updated.',
        'success'
      )

      // redirect at products
      router.push('/products')

    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Edit Product</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={ validationSchema }
            enableReinitialize
            initialValues={ getProduct }
            onSubmit={onHandleSubmit}
          >
            {props => {
              console.log(props)
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <Input 
                    text="Name"
                    id="name"
                    type="text"
                    placeholder="Name del Product"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.name}
                    touched={props.touched.name}
                    errors={props.errors.name}
                  />
                  <Input 
                    text="Existence"
                    id="existence"
                    type="tel"
                    placeholder="existence"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.existence}
                    touched={props.touched.existence}
                    errors={props.errors.existence}
                  />
                  <Input 
                    text="Precio"
                    id="price"
                    type="tel"
                    placeholder="200"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.price}
                    touched={props.touched.price}
                    errors={props.errors.price}
                  />

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Update Product"
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
 
export default EditProduct;