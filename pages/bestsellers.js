import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useQuery } from '@apollo/client' 
import { BEST_SELLERS } from '../schemas'
import Loader from '../components/Loader'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const BestSellers = () => {

  const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS, { fetchPolicy: "cache-and-network" })

  useEffect( () => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [ startPolling, stopPolling ])

  // Loading
  if (loading ) return <Loader textShow="bestSellers" />
  const { bestSellers } = data
  if (bestSellers.length > 0) {
    const sellerChart = []
    bestSellers.map( (seller, index) => {
      sellerChart[index] = {
        ...seller.seller[0],
        total: seller.total
      }
    } )
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Best Sellers</h1>

      {bestSellers.length > 0 &&
        <ResponsiveContainer
          width={'99%'}
          height={550}
        >
          <BarChart
            className="mt-10"
            width={600}
            height={500}
            data={sellerChart}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      }

    </Layout>
  )
}
 
export default BestSellers