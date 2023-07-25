import { findFakerProducts, createFakerProduct } from '../faker/fakerProductService.js';
import { faker } from '@faker-js/faker';

export const getFakerProducts = async (req, res) => {
  try {
      const fakerProducts = await findFakerProducts()
      res.status(200).json({fakerProducts})

  } catch (error) {
      res.status(500).send({
        message: "Hubo un error en el servidor", 
        error: error.message
      })
  }
}

export const postFakerUser = async (req, res) => {
  try {
    for (let i=0; i< 100 ; ++i) {
      await createFakerProduct(mockingProducts())
    }    

    res.status(200).send("creado los 100 fakerProducts")

  } catch (error) {
    res.status(500).send({
      message: "Hubo un error en el servidor", 
      error: error.message
    })
  }
}

const mockingProducts = () =>  {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    stock: +faker.random.numeric(2),
    category: faker.commerce.product()
  };
}

