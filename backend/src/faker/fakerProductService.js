import fakerProductModel from '../faker/fakerProductModel.js'

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
    const newFakerProd = await fakerProductModel(fakerProduct)
    await newFakerProd.save()
    return newFakerProd
  } catch (error) {
    throw new Error(error)
  }
}