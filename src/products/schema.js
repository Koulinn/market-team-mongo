import moongose from "mongoose";

const { model, Schema } = moongose;

const productsSchema = new Schema({
  name: {
    type: String,
    require: [true, "Product name is requered"],
  },
  description: {
    type: String,
    required: [true, " Product description is requered"],
  },
  brand: {
    type: String,
    required: [true, " Brand  is requered"],
  },
  imageUrl: {
    type: String,
    // required: [true, " Product image is requered"],
  },

  price: {
    type: Number,
    required: [true, " Price is requered"],
  },
  category: {
    type: String,
  },
});

export default model("product", productsSchema);
