import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../schemas'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({children}) => {
  const router = useRouter()
  const { data, loading, error} = useQuery(GET_USER)
  const logitOrCreateAccount = router.pathname === '/login' || router.pathname === '/createaccount'

  if (loading) return 'loading...'
  if (!data.getUser && !logitOrCreateAccount) return router.push('/login')
  if (data.getUser && logitOrCreateAccount) return router.push('/')
  const user = data.getUser

  return (
    <>
      <Head>
        <title>Sellers</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" rel="stylesheet" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
      </Head>

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

