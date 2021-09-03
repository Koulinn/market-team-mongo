import mongoose from "mongoose"

const { Schema, model } = mongoose

const CartSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price:{
      type: String,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    },
    productID:{
      type: String,
      required: true,
    },
    totalItemPrice:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
)

export default model("Cart", CartSchema) // bounded to "users" collection

// seperate crud for embeded values check purchase history in riccardos code

