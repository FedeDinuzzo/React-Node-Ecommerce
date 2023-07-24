import {Schema, model} from "mongoose"

const cartsSchema = new Schema({
  products: {
    type:[{
      productId:{
        type: Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: {
        type: Number,
        default:1
      }    
    }], 
    default: []
  }
})

const cartModel = model("carts", cartsSchema);
export default cartModel