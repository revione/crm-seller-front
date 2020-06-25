import React from 'react';

const Input = ({ text, id, type, placeholder, handleChange, handleBlur, value, touched, error }) => {
  return ( 
    <>
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {text}
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="text"
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </div>

      { touched && error ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : null}
    </>
  );
}
 
export default Input;