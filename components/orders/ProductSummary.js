import React, { useState, useEffect,  useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'

const productSummary = ({product}) => {
  const { name, price, existence } = product
  // get context
  const getContext = useContext(PedidoContext)
  const { quantityProducts, updateTotal } = pedidosContext
  const [ quantity, setCantidad ] = useState(0)

  useEffect( () => {
    updateQuantity()
    updateTotal()
  }, [quantity])

  const updateQuantity = () => {
    const newProduct = {...product, quantity: Number( quantity )}
    quantityProducts(newProduct)
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
 
export default productSummary