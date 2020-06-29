import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../schemas'
import OrderContext from '../../context/orders/OrderContext'
import Loader from '../Loader'

const AssignProducts = () => {

  // state local del componente
  const [ products, setOrders ] = useState([])

  // Interactuar conla base de datos para Obtener products
  const { data, loading, error } = useQuery(GET_PRODUCTS)

  // 
  useEffect( () => {
    // funcion para pasar a ordersState 
    addProduct(products)
  }, [products])

  // get el context 
  const ordersContext = useContext(OrderContext)
  const { addProduct } = ordersContext

  if (loading) return <Loader textShow="AssignProducts" inline />
  // get Products
  const { getProducts } = data

  const selectOrder = product => {
    setOrders(product)
  }

  return ( 
    <>
      <p 
        className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      > 2. Select products </p>
      <Select
        className="mt-3"
        options={getProducts}
        isMulti={true}
        onChange={ option => selectOrder(option) }
        getOptionValue={ option => option.id }
        getOptionLabel={ option => `${option.name}  --  ${option.existence} disponible` }
        placeholder="Select products"
        noOptionsMessage={ () => 'Theres are not results'}
      />
    </>
  )
}
 
export default AssignProducts