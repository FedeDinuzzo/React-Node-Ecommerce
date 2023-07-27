import {env,swaggerOptions} from "./config/config.js"
import express from "express";
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import { __dirname } from "./path.js";
import routers from './routes/routes.js'
import passport from "passport";
import initializePassport from "./middleware/passport.js";
import session from 'express-session';
import errorHandler from "./middleware/errors/errorHandler.js";
import multer from 'multer'
// import {Server} from "socket.io";
import * as path from 'path'
import { engine } from 'express-handlebars';
// import {findMessages, updateMessage} from './services/messageService.js'
// import {findUserByEmail} from './services/userService.js'
import { addLogger } from './utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
//import cors from 'cors'

//const whiteList = ['https://dinuzzo-frontend.vercel.app', 'http://localhost:5173', 'http://localhost:4000'] // Rutas validas de mi servidor

//const corsOptions = { // Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
// origin: (origin, callback) => {
//      if (whiteList.indexOf(origin) !== -1) {
//          callback(null, true)
//      } else {
//         callback(new Error('Not allowed by Cors'))
//     }
// }
//}

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

const app = express(); 

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


// Define los middleware para la aplicación
app.use(express.json());
//app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true })); //Permite realizar consultas en la URL (req.query)
app.use(cookieParser(env.cookieSecret))

//session
app.use(session({  
  secret: env.sessionSecret,
  resave: true,
  saveUninitialized: true
}))

//Passport (usa session)
app.use(passport.initialize())

initializePassport(passport)

//MONGOOSE (set and connection)
const connectionMongoose = async () => {
  await mongoose.connect(env.urlMongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.log(err));
}

app.use(addLogger)

connectionMongoose()

//Routers
app.use('/', routers)

// Multer Image
app.post('/upload', upload.single('product'), (req,res) => {
  console.log(req.body)
  console.log(req.file)
  res.send("Image uploaded")
})


//Public folder
app.use('/', express.static(__dirname + '/public'))

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(errorHandler); 

//if a URL is invalid display a message
app.use((req, res, next)=> {
  res.status(404).send({error:'Lo siento, no se pudo encontrar la página que estás buscando.'});
});

// Configura el puerto del servidor y lo inicia
app.set ("port", env.port || 5000)

const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})

//HandleBars Configuration
app.engine('handlebars', engine());   //configuración del motor de express
app.set('view engine', 'handlebars'); //indica que usaremos el motor de vista handlebars
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'

//ServerIO
// const io = new Server(server)

//SocketIo Server Connection
// io.on("connection", async (socket)=> {  
//   console.log("cliente socket conectado!");  
  
//   socket.on("loadMessage", async () => {
//     const textMessage = await findMessages()
//     socket.emit("pushMessage", textMessage)
//   })
  
//   socket.on("addMessage", async (newMessage) => {
//     await updateMessage([newMessage])  

//     const textMessage = await findMessages()    
//     socket.emit("pushMessage", textMessage)
//   })

//   socket.on("mailValidation",async(email) => {
//     const answer = await findUserByEmail(email) 
//     socket.emit("answerMailValidation", answer)
//   })
// })


