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
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setisLogin] = useState(false)
  const router = useRouter()
  // Get user from data base
  const { data, loading, error} = useQuery(GET_USER, { ssr: true })
  const logitOrCreateAccount = router.pathname === '/login' || router.pathname === '/createaccount'
  const ordersContext = useContext(OrderContext)
  console.log('ordersContext Layout : ', ordersContext)
  
  if (loading) return <Loader first={true} textShow="Layout" />
  if (!data.getUser && !logitOrCreateAccount) router.push('/login')
  if (data.getUser && logitOrCreateAccount) router.push('/')
  const user = data.getUser
  console.log('user : ', user);

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
              <Header user={user} />
              {children}
            </main>
          </div>
        </div>
      )}

    </>
  );
}

export default Layout;