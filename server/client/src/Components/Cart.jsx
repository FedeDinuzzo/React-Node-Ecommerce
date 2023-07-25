import { useContext } from 'react';
import { Context } from '../CartContext/ContextProvider';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import ScrollToTop from './ScrollToTop';

export default function Cart() {
  //Brings the logic from CartContext and rednderizes it in the cart path
  let { cart, finalPrice, removeItem, clear } = useContext(Context);

  return (
    <>
    <ScrollToTop />
    <div className="bg-gray-50">
        <div className="fondo -my-16 h-16 mb-8"></div>
        {cart.length === 0 ? <EmptyCart /> :
        <div className="m-auto px-4 max-w-5xl">
            <h1 className="text-gray-500 text-4xl lg:text-5xl py-2 text-center">CART</h1>
            {cart.map(prod => (
                <div class="relative group my-6">
                    <div class="absolute -inset-1 bg-gradient-to-r from-green-300 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"/>
                    <div class="relative bg-white ring-1 ring-gray-900/5 rounded-xl leading-none">
                        <div className="grid grid-cols-3 md:grid-cols-5 items-center text-center m-4 py-6">
                            <Link to={`/item/${prod._id}`}><img src={prod.thumbnail[0]} alt="product" height="80" width="80" className="m-auto h-24 w-24" /></Link>
                            <Link to={`/item/${prod._id}`}><h3 className="text-gray-400 md:text-xl">{prod.title}</h3></Link>
                            <h3 className="text-green-400 font-bold">Quantity {parseInt(prod.quantity)}</h3>
                            
                            <button onClick={() => removeItem(prod._id)} className="fondo w-24 rounded text-white p-2 mt-2 mx-auto  item-center hover:shadow-lg hover:shadow-blue-900/30 transition ease-in hover:-translate-y-1 duration-200">REMOVE</button>
                            <h3 className="text-gray-500 font-bold text-xl">${parseInt(prod.price)}</h3>
                        </div>           
                    </div>
                </div>
            ))}
            <h3 className="text-2xl text-green-400 my-4 lg:mt-12 text-center md:text-right mx-3">TOTAL: ${finalPrice}</h3>
            <div className="grid md:grid-cols-3 justify-center pb-12 lg:pb-20">
                <button onClick={clear} className="border-solid border-2 w-60 border-gray-500 mx-2 rounded p-2 my-4 hover:text-red-600 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200">DELETE CART</button>
                <Link to="/"><button className="border-solid border-2 w-60 border-gray-500 mx-2 rounded p-2 my-4 hover:text-black hover:border-black hover:shadow-lg hover:shadow-black/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200">KEEP SHOPPING</button></Link>
                <Link to="/checkout"><button className="border-solid border-2 w-60 md:w-80 border-gray-500 mx-2 rounded p-2 my-4 hover:text-green-400 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200">PROCEED TO CHECKOUT</button></Link>
            </div>
        </div>
        }
        </div>
    </>
  )
}