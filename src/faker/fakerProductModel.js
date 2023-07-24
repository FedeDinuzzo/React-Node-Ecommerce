import { Schema, model } from "mongoose";

const fakerProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  }
})

const fakerProductModel = model("fakerProducts", fakerProductSchema);
export default fakerProductModel;

