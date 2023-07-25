import { Router } from "express";

// "/"
const routerLogger = Router()

routerLogger.route("/")
  .get((req, res)=>{
    req.logger.fatal(`${new Date().toLocaleTimeString()} - ERROR FATAL en todas las categorias`)
    req.logger.error(`${new Date().toLocaleTimeString()} - ERROR en categoria Alimentos`)
    req.logger.warning(`${new Date().toLocaleTimeString()} - Warning,  no se encuentro x producto`)
    req.logger.info(`${new Date().toLocaleTimeString()} - info, todo funciona`)
    req.logger.debug(`${new Date().toLocaleTimeString()} - debug, todo funciona`)
    res.send("Probando logger!")
  })

export default routerLogger