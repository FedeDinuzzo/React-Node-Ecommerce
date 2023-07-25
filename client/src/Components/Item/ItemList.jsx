
import Item from './Item';

function ItemList({ products }) {
  //Maps the products to render them with the Item layout, in the itemList or in the ItemCategory
  //Also slices the prodcuts map to limit the visible amount and improve rendering times
  return (
    <>
    {products.map((item, _id) => 
        <Item key={_id} {...item} />
    )} 
    </>
  )
}

export default ItemList