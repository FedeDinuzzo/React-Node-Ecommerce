import { Router } from 'express';
import { postFakerUser , getFakerProducts} from '../faker/fakerProduct.controller.js';

const routerMockingProducts = Router()
// "/mockingproducts"
routerMockingProducts.route("/")
  .get(getFakerProducts)
  .post(postFakerUser)
  
  
export default routerMockingProducts