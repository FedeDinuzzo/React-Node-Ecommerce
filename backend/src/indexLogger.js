import express from 'express'
import { addLogger } from './utils/logger.js'

const app = express()
app.use(addLogger)

routerLogger.route("/")
  .get((req, res) => {
    req.logger.fatal(`${new Date().toLocaleTimeString()} - ERROR FATAL in all categories`)
    req.logger.error(`${new Date().toLocaleTimeString()} - ERROR at loading phones category`)
    req.logger.warning(`${new Date().toLocaleTimeString()} - Warning, x product not found`)
    req.logger.info(`${new Date().toLocaleTimeString()} - info, all works ok`)
    req.logger.debug(`${new Date().toLocaleTimeString()} - debug, all works ok`)
    res.send("Testing logger")
  })


app.get("/suma", (req, res) => {
    let suma = 0

    for (let i = 0; i < 10000; i++) {
      suma += i
    }

    res.send(suma)
})


app.listen(4000, () => console.log("Server on Port 4000"))