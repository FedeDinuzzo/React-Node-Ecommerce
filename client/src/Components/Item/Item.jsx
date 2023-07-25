import { Link } from 'react-router-dom';
import "./item.css";

function Item({_id, title, price, thumbnail}) {
  //render the item and its design
  return (
    <div>
      <div className="m-4 flex flex-col justify-center">
        <div className=" relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"/>
          <div className="relative py-6 bg-white ring-1 ring-gray-900/5 rounded-xl leading-none flex items-top justify-start space-x-6">
            <div key={_id} className="h-96 justify-center text-center m-auto">
              <Link to={`/item/${_id}`}>
                <img src={thumbnail[0]} height="288" width="183" alt="producto" loading="lazy" className="m-auto h-72  transition ease-in hover:-translate-y-1 hover:scale-110 duration-200" />
              </Link>
              <h3 className="mb-2 text-gray-500 font-bold">${price}</h3>
              <h3 className="text-gray-400">{title}</h3>
              <Link to={`/item/${_id}`}>
                <button className="fondo flex rounded px-3 py-1 justify-center align-centent text-white text-lg mx-auto my-4"
                >VIEW DETAIL</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Item