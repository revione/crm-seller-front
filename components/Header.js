import React from 'react';

const Header = ({user}) => {
  const { name, lastname } = user
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