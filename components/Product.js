import React, { useState } from 'react'
import Swal from 'sweetalert2' 
import { useMutation } from '@apollo/client'
import Router from 'next/router'

import { DELETE_PRODUCT, GET_PRODUCTS } from '../schemas'

const Order = ({ prod }) => {
  const [message, setMessage] = useState()
  const { id, name, existence, price, create } = prod
  // Get Mutation to delete product
  const [ deleteOrder ] = useMutation( DELETE_PRODUCT, {
    update(cache) {
      // get cache copy 
      const { getOrders } = cache.readQuery({ query: GET_PRODUCTS })
      // Rewrite Cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getOrders : getOrders.filter( prod => prod.id !== id )
        }
      })
    }
  } )
  // Function delete Product
  const onHandleDelite = () => {
    Swal.fire({
      title: 'Do you want to delete this product?',
      text: "This action cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.value) {

        try {
          // Delete por ID
          const { data } = await deleteOrder({
            variables: { id }
          })

          // Mostrar la alerta
          Swal.fire(
            'Deleted!',
            data.deleteOrder,
            'success'
          )
        } catch (error) {
          console.log('Error, delete Id: ', error)
          setMessage(error.message.replace('GraphQL error: ', ''))
          setTimeout( () => { setMessage(null) }, 3000)
        }

      }
    })
  }

  const editOrder = () => {
    Router.push({
      pathname: "/editproduct/[id]",
      query: { id }
    })
  }

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <>
      { message && showMessage() }

      <tr>
        <td className="border px-4 py-2">{name}</td>
        <td className="border px-4 py-2">{existence}</td>
        <td className="border px-4 py-2">{price}</td>
        <td className="border px-4 py-2">{create}</td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="flex justify-center item-center bg-blue-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => editOrder()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Edit
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => onHandleDelite()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}
 
export default Order;