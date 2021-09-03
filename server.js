import express from "express"
import cors from "cors"
import lib from "./src/lib/server-config.js"
import CartRouter from "./src/Shopping-Cart/index.js";
// import productRouter from "./src/Products/index.js";
import mongoose from 'mongoose'



const { corsConfig } = lib


const server = express()
const { PORT } = process.env

server.use(express.json())
server.use(cors(corsConfig))




server.use("/shoppingCart", CartRouter);
// server.use("/products", productRouter);



mongoose.connect(process.env.MONGO_CONN)
mongoose.connection.on('connected', () => {
  try {
    console.log('Mongo connected')
    server.listen(PORT, async () => {
      console.log("Server running on ", PORT)
    })
    mongoose.connection.on('error', error => {
      console.log('Mongo error: ', error)
    })
    server.on("error", (error) =>
      console.log("Crash ", error)
    )

  } catch (error) {
    console.log(error)
  }
})

