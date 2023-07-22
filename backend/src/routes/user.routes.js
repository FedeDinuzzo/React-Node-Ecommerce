import { Router } from 'express'
import { getUsers } from "../controllers/user.controller.js"

// "/api/user"
const routerUser = Router()

routerUser.route("/")
  .get(getUsers)

export default routerUser