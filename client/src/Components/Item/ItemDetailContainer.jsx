import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getProductByCode } from "../../MongoDB/ProductMongo";
import Loader from '../Loader';

function ItemDetailContainer() {
    const { _id } = useParams()
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProductByCode(_id)
        .then(product => setItem(product))
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