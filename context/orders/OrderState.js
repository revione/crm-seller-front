import React, { useReducer } from 'react'
import OrderContext from './OrderContext'
import { 
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_OF_PRODUCTS,
  UPDATE_TOTAL
} from '../../types'
import OrderReducer from './OrderReducer'

const PedidoState = ({children}) => {
  // State de Pedidos
  const initialState = {
    client: {},
    products: [],
    total: 0
  }

  const [ state, dispatch ] = useReducer(OrderReducer, initialState)

  // Function Edit Client
  const addClient = client => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client
    })
  }

  const addProduct = products => {
    let newState
    if (state.products.length > 0) {
      // Take the second arr and copy the firstone 
        newState = products.map( product => {
        const nuevoObjeto = state.products.find( prod => {
          console.log(`prod.id === product.id :: ${prod.id} === ${product.id} :: ${prod.id === product.id}`)

          return prod.id === product.id
        })
        return {...product, ...nuevoObjeto}
      })
    } else {
      newState = products
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState
    })
  }

  // Edit quantity avaiable products
  const quntityProducts = product => {
    dispatch({
      type: QUANTITY_OF_PRODUCTS,
      payload: product
    })
  }

  // Update order total 
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        quntityProducts,
        updateTotal
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState


