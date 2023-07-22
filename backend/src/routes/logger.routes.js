import { Router } from "express"

// "/"
const routerLogger = Router()

routerLogger.route("/")
  .get((req, res) => {
    req.logger.fatal(`${new Date().toLocaleTimeString()} - ERROR FATAL in all categories`)
    req.logger.error(`${new Date().toLocaleTimeString()} - ERROR at loading phones category`)
    req.logger.warn(`${new Date().toLocaleTimeString()} - Warning, x product not found`)
    req.logger.info(`${new Date().toLocaleTimeString()} - info, all works ok`)
    req.logger.debug(`${new Date().toLocaleTimeString()} - debug, all works ok`)
    res.send("Testing logger")
  })

export default routerLogger