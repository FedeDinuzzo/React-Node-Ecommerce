import { toast } from 'react-toastify';

export const getCart = async () => {
  const response = await fetch(`http://localhost:4000/api/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const cart = await response.json();
  console.log(cart)
  return cart;
};

export const deleteProductsCart = async (cookies) => {
  const response = await fetch(`http://localhost:4000/api/carts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `jwtCookies=${cookies.jwtCookies}`,
    },
    credentials: "include"
  });

  response.status == 200 ?
    toast.success("Products removed successfully", {
      position: "bottom-left",
      width: "200px",
    })
  :
    toast.error("Error deleting products try in a few minutes", {
      position: "bottom-left",
      width: "200px",
    })

  const cart = await response.json();
  return cart
};

// routerCarts.route("/:cid") 
//   .put(putProductsCart)

export const addProductInCart = async (pid) => {
  const response = await fetch(`http://localhost:4000/api/carts/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  response.status == 200 ?
    toast.success("Product added successfully", {
      position: "bottom-left",
      width: "200px",
    })
  :
    toast.error("Error adding product try in a few minutes", {
      position: "bottom-left",
      width: "200px",
    })

  const cart = await response.json();
  return cart;
};

export const putQuantityProduct = async (cid, pid, quantity, cookies) => {
  const response = await fetch(`http://localhost:4000/api/carts/${cid}/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(quantity)
  });

  response.status == 200 ?
    toast.success(``, {
      position: "bottom-left",
      width: "200px",
    })
  :
    toast.error(``, {
      position: "bottom-left",
      width: "200px",
    })

  const prodQty = await response.json();
  return prodQty;
};

export const deleteProductCart = async (cid, pid, cookies) => {
  const response = await fetch(`http://localhost:4000/api/carts/${cid}/products/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  response.status == 200 ?
    toast.success("Product removed successfully", {
      position: "bottom-left",
      width: "200px",
    })
  :
    toast.error("Error deleting product try in a few minutes", {
      position: "bottom-left",
      width: "200px",
    })

  const cart = await response.json();
  return cart
};