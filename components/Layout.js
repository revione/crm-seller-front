import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../schemas'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import OrderContext from '../context/orders/OrderContext'

const Layout = ({children}) => {
  const router = useRouter()
  // Get user from data base
  const { data, loading, error} = useQuery(GET_USER)
  const pagesLogOut = router.pathname === '/login' || router.pathname === '/createaccount'
  // const ordersContext = useContext(OrderContext)
  console.log('data Layout : ', data)
  
  if (loading) return <Loader first={true} textShow="Layout" />
  if (!data.getUser && !pagesLogOut) {
    router.push('/login')
    return <h1>Not User</h1>
  }
  if (data?.getUser && pagesLogOut) router.push('/')

  const { getUser } = data

  return (
    <>
      {router.pathname === '/login' || router.pathname === '/createaccount' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>
            {children}
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />
            <main className="sm:w-1/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header user={getUser} />
              {children}
            </main>
          </div>
        </div>
      )}

    </>
  );
}

export default Layout;