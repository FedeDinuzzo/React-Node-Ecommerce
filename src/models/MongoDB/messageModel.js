import {Schema, model} from "mongoose"

const messageSchema = new Schema({
  name: String, 
  email: {
    type: String    
  },
  message: String
})


const messageModel = model("messages", messageSchema);
export default messageModel;
