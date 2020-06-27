import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { OBTENER_PRODUCTOS } from '../../schemas'
import OrderContext from '../../context/orders/OrderContext'
import Loader from './Loader'

const AsignarOrders = () => {

  // state local del componente
  const [ products, setOrders ] = useState([])

  // Interactuar conla base de datos para Obtener products
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

  // 
  useEffect( () => {
    // funcion para pasar a ordersState 
    agregarOrder(products)
  }, [products])

  // get el context 
  const ordersContext = useContext(OrderContext)
  const { agregarOrder } = ordersContext

  // get Orders
  if (loading) return 'Loading ....'
  const getOrders = data.getOrders

  const selectOrder = product => {
    setOrders(product)
  }

  return ( 
    <>
      <p 
        className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
      > 2. Selecciona los Orders </p>
      <Select
        className="mt-3"
        options={getOrders}
        isMulti={true}
        onChange={ option => selectOrder(option) }
        getOptionValue={ option => option.id }
        getOptionLabel={ option => `${option.name}  --  ${option.existence} disponible` }
        placeholder="Seleccion los products"
        noOptionsMessage={ () => 'No hay resultados'}
      />
    </>
  )
}
 
export default AsignarOrders