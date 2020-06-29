import Layout from '../components/Layout'
import Link from 'next/link'
import { GET_ORDER_SELLER } from '../schemas'
import { useQuery } from '@apollo/client'
import Order from '../components/Order'
import Loader from '../components/Loader'

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDER_SELLER)
  if (loading) return <Loader textShow="Orders" />
  // console.log('data : ', data)
  // console.log('error : ', error)
  // debugger

  if (error)  return <p>Has a Error</p>
  if (!data || !data.getOrdersSeller ) console.log('Data error : ', data)
  const { getOrdersSeller = [] } = data

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Orders</h1>

      <Link href="/createorder">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
          Create Order
        </a>
      </Link>
        { getOrdersSeller.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No orders yet</p>
        ) : (
          getOrdersSeller.map( order => (<Order key={order.id} order={order} />))
        )}
    </Layout>
  )
}

export default Orders