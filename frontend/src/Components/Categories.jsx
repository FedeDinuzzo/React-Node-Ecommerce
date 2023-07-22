import React from 'react';
import { Link } from 'react-router-dom';

const COMMON_STYLES = " fondo w-24 mx-3 rounded text-white p-2 my-2 hover:shadow-lg hover:shadow-blue-900/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200"; 

function Categories() {
  return (
    <>
    <div id="shop" className="max-w-screen px-12 bg-gray-50">
      <h1 className="flex justify-center align-center pt-20 text-4xl md:text-6xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-lg m-auto place-items-center pt-8">
        <Link to={`/`}>
          <button className={COMMON_STYLES}>ALL</button>
        </Link>
        <Link to={`/category/formula 1`}>
          <button className={COMMON_STYLES}>F1</button>
        </Link>
        <Link to={`/category/link`}>
          <button className={COMMON_STYLES}>LINK</button>
        </Link>
        <Link to={`/category/calibre`}>
          <button className={COMMON_STYLES}>CALIBRE</button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Categories