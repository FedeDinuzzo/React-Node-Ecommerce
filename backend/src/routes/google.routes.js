import { Router } from "express"
import passport from 'passport'

// "/authGoogle"
const routerGoogle = Router()

// Register
routerGoogle.get('/google', passport.authenticate('google'), async (req, res) => { 
})

// Login
routerGoogle.get('/googleSession', passport.authenticate('google'), async (req, res) => {
    req.session.user = req.user
    console.log("req.session: ", req.session)
    if (req.session.user) {
        req.session.login = true
        const token = req.authInfo.token
        res
        .cookie('jwtCookies',token,{maxAge: 30000})
        .redirect('/api/products')
    } else {
        res.redirect('/login')
    }
})

export default routerGoogle