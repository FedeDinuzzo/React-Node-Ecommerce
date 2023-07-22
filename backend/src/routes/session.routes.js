import { Router } from "express"
import { testLogin, destroySession, changePass, recoverPasswordEmail } from "../controllers/session.controller.js"
import { postUser } from '../controllers/user.controller.js'
import { passportMessage } from "../utils/passportMessage.js"
import { roleVerification } from "../utils/rolVerification.js"
import { roles } from "../utils/dictionary.js"

// "api/session"
const routerUser = Router()

routerUser.post("/register", passportMessage("register"), postUser)

routerUser.post("/login", passportMessage('login'), testLogin)

routerUser.get("/logout", destroySession)

routerUser.put("/changePass", changePass)

routerUser.get('/recoverPasswordEmail/:email', recoverPasswordEmail)

routerUser.get("/current", passportMessage('jwt'), roleVerification([roles.user]), (req, res) => {
  res.send(req.user)
})

export default routerUser