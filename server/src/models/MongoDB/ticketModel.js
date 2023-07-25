import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  purchase_date: {
    type: Date,
    default: Date.now
  }, 
  amount: {
    type: Number,
    required: true
  },
  purchase_email: {
    type: String,
    required: true
  }
});

const ticketModel = model("ticket", ticketSchema);
export default ticketModel