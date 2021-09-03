import reviewModel from './schema.js'
import createError from 'http-errors'




const getAll = async(req,res,next)=>{try {
    const reviews = await reviewModel.find().populate('product')
    res.send(reviews)
} catch (error) {
    next(error)
}}

const reviewPost = async(req,res,next)=>{try {
    const newReview = new reviewModel(req.body)
    const allReview = await newReview.save()
    res.status(201).send(allReview) 
} catch (error) {
    next(error)
}}

const reviewGetOne = async(req,res,next)=>{
    try {
        const reviewId = req.params.reviewId
        const review = await reviewModel.findById(reviewId).populate('product')
        if(review){
            res.send(review)
        }else{ next(createError(404, `blog with id ${req.params.reviewId} not found!`))}
    } catch (error) {
        next(error)
    }
}
const reviewDelete = async(req,res,next)=>{
    try {
        const reviewId = req.params.reviewId
        const deleteReview = await reviewModel.findByIdAndDelete(reviewId)
        if(deleteReview){
            res.send(deleteReview)
        }else{ next(createError(404, `review with id ${req.params.reviewId} not found!`))}
    } catch (error) {
        next(error)
    }
}
const reviewUpdate = async(req,res,next)=>{
    try {
        const reviewId = req.params.reviewId
        const modifiedReview = await reviewModel.findByIdAndUpdate(reviewId,req.body,{
            new:true
        })
        if(modifiedReview){
            res.send(modifiedReview)
        }else{ next(createError(404, `blog with id ${req.params.reviewId} not found!`))}
    } catch (error) {
        next(error)
    }
}

const reviews = {
  getAll:getAll,
  reviewPost:reviewPost,
  reviewGetOne:reviewGetOne,
  reviewDelete:reviewDelete,
  reviewUpdate:reviewUpdate
}
export default reviews