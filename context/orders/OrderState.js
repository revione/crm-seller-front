import React, { useReducer } from 'react'
import OrderContext from './OrderContext'
import { 
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_OF_PRODUCTS,
  UPDATE_TOTAL,
  SET_USER,
  TRIGGER_LOGGED,
  TRIGGER_LOADER
} from '../../types'
import OrderReducer from './OrderReducer'

const OrderState = ({children}) => {
  // State de Pedidos
  const initialState = {
    user: null,
    logged: false,
    isLoading: true,
    client: {},
    products: [],
    total: 0
  }

  const [ state, dispatch ] = useReducer(OrderReducer, initialState)

  const triggerLogged = logged => {
    dispatch({
      type: TRIGGER_LOGGED,
      payload: logged
    })
  }

  const triggerLoader = loader => {
    dispatch({
      type: TRIGGER_LOADER,
      payload: loader
    })
  }

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
  const quantityProducts = product => {
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

  const setUser = user => {
    dispatch( {
      type: SET_USER,
      payload: user
    } )
  }

  return (
    <OrderContext.Provider
      value={{
        user: state.user,
        logged: state.logged,
        loading: state.loader,
        client: state.client,
        products: state.products,
        total: state.total,
        triggerLogged,
        triggerLoader,
        addClient,
        addProduct,
        quantityProducts,
        updateTotal,
        setUser
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState


