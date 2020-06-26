import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_ORDER, DELETE_ORDER, GET_ORDERS_SELLER_ID } from '../schemas'
import Swal from 'sweetalert2'

const Order = ({ order }) => {
  const { id, total, client, state } = order
  const { name, lastname, email, tel } = client
  // States
  const [ stateOrder, setEstadoOrder ] = useState(state)
  const [ classOrder, setClaseOrder ] = useState('')
  // Mutation update Order
  const [ updateOrder ] = useMutation(UPDATE_ORDER)
  // Mutation delete Order
  const [ deleteOrder ] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersSeller } = cache.readQuery({
        query: GET_ORDERS_SELLER_ID
      })
      cache.writeQuery({
        query: GET_ORDERS_SELLER_ID,
        data: {
          getOrdersSeller: getOrdersSeller.filter( order => order.id !== id ) 
        }
      })
    }
  })

  // Set stateOrder
  useEffect( () => {
     if (stateOrder) setEstadoOrder(stateOrder)
     ClaseOrder()
  }, [stateOrder])

  // Function color according to its state
  const ClaseOrder = () => {
    switch (stateOrder) {
      case 'PENDIENTE':
        setClaseOrder('border-yellow-500')
        break
      case 'COMPLETADO':
        setClaseOrder('border-green-500')
        break
      case 'CANCELADO':
        setClaseOrder('border-red-500')
        break
      default:
        setClaseOrder('default')
        break
    }
  }

  // Edit state
  const cambiarEstadoOrder = async (nuevoEstado) => {
    try {
      // interact with db - update state order
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            state: nuevoEstado,
            client: client.id
          }
        }
      })
      // set local ordar state 
      setEstadoOrder(data.updateOrder.state)
    } catch (error) {
      console.log('Error, Order, interact with db - update state order : ', error)
    }
  }

  const onChangeHandle = () => {
    Swal.fire({
      title: 'Do you want to delete this este order?',
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
          // interact with db - Delete by ID
          const { data } = await deleteOrder({
            variables: { id }
          })
          // Show alert
          Swal.fire(
            'Deleted!',
            'Order has been deleted',
            'success'
          )
        } catch (error) {
          showMessage(error.message.replace('GraphQL error: ', ''))
          setTimeout( () => { showMessage(null) }, 3000)
        }

      }
    })
  }

  return (
    <div className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg ${classOrder} border-t-4 `}>
      <div className="">
        <p className="font-bold text-gray-800">Client: {name} {lastname}</p>

        {email && (
          <p className="flex items-center my-2">
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {email}
          </p>
        )}
        {tel && (
          <p className="flex items-center my-2">
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            {tel}
          </p>
        )}

        <h2 className="text-gray-800 font-bold mt-10">Estado Order: </h2>

        <select 
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-sm font-bold"
          value={stateOrder}
          onChange={ e => cambiarEstadoOrder(e.target.value) }
        >
          <option value="COMPLETADO">COMPLETED</option>
          <option value="PENDIENTE">PENDING</option>
          <option value="CANCELADO">CANCELED</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Order summary:</h2>
        { order.order.map( product => (
          <div key={product.id} className="mt-4">
            <p className="text-sm text-gray-600">Order: {product.name}</p>
            <p className="text-sm text-gray-600">Cantidad: {product.quantity}</p>
          </div>
        ) )}
        <p className="text-gray-800 mt-3 font-bold"> Total payout: 
          <span className="font-light"> $ {total}</span>
        </p>
        <button 
          className="flex items-center mt-4 bg-red-800 px-5 py-2  inline-block text-white rounded leading-tight uppercase text-xs font-bold"
          onClick={() => onChangeHandle()}
        >
          <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Delete Order
        </button>
      </div>
    </div>
  )
}
 
export default Order