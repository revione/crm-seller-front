import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../schemas'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'

const Layout = ({children}) => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [isLogin, setisLogin] = useState(false)
  const router = useRouter()
  // // Get user from data base
  // const { data, loading, error} = useQuery(GET_USER, 'skip', { fetchPolicy: "cache-and-network", errorPolicy : 'all' })
  // const { data = {}, loading, error} = useQuery(GET_USER)
  // const logitOrCreateAccount = router.pathname === '/login' || router.pathname === '/createaccount'
  // get el context 
  // const ordersContext = useContext(OrderContext)

  // useEffect( () => {
  //   // console.log(' a ver ')
  //   // console.log('data : ', data)
  //   // console.log('loading : ', loading)
  //   // console.log('error : ', error)
  //   setIsLoading(loading)
  //   // debugger
  // }, [loading])
  
  // if (loading) return <Loader first={true} textShow="Layout" />
  // if (!data.getUser && !logitOrCreateAccount) return router.push('/login')
  // if (data.getUser && logitOrCreateAccount) return router.push('/')
  // const user = data.getUser

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
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}

    </>
  );
}

export default Layout;