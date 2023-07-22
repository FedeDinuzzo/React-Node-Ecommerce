import { toast } from 'react-toastify';

export const getProducts = async (limit, page, category, stock, sort, token) => {
    const response = await fetch(`http://localhost:4000/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    const products = await response.json();
    console.log(products.payload);
    return products.payload;
  };

  export const getProductByCode = async () => {
    const response = await fetch(`http://localhost:4000/api/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
        },
        // body: JSON.stringify(code)//
    })
    const product = await response.json()
    return product
}

export const createProduct = async (product, cookies) => {
  const response = await fetch(`http://localhost:4000/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `jwtCookies=${cookies.jwtCookies}`
    },
    credentials: 'include',
    body: JSON.stringify(product)
  });
  // redireccionar a login si no existe jwtCookies
  response.status == 200 ?
    toast.success(`${product.title} created`, {
      position: "bottom-left",
      width: "200px",
    })
  :
    toast.error(`Error at creating ${product.title}`, {
      position: "bottom-left",
      width: "200px",
    })
}

