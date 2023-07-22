import { Schema, model } from "mongoose"

const chatSchema = new Schema({
  name: String, 
  email: {
    type: String    
  },
  message: String
})


const chatModel = model("messages", chatSchema)
export default chatModel