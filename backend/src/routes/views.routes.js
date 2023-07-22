import { Router } from "express"
import { requireAuth, destroySession } from "../controllers/session.controller.js"
import { productView, cartView, loginView, registerView, recoverPassword, recoverChange, recoverChangePassword } from '../controllers/view.controller.js'

const routerProdsViews = Router()

routerProdsViews.get('/', requireAuth, productView)
routerProdsViews.get('/login', loginView)
routerProdsViews.get('/register', registerView)
routerProdsViews.get('/products', requireAuth, productView)
routerProdsViews.get('/carts/:cid', requireAuth, cartView)
routerProdsViews.get('/recoverPassword', recoverPassword)
routerProdsViews.get('/recoverChange', recoverChange)
routerProdsViews.get('/recoverChangePassword', recoverChangePassword)
routerProdsViews.get('/logout', destroySession)

export default routerProdsViews