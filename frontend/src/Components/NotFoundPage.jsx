import React from 'react'
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div className="fondo -my-16 h-16 mb-16"></div>
      <div className="-mt-16 bg-white h-{600} flex m-auto text-center py-60 w-screen">
        <div className="m-auto align-center">
          <h2 className="font-bold text-6xl p-2">404 ERROR</h2>
          <h2 className="text-green-300 text-5xl p-1">PAGE NOT FOUND</h2>
          <p className="p-1">The page you are looking for does not exist.</p>
          <Link to="/"><button className="grid mx-auto fondo w-36 rounded text-white p-2 mt-6">GO BACK</button></Link>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage