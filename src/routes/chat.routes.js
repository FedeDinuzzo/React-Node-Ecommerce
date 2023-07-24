import { Router } from "express";
import { passportMessage } from "../utils/passportMessage.js";
import { roleVerification } from "../utils/rolVerification.js";
import { roles } from "../utils/dictionary.js";

const routerChat = Router()

routerChat.get('/',  passportMessage('jwt'), roleVerification([roles.user]), async (req, res) => {  
  res.render("chat", { //Renderizar el siguiente contenido
    titulo: "Chat ecommerce"    
  })
});

export default routerChat