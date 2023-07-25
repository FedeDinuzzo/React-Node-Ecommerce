import { useContext, useEffect, useState } from 'react';
import { Context } from '../CartContext/ContextProvider';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import Loader from './Loader';
import ScrollToTop from './ScrollToTop';

const STYLES_LABEL = " block w-72 lg:w-80 mx-auto text-slate-500 font-bold"; 
const STYLES_FORM = " block border-solid border-2 w-72 mb-6 lg:w-80 border-gray-200 rounded-lg p-2 pl-4 my-4 mx-auto";

function Checkout() {
  //Order varaibles
  const { cart, finalPrice, clear, orderId, setOrderId } = useContext(Context);
  const cartOrder = cart.map(prod => ("name: " + prod.name + " price: $" + prod.price + " quantity: " + prod.quantity + " id: " + prod.id));
  
  //Form varaibles
  const initialValues = { name: "", email: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  //Set formValues with the changes when writing to inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});
  }

  //Show formErrors on submit or setIsSubmit as true
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  //If the fields satisfy the validation criteria, execute finishBuying
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      finishBuying();
    }
  }, [formErrors]);

  //Form validations
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required"
    } else if(values.name.length < 6) {
      errors.name = "Name must be more than 6 characters"
    } else if(values.name.length > 30) {
      errors.name = "Name cannot exceed more than 30 characters"
    } else if(values.name.match(/[0-9]/)) {
      errors.name = "Name cannot have numbers"
    }
    if (!values.email) {
      errors.email = "Email is required"
    } else if(!regex.test(values.email)) {
      errors.email = "This is not Valid Email"
    }
    if (!values.phone) {
      errors.phone = "Phone is required"
    } else if(values.phone.length < 11) {
      errors.phone = "Phone must have 11 numbers Example: 011 2345-6789 (cannot have: spaces, +, -)"
    } else if(values.phone.length > 11) {
      errors.phone = "Phone must have 11 numbers"
    }
    return errors;
  }

  //If form is submitted generate order in firestore, clear the cart and active loader until load the path
  function finishBuying(){
    const db = getFirestore();
    const order = collection(db, 'orders');
    
    const buyer = {
      buyer: formValues,
      items: cartOrder,
      date: serverTimestamp(),
      finalPrice,
    };

    addDoc(order, buyer).then(({ id }) => {
      setOrderId(id)
    });

    clear();

    setLoading(true);
  }

  return (
    <>
    <ScrollToTop />
    <div className="fondo -my-16 h-16 mb-0 grid"></div>
    { cart.length === 0 && isSubmit === false ? <EmptyCart /> :
    <div className="py-10 lg:pt-20 lg:pb-32 bg-gray-50">
      {cart.map(prod => (
        <div className="flex justify-center text-center mx-4">
          <h3 className="text-gray-400 md:text-xl">{prod.name}</h3>
          <h3 className="text-green-400 md:text-xl ml-2">Quantity: {parseInt(prod.quantity)}</h3>
        </div>
      ))}
      <p className="text-center mt-4 mb-6 text-gray-500 text-2xl">TOTAL PAYMENT: ${finalPrice}</p>
      <div class="relative group block m-auto max-w-md bg-gray-50 rounded-lg ">
        <div class="absolute mx-4 md:mx-0 -inset-1 bg-gradient-to-r from-green-300 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"/>
        <div class="relative mx-4 md:mx-0 py-6 bg-white ring-1 ring-gray-900/5 rounded-xl leading-none">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center my-4 mb-8 text-green-400 text-2xl">Purchase Form</h1>
            <div>
              <label className={STYLES_LABEL}>Name</label>
              <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              onChange={handleChange} 
              value={formValues.name} 
              className={STYLES_FORM}
              />
            </div> 
            <p className="text-red-500 text-center -mt-2 mb-4">{formErrors.name}</p>
            <div>
              <label className={STYLES_LABEL}>Email</label>
              <input 
              type="email" 
              name="email"
              placeholder="Email Adress" 
              onChange={handleChange} 
              value={formValues.email} 
              className={STYLES_FORM}
              />
            </div>
            <p className="text-red-500 text-center -mt-2 mb-4">{formErrors.email}</p>
            <div>
              <label className={STYLES_LABEL}>Phone Number</label>
              <input 
              type="number" 
              name="phone"
              placeholder="Phone Number" 
              onChange={handleChange} 
              value={formValues.phone} 
              className={STYLES_FORM}
              />
            </div>
            <p className="block mx-auto text-red-500 text-center -mt-2 mb-4 w-60">{formErrors.phone}</p>
            <button
            type="submit" 
            value="PURCHASE"
            onChange={handleChange}
            className="fondo block m-auto w-48 rounded px-2 py-2 mt-6 mb-4 text-white text-xl shadow-lg hover:shadow-blue-900/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200">
            PURCHASE
            </button>
            <div className="flex justify-center">{loading ? <Loader /> : ''}</div>
          </form>
        </div>
      </div>
    </div>
    }
    { orderId !== "" && <Navigate push to="/purchase-id"/> }
    </>
  )
}

export default Checkout