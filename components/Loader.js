import React from 'react';
// import { BoxLoading } from 'react-loadingg';

const Loader = ({textShow}) => {
  console.log('textShow : ', textShow)
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
      <div>
        <h2 className="text-center text-2xl text-white font-light" >Loading</h2>
        <p className="text-center text-2xl text-white font-light">{textShow}</p>
      </div>
    </div>
  )
}
export default Loader;