import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useQuery } from '@apollo/client' 
import { BEST_CLIENTS } from '../schemas'
import Loader from '../components/Loader'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const MejoresClients = () => {

  const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS, { fetchPolicy: "cache-and-network" })

  useEffect( () => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [ startPolling, stopPolling ])

  // Loading
  if (loading ) return <Loader textShow="bestClients" />

  const { bestClients } = data
  if (bestClients.length > 0) {
    const clientChart = []
    bestClients.map( (client, index) => {
      clientChart[index] = {
        ...client.client[0],
        total: client.total
      }
    } )
  }


  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light-gray">Best Clients</h1>
      {bestClients.length > 0 && 
        <ResponsiveContainer
          width={'99%'}
          height={550}
        >
          <BarChart
            className="mt-10"
            width={600}
            height={500}
            data={clientChart}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      }
    </Layout>
  )
}
 
export default MejoresClients