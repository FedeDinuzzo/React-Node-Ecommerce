import cartModel from '../models/MongoDB/cartModel.js';

export const findCartById = async (cid) => {
	try {
			const cart = await cartModel.findById(cid)
			return cart		
	} catch (error) {
			throw new Error(error);
	}
}

export const createCart = async () => {
	try {
			const newCart = await cartModel()
			await newCart.save()
			return newCart
	} catch (error) {
			throw new Error(error);
	}
}

export const deleteCart = async (cid) => {
	try {
			return await cartModel.findByIdAndDelete(cid);
	} catch (error) {
			throw new Error(error);
	}
}

export const updateCart = async (cid, data) => {
	try {
			return await cartModel.findByIdAndUpdate(cid, data);
	} catch (error) {
			throw new Error(error);
	}
}

export const  deleteProducts = async (cid)=>{
	
  try {
    const cart = await cartModel.findById(cid)
    cart.products = []
    await cart.save()
    return cart
    
  } catch (error) {
    throw new Error(error)    
  }
}

export const updateProductsCart = async (cid, products)=>{
  try{
      const cart = await cartModel.findById(cid)
      cart.products = products
      await cart.save()
      return cart
  } catch (error) {
      throw new Error(error)    
  }
}