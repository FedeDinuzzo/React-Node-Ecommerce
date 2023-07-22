import productModel from "../models/MongoDB/productModel.js"

export const paginateProducts = async (filter, options) => {
  try {
    return await productModel.paginate(filter, options)
  } catch (error) {
    throw error
  }
}

export const findProductById = async (pid) => {
  try {
    const product = await productModel.findById(pid)
    return product
  } catch (error) {
    throw new Error(error)
  }
}

export const createProduct = async (product) => {
  try {
    const newPoduct = await productModel(product)
    await newPoduct.save()
    return newPoduct
  } catch (error) {
    throw new Error(error)
  }
}

export const updateProduct = async (pid, data) => {
  try {
    return await productModel.findByIdAndUpdate(pid, data)
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteProductServ = async (pid) => {
  try {
    return await productModel.findByIdAndDelete(pid)
  } catch (error) {
    throw new Error(error)
  }
}