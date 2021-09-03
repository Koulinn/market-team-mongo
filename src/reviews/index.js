import express from 'express'
import reviewModel from './schema.js'
import reviews from './reviewsHandlers.js'




const reviewRouter = express.Router()

reviewRouter.route('/')
.get(reviews.getAll)
.post(reviews.reviewPost)

reviewRouter.route('/:reviewId')
.get(reviews.reviewGetOne)
.delete(reviews.reviewDelete)
.put(reviews.reviewUpdate)

export default reviewRouter