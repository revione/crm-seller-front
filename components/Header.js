import React from 'react';
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_USER } from '../schemas'

const Header = () => {
  // Rounting
  const router = useRouter()
  // Query Apollo
  const { data, loading, error} = useQuery(GET_USER)
  debugger
  if (loading) return 'loading...'
  if (!data.getUsuario) return router.push('/login')
  const { name, lastname } = data.getUsuario

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
  );
}
 
export default Header;