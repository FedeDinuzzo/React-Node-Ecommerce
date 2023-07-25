import fakerProductModel from '../faker/fakerProductModel.js';

export const findFakerProducts = async () => {
  try {
      const fakerProducts = await fakerProductModel.find()
      return fakerProducts
  } catch (error) {
      throw new Error(error)
  }
}

export const createFakerProduct = async (fakerProduct) => {
  try {
      const newFukerProduct = await fakerProductModel(fakerProduct)
      await newFukerProduct.save()
      return newFukerProduct
  } catch (error) {
      throw new Error(error)
  }
}