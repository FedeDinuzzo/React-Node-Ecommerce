import { Router } from "express";
import { requireAuth, destroySession } from "../controllers/session.controller.js";
import {productView, cartView, loginView, registerView, recoverPassword, recoverChange, recoverChangePassword} from '../controllers/view.controller.js'

const routerProductsHtmlViews = Router()

routerProductsHtmlViews.get('/', requireAuth, productView)
routerProductsHtmlViews.get('/login', loginView)
routerProductsHtmlViews.get('/register', registerView)
routerProductsHtmlViews.get('/products', requireAuth, productView)
routerProductsHtmlViews.get('/carts/:cid',requireAuth, cartView )
routerProductsHtmlViews.get('/recoverPassword',recoverPassword )
routerProductsHtmlViews.get('/recoverChange',recoverChange )
routerProductsHtmlViews.get('/recoverChangePassword',recoverChangePassword )
routerProductsHtmlViews.get('/logout',destroySession )

export default routerProductsHtmlViews


