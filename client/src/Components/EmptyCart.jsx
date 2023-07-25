import React from 'react';
import { Link } from 'react-router-dom';

function EmptyCart() {

  //Render for when cart is empty at Cart.jsx or at Checkout.jsx after buying (if the user reloads checkout)
  return (
    <>
        <div className="pb-72">
            <h1 className="pt-60 text-center text-green-400 text-4xl">Cart Empty</h1>
            <p className="pt-4 text-center text-slate-700 text-xl">¡Back to store to Add Products!</p>
            <Link to="/" className="mt-6 block m-auto fondo w-52 text-center rounded px-2 py-2 text-white text-xl shadow-lg hover:shadow-blue-900/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200"><button>KEEP SHOPPING</button></Link>
        </div>
    </>
  )
}

export default EmptyCart