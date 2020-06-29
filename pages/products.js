import Layout from '../components/Layout'
import Product from '../components/Product'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GET_PRODUCTS } from '../schemas'
import Loader from '../components/Loader'

const Products = () => {
  // Router
  const router = useRouter()
  // Ask Apollo
  const { data, loading, error } = useQuery(GET_PRODUCTS)
  // Improve Loading
  if (loading) return <Loader textShow="Products" />
  if (error) return null

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Products</h1>
      <Link href="/createproduct">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
          Create Product
        </a>
      </Link>

      {data.getProducts.length > 0 &&
        <table className="table-auto shadow-md mt-10 w-full w-lg">

          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Existence</th>
              <th className="w-1/5 py-2">Price</th>
              <th className="w-1/5 py-2">Creation Data</th>
              <th className="w-1/5 py-2">Edit</th>
              <th className="w-1/5 py-2">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getProducts.map( prod => (
              <Product
                key={prod.id}
                prod={prod}
              />              
            ))}
          </tbody>
        </table>
      }


    </Layout>
  )
}

export default Products