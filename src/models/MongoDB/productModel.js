import { Schema, model } from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const productSchema = new Schema({
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
  code: {
    type: String,
    required: true,
    unique: true      
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
  },
  thumbnail: {
    type: Array,
    default: [""]
  }
})

productSchema.plugin(paginate);  

const productModel = model("products", productSchema);
export default productModel;

