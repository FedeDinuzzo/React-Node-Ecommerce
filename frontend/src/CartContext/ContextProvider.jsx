import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCart, addProductInCart } from '../MongoDB/CartMongo'
import { useCookies } from 'react-cookie'

export const Context = createContext();

export default function ContextProvider({children}) {

  const [cookies, setCookie] = useState()
  const [cart, setCart] = useState([]);

  getCart(cid, cookies)

  const addToCart = (product, quantity) => {
    product.quantity = quantity;
    const productIndex = cart.findIndex(item => item.id === product.id);
    
    if (productIndex === -1) {
      setCart([...cart, product]);
      //Added to cart pop up animation
      toast.success(`${product.name} added to cart`, {
        position: "bottom-left",
        width: "200px",
      });
    } else {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantity;
      setCart(newCart);
      //Increased quantity pop up animation
      toast.info(`increased ${product.name} cart quantity`, {
        position: "bottom-left",
      });
    }  
  };

  const removeItem = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  function clear() {
    setCart([]);
  };
  
  //Calculates the final price of the total number of products in the cart
  const finalPrice = cart.map((product) => Number(product.price * product.quantity)).reduce((a, b) => a + b, 0);

  //Set the orderId from the Checkout so you can reuse it in the PurchaseComplete
  const [orderId, setOrderId] = useState('');
  
  return (
    <>
      <Context.Provider value={{ cart, setCart, addToCart, removeItem, clear, finalPrice, orderId, setOrderId }}>
        {children}
      </Context.Provider>
    </>
  )
}