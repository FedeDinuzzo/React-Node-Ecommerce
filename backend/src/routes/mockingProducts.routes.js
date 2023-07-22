import { Router } from 'express'
import { postFakerUser , getFakerProducts } from '../faker/fakerProductController.js'

const routerMockingProducts = Router()

routerMockingProducts.route("/")
  .get(getFakerProducts)
  .post(postFakerUser)
  
export default routerMockingProducts