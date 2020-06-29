import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../schemas'

const Header = () => {
  const router = useRouter()
  const { data, loading, error} = useQuery(GET_USER)

  if (loading) return <h2>Loading...</h2>
  !data.getUser && router.push('/login')
  const { name = '', lastname = '' } = data.getUser

  const closeSession = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 mb-5 lg:mb-0">Hi: {name} {lastname}</p>

      <button 
        onClick={() => closeSession()}
        type="button" 
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
      >
        Close Session
        </button>
    </div>
  )
}
 
export default Header