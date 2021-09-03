import express from "express"
import validations from "../lib/service-validations.js"

const {validateBody, checkSchemaErrors} = validations

const router = express.Router()

router
  .route("/")
  .post(validateBody, checkSchemaErrors
//       async (req, res, next)=>{
//       console.log('Heloooooo')
//       res.send(req.body)
//   }
  )


export default router
