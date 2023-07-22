import dotenv from 'dotenv'
import { Command } from 'commander'
import { environment as dicEnvironment } from '../utils/dictionary.js'
import { __dirname } from "../path.js"

const program = new Command()

program
  .option('--mode <mode>', "Enter work mode", 'dev')
program.parse()

const enviroment  = program.opts().mode

console.log("Enter the environment command:", enviroment)

dotenv.config({
  path: enviroment === dicEnvironment.development ? "./.env.dev" : "./.env.prod"
})

console.log("Using enviroment: ", process.env.ENVIRONMENT)

export const env = {
  environment: process.env.ENVIRONMENT,
  port: process.env.PORT,
  urlMongoDb: process.env.URLMONGODB,
  dbSelection: process.env.DBSELECTION,  
  cookieSecret: process.env.COOKIE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  signedCookie: process.env.SIGNED_COOKIE,
  salt: process.env.SALT,
  clientIdGithub: process.env.CLIENT_ID_GITHUB,
  clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
  clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
  clientSecretGoogle: process.env.CLIENT_SECRET_GOOGLE,
  mailPass: process.env.MAIL_PASS
}

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: "Cart documentation",
      description: "Online Cart for Coderhouse"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`] // Where the documents lie
}