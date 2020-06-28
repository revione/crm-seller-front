import React from 'react';
// import { BoxLoading } from 'react-loadingg';

const Loader = ({textShow}) => {
  console.log('textShow : ', textShow)
  return (
    <div>
      <p>{textShow}</p>
      <p>Loading</p>
    </div>
  )
}
export default Loader;