import { findCartById, createCart, deleteProducts, updateProductsCart } from '../services/cartService.js'
import { findProductById } from '../services/productService.js'
import { findTicketById, findTicketByCode, findTicketMaxCode, createTicket } from "../services/ticketService.js"
import { updateProduct } from '../services/productService.js'
import CustomError from '../utils/errorsHandler/CustomError.js'
import { EErrors } from '../utils/errorsHandler/enums.js'
import { stockCartErrorInfo } from '../utils/errorsHandler/info.js'
import { mongoose } from "mongoose"

export const postCart = async (req, res) => {  //Insert a new cart
  try {
    const response = await createCart();   
    res.status(200).json(response); 
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })   
  }
}

export const getCart = async (req, res) => { // Retrieves the specified cart
  try {
    const cid = req.params.cid    
    let cart = await findCartById(cid)
        cart = await cart.populate('products.productId')

    if (cart.products.length !== 0 ){
      res.status(200).json(cart)
    } else {
      res.status(200).json("Cart is empty")   
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    })   
  }
}

export const deleteProductsCart = async (req, res) => {  // Empty the cart
  try {
    const cid = req.params.cid
    let answer = await deleteProducts(cid)
    res.status(200).json(answer) 
  
  } catch (error) {
    res.status(500).json({
      message: error.message
    })   
  }
}

export const putProductsCart= async (req, res) => {  // Step on the entire cart with the products sent
  try {
    const cid = req.params.cid
    const products = req.body
    let answer =  await updateProductsCart(cid, products)
    res.status(200).json(answer)
  
  } catch (error) {
    res.status(500).json({
      message: error.message      
    })
  }
}

export const addProductInCart = async (req, res) => {  //Inserta nuevos producto al carrito especificado
  const cid = req.params.cid
  const pid = req.params.pid

  try {
      const product = await findProductById(pid)
            
      if (product) {
        let cart = await findCartById(cid)
            cart = await cart.populate('products.productId')

        const existProduct = cart.products.find(element => element.productId.id === pid)
        
        if (!existProduct) {
          cart.products.push({productId:pid})          
        } else {
          cart.products = cart.products.map((element) =>
          { 
            if (element.productId.id === pid) {
              element.quantity++
              if (element.quantity > element.productId.stock) {

                CustomError.createError({
                  name: "Insufficient stocks",
                  cause: stockCartErrorInfo({cart: element.quantity, stock:element.productId.stock}),
                  message: "Not enough stock to add to the shopping cart",
                  code: EErrors.ROUTING_ERROR
                })
              }
            }                      
            return element             
          })        
        }    
        await cart.save()
        res.status(200).json(cart)
      } else {
        throw new Error("Product dont exist")     
      }      
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const putQuantityProduct = async (req, res) => {  //Modifica cantidades de un producto
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body

  try {
      let cart = await findCartById(cid)
          cart = await cart.populate('products.productId')
      const existProduct = cart.products.find(element => element.productId.id === pid)
    
      if (existProduct) {
        cart.products = cart.products.map((element)=>
        { 
          if ( element.productId.id === pid) {
            element.quantity = quantity

            if (element.quantity > element.productId.stock) {
              
              CustomError.createError({
                name: "Insufficient stocks",
                cause: stockCartErrorInfo({cart: element.quantity, stock:element.productId.stock}),
                message: "Not enough stock to add to the shopping cart",
                code: EErrors.ROUTING_ERROR
              })
            }
          }   
          return element         
        })        
      } else {          
        throw new Error("Product sent dont exist")       
      }
      await cart.save()
      res.status(200).send(cart.products)
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
}

export const deleteProductCart = async (req, res) => {  //Elimina productos del carrito especificado
  const cid = req.params.cid
  const pid = req.params.pid

  try {
    let cart = await findCartById(cid)
    cart = await cart.populate('products.productId')

    const filteredCart = cart.products.filter((element)=> {return element.productId.id!==pid})        
    if (filteredCart.length !== cart.products.length) {      
      cart.products = filteredCart
      await cart.save()
      res.status(200).json(cart)
    } else {
      res.status(200).send("Product dont exist in cart")
    }    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getTicketById = async (req, res) => {  //Recupera todos los productos. puede ser limitado si se informa por URL
  try {
    const tid = req.params.tid    
    const ticket = await findTicketById(tid);
    res.status(200).json(ticket) 

  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
  }
}

export const getTicketByCode = async (req, res) => {  //Recupera todos los productos. puede ser limitado si se informa por URL
  try {
    const code = req.params.code    
    const ticket = await findTicketByCode(code);
    res.status(200).json(ticket) 

  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
  }
}

export const purchaseCart = async (req, res) => { //Inserta nuevo producto
  const cid = req.params.cid
  const mail = req.user.user.email  
  
  // Start a transaction (serve to be able to rollback in case of failure)
  const session = await mongoose.startSession()
                  await session.startTransaction()
  
  try {      
      let cart = await findCartById(cid)
          cart = await cart.populate('products.productId')

      let result = {}
      let ticket = {}
          
      if (cart.products.length > 0) {
        cart.products.forEach(async (product) => {
          if ( product.productId.stock >= product.quantity) {
            if (ticket.amount) {
              ticket.amount += (product.productId.price * product.quantity)
            } else {
              ticket.amount = (product.productId.price * product.quantity)
            }
            await updateProduct(product.productId.id,{stock:(product.productId.stock - product.quantity)})
          } else {
            if (result.outOfStock) {
              result.outOfStock.push(product.productId)
            } else {
              result.outOfStock = [product.productId]
            }
          }
        })
      } else {
        return res.status(200).send("Cart is empty")
      }
    
      let code = await findTicketMaxCode()
      ticket.code = ++code
      ticket.purchase_email = mail      

      await createTicket(ticket)
      await deleteProducts(cid)
      
      await session.commitTransaction()
      await session.endSession()
      //res.status(200).json(cart.products)
      return res.status(200).json(result)

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    return res.status(500).json({
      message: error.message
    }) 
  }
}