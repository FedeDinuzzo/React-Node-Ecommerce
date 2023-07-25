import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import Hero from '../Hero'
import { useParams } from 'react-router-dom';
import Categories from '../Categories';
import { getProducts } from '../../MongoDB/ProductMongo'

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    if (category) { //Consulto si me ingresaron un parametro en la url
      getProducts()
        .then(products => {
          const productosFiltrados = products.filter(prod => prod.stock > 0).filter(prod => prod.idCategoria === parseInt(category))
          setItems(productosFiltrados)

        })
    } else {
      getProducts()
        .then(products => {
          const productosFiltrados = products.filter(prod => prod.stock > 0)
          setItems(productosFiltrados)
        })
    }

  }, [category]);
    
    return (
      <>
        <Hero />
        <Categories /> 
        <div className="bg-gray-50">
          <div className="z-10 grid px-4 md:px-0 mx-auto pt-20 pb-16 p-2 sm:grid-cols-1 md:grid-cols-2 md:max-w-2xl lg:grid-cols-3 lg:max-w-4xl xl:grid-cols-4 xl:max-w-7xl">
            <ItemList products={items} />
          </div>
        </div>
      </>
    );
}

export default ItemListContainer;