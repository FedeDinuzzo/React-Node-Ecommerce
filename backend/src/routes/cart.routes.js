import { Router } from "express"
import { deleteProductsCart, putProductsCart, getCart, addProductInCart, putQuantityProduct, deleteProductCart, postCart, purchaseCart } from "../controllers/cart.controller.js"
import { passportMessage } from "../utils/passportMessage.js";
import { roleVerification } from "../utils/rolVerification.js"
import { roles } from "../utils/dictionary.js"

// "/api/carts"
const routerCarts = Router()

routerCarts.post("/", postCart)

routerCarts.route("/:cid") 
  .get(getCart)
  .delete(deleteProductsCart)
  .put(putProductsCart)

routerCarts.route("/:cid/products/:pid")
  .post(passportMessage('jwt'), roleVerification([roles.user]), addProductInCart)
  .put(passportMessage('jwt'), roleVerification([roles.user]), putQuantityProduct)
  .delete(deleteProductCart)

  
routerCarts.route("/:cid/purchase")
  .post(passportMessage('jwt'), roleVerification([roles.user]), purchaseCart)

export default routerCarts