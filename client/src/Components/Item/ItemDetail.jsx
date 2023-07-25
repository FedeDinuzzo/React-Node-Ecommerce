import { useContext, useState } from 'react'
import { Context } from '../../CartContext/ContextProvider';
import ItemCount from './ItemCount';
import ItemCart from './ItemCart';
import "./item.css";
import ScrollToTop from '../ScrollToTop';
import Carousel from '../Carousel';

function ItemDetail({ product }) {
    let { addToCart } = useContext(Context);
    const [count, setCount] = useState(0);

    const onAdd = (product, count) => {
        setCount(count);
        addToCart(product, count);
    };

    return (        
    <>
    <ScrollToTop />
    <div className="fondo -my-16 h-16 mb-6"></div>
        <div key={product._id} className="lg:grid lg:grid-cols-2 justify-center mx-auto lg:-mt-16 mb-12">
            <div className="px-4 mt-4 block xl:max-w-4xl">
                <h3 className="ml-4 lg:hidden text-gray-400 text-2xl">{product.title}</h3>
                <h3 className="ml-4 lg:hidden text-slate-700 mb-6">{product.category}</h3>
                <Carousel product={product}/> 
            </div>
            <div className="flex flex-col justify-center mx-4 md:mx-10 lg:my-48 px-6 xl:px-8 lg:py-6 lg:bg-gray-50 lg:shadow-md shadow-gray-400/30 rounded-2xl xl:ml-28 xl:max-w-xl z-10">
                <h3 className="hidden lg:block text-gray-400 text-3xl">{product.title}</h3>
                <h3 className="hidden lg:block text-xl text-slate-700 mb-4">{product.description}</h3>
                <h3 className="text-gray-500 font-bold text-2xl my-4">${product.price}</h3>
                <p className="mb-2">{product.description}</p>
                { count === 0 ? 
                    <ItemCount initial={1} stock={product.stock} onAdd={onAdd} product={product} />
                    : <ItemCart product={product} />
                }
            </div>
        </div>
    </>
    )
}

export default ItemDetail

