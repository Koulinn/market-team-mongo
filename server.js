

import express from "express";
import cors from "cors";
import lib from "./src/lib/server-config.js";
import productRouter from "./src/products/index.js";
import CartRouter from "./src/Shopping-Cart/index.js";
import mongoose from "mongoose";
import reviewRouter from "./src/reviews/index.js"


const { corsConfig } = lib;

const server = express();
const { PORT } = process.env;

server.use(express.json());
server.use(cors(corsConfig));

//////////////////////////////////////////////////
///////////Router
//////////////////////////////////////////////////

server.use("/products", productRouter);
server.use("/shoppingCart", CartRouter);

server.use('/reviews',reviewRouter)


mongoose.connect(process.env.MONGO_CONN);
mongoose.connection.on("connected", () => {

  try {
    console.log("Mongo connected");
    server.listen(PORT, async () => {
      console.log("Server running on ", PORT);
    });
    mongoose.connection.on("error", (error) => {
      console.log("Mongo error: ", error);
    });
    server.on("error", (error) => console.log("Crash ", error));
  } catch (error) {
    console.log(error);
  }
});
