import express from "express"
import createError from "http-errors"

import CartModel from "./schema.js"

const CartRouter = express.Router()

CartRouter.post("/:productID", async (req, res, next) => {
  try {

    const product_ID = req.params.productID

    console.log(product_ID)

    const filter = { productID: product_ID }

    const product = await productModel.findById(product_ID)

    console.log(product)

    const update = { name: product.name,
                    brand: product.brand,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    totalItemPrice: product.price,
                    $inc: { quantity: 1} }

    let newCartItem = await CartModel.findOneAndUpdate(filter, update, {
      new: true
    })

    const cartTotal = newCartItem.price*newCartItem.quantity

    console.log(cartTotal)


  
    const updatedTotal = await CartModel.findByIdAndUpdate(newCartItem._id, { totalItemPrice: cartTotal }, {
      new: true, // to use existing record n
      runValidators: true,
    })




    // const { _id } = await newCartItem.save()

    res.status(201).send( updatedTotal )

  } catch (error) {

    if (error.name === "ValidationError") {

      next(createError(400, error))

    } else {

      console.log(error)

      next(createError(500, "An error occurred while adding item to cart."))
    }
  }
})

CartRouter.get("/", async (req, res, next) => {
  try {

    const cartItems = await CartModel.find()

    res.send(cartItems)

  } catch (error) {

    next(createError(500, "An error occurred while getting cart list "))

  }
})

CartRouter.get("/:cartID", async (req, res, next) => {
  try {

    const cartItemID = req.params.cartID

    const cartItem = await CartModel.findById(cartItemID)

    if (cartItem) {
      res.send(cartItem)
    } else {
      next(createError(404, `Cart Item with _id ${cartItemID} not found!`))
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting cart item"))
  }
})

CartRouter.delete("/:cartID", async (req, res, next) => {
  try {
    const cartItemID = req.params.cartID

    const deletedCartItem = await CartModel.findByIdAndDelete(cartItemID)

    if (deletedCartItem) {
      res.status(204).send()
    } else {
      next(createError(404, `Cart Item with _id ${cartItemID} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting author ${req.params.authorId}`))
  }
})

// CartRouter.put("/:authorId", async (req, res, next) => {
//   try {
//     const cartItemID = req.params.authorId

//     const updatedAuthor = await CartModel.findByIdAndUpdate(authorId, req.body, {
//       new: true, // to use existing record n
//       runValidators: true,
//     })

//     if (updatedAuthor) {
//       res.send(updatedAuthor)
//     } else {
//       next(createError(404, `Author with _id ${authorId} not found!`))
//     }
//   } catch (error) {
//     next(createError(500, `An error occurred while updating author ${req.params.authorId}`))
//   }
// })

// CartRouter.get("/:authorId/blogs/", async (req, res, next) => {
//   try {

//     const authorId = req.params.authorId

//     console.log(authorId)

//     const authorSearch = String(authorId)

//     console.log(authorSearch)

//     const blogsByAuthor = await BlogModel.find({ author: { $in: authorSearch }}, 
//     function(err, result) {
//       if (err) {
//         res.send(err);
//       }
//       })

//     if (blogsByAuthor) {
//       console.log(blogsByAuthor)
//       res.send(blogsByAuthor)
//     } else {
//       next(createError(404, `Author with _id ${authorId} not found!`))
//     }
//   } catch (error) {
//     next(createError(500, "An error occurred while getting author"))
//   }
// })

export default CartRouter
