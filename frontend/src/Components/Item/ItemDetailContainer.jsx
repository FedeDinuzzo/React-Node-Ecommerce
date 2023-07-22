import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getProductByCode } from "../../MongoDB/ProductMongo";
import Loader from '../Loader';

function ItemDetailContainer() {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProductByCode()
        .then(prod => setItem(prod))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, []);

    return (
    <>
        {loading ? <div className="h-96 grid justify-center mt-48 pb-96"><Loader /></div> 
        : <ItemDetail product={item} /> }
    </>
    )
}

export default ItemDetailContainer