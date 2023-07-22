import { env, swaggerOptions } from './config/config.js'
import express from 'express'
import { __dirname, __filename } from './path.js'
import multer from 'multer'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import passport from 'passport'
import initializePassport from './middlewares/passport.js'
import session from 'express-session'
import errorHandler from './middlewares/errors/errorHandler.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { findMessages, updateMessage } from './services/chatService.js'
import { findUserByEmail } from './services/userService.js'
import { addLogger } from './utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'

const whiteList = ['http://localhost:5173'] // Rutas validas de mi servidor

const corsOptions = { // Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
  origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by Cors'))
      }
  }
}

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img")
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

// Port Server
const app = express() 

// Middlewares
app.use(express.json()) 

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(env.signedCookie))
app.use(errorHandler)

// Session
app.use(session({  
  secret: env.sessionSecret,
  resave: true,
  saveUninitialized: true
}))

// Passport
app.use(passport.initialize())
initializePassport(passport)

// Mongoose
const connectionMongoose = async () => {
  await mongoose.connect(env.urlMongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
}

app.use(addLogger)

connectionMongoose()

// Routes
app.use('/', express.static(__dirname + '/public')) // Public Folder
app.use('/', routes)

// Multer Image
app.post('/upload', upload.single('product'), (req,res) => {
  console.log(req.body)
  console.log(req.file)
  res.send("Image uploaded")
})

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(errorHandler)

app.get('/email', async (req,res)=>{
  await transporter.sendMail({
    from:'federico.dinuzzo.soluciones@gmail.com',
    to: "federicodinuzzo98@gmail.com",
    subject: "Ecommerce",
    html:`
    <div>
      This is an test example ecommerce email
    </div>
    `,
    attachments: []
  })
  res.send("email sent")
})

//if a URL is invalid display a message
app.use((req, res, next)=> {
  res.status(404).send({error:'Error 404 Page Not Found'})
})

// Server launch
app.set("port", env.port || 5000)

const server = app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}`)
})

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')); // __dirname + './views'

//ServerIO
const io = new Server(server)

io.on("connection", async (socket) => {  
  console.log("Socket client connected")
  
  socket.on("loadMessage", async () => {
    const textMessage = await findMessages()
    socket.emit("pushMessage", textMessage)
  })
  
  socket.on("addMessage", async (newMessage) => {
    await updateMessage([newMessage])  

    const textMessage = await findMessages()    
    socket.emit("pushMessage", textMessage)
  })

  socket.on("mailValidation", async (email) => {
    const answer = await findUserByEmail(email) 
    socket.emit("answerMailValidation", answer)
  })
})
