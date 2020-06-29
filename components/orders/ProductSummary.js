import React, { useState, useEffect,  useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext'

const ProductSummary = ({product}) => {
  const { name, price, existence } = product
  // get context
  const orderContext = useContext(OrderContext)
  const { quantityProducts, updateTotal } = orderContext
  const [ quantity, setCantidad ] = useState(0)

  useEffect( () => {
    updateQuantity()
    updateTotal()
  }, [quantity])

  const updateQuantity = () => {
    const createProduct = {...product, quantity: Number( quantity )}
    quantityProducts(createProduct)
  }

  const onChangeHandle = quantityInput => {
    Number(quantityInput) > existence ? setCantidad(quantity) : setCantidad(quantityInput)
  }

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p className="">$ {price}</p>
      </div>
      <input 
        type="number"
        placeholder="Quantity"
        className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={ e => onChangeHandle(e.target.value) }
        value={ quantity || 1 }
        min="1"
        max={existence}
      />
    </div>
  )
}
 
export default ProductSummary