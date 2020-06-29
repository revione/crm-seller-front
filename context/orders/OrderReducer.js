import { 
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_OF_PRODUCTS,
  UPDATE_TOTAL,
  SET_USER,
  TRIGGER_LOGGED,
  TRIGGER_LOADER
} from '../../types'

export default ( state, action ) => {
  switch (action.type) {
    case TRIGGER_LOGGED:
      debugger
      return {
        ...state,
        logged: action.payload
      }
    case TRIGGER_LOADER:
      return {
        ...state,
        loader: action.payload
      }
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload
      }
      
    case QUANTITY_OF_PRODUCTS:
      return {
        ...state,
        products: state.products.map( prod => prod.id === action.payload.id ? prod = action.payload : prod )
      }
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce( 
          (newTotal, product) => newTotal += product.precio * product.quantity, 0 
        )
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state
  }
}