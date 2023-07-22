import { Router } from "express"

import routerCart from './cart.routes.js'
import routerGithub from "./github.routes.js"
import routerGoogle from "./google.routes.js"
import routerProducts from './products.routes.js'
import routerSession from './session.routes.js'
import routerUser from './user.routes.js'
import routerChat from './chat.routes.js'
import routerMockingProducts from './mockingProducts.routes.js'
import routerLogger from './logger.routes.js'
import routerViews from './views.routes.js'
import routerApidocs from './swagger.routes.js'

const router = Router()

//Routes
router.use('/', routerViews)
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCart)
router.use('/api/user', routerUser)
router.use('/api/session', routerSession)
router.use('/authGithub', routerGithub)
router.use('/authGoogle', routerGoogle)
router.use('/chat', routerChat)
router.use('/mockingproducts', routerMockingProducts)
router.use('/loggerTest', routerLogger)
router.use('/apidocs', routerApidocs)

export default router