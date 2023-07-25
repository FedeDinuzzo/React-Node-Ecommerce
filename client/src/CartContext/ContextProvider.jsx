import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCart, addProductInCart } from '../MongoDB/CartMongo'

export const Context = createContext();

export default function ContextProvider({children}) {

  const [cookies, setCookie] = useState()
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity) => {
    product.quantity = quantity;
    const productIndex = cart.findIndex(item => item.id === product.id);
  
    try {
      getCart(cookies)
      // cart.status == 200 ? 
      if (productIndex === -1) {
        // If the product is not in the cart, add it with the given quantity
        setCart([...cart, product]);
        const pid = product.id
        addProductInCart(pid)
        // Added to cart pop up animation
        toast.success(`${product.name} added to cart`, {
          position: "bottom-left",
          width: "200px",
        });
      } else {
        const newCart = [...cart];
        newCart[productIndex].quantity += quantity;
        setCart(newCart, cookies);
        // Increased quantity pop up animation
        toast.info(`increased ${product.name} cart quantity`, {
          position: "bottom-left",
        });
      }
      // : console.error('Error fetching products:', error);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

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