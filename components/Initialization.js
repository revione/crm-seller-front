import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Loader from './Loader'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_USER } from '../schemas'
import OrderContext from '../context/orders/OrderContext'

const Initialization = (props) => {
  const router = useRouter()
  // Get user from data base
  const orderContext = useContext(OrderContext)
  const { setUser, user, logged } = orderContext
  const { data, loading, error, refetch} = useQuery(GET_USER)
  const logitOrCreateAccount = router.pathname === '/login' || router.pathname === '/createaccount'
  
  useEffect( () => {
    if (!loading) data.getUser && setUser(data.getUser)
  }, [loading] )

  useEffect( () => {
    if (localStorage.getItem('token')) {
      refetch()
    }
  }, [logged] )

  console.log('orderContext : ', orderContext)
  // debugger

  if (loading) return (<Loader first={true} textShow="Initialization" />)
  if ( !data.getUser && !logitOrCreateAccount) {
    router.push('/login')
    return <></>
  }
  if (data.getUser && logitOrCreateAccount) {
    router.push('/')
    return <></>
  }
  if (data.getUser) {
    console.log('data.getUser : ', data.getUser)
  }

  return ( 
    <>
      <Head>
        <title>Sellers</title>
      </Head>

      {props.children}

    </>
  )
}
 
export default Initialization