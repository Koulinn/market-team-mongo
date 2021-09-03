import reviewModel from './schema.js'
const getAll = async(req,res,next)=>{try {
    const reviews = await reviewModel.find()
    res.send(reviews)
} catch (error) {
    next(error)
}}

const reviewPost = async(req,res,next)=>{try {
    const newReview = new reviewModel(req.body)
    const {_id} = await newReview.save()
    res.status(201).send({_id}) 
} catch (error) {
    next(error)
}}

const reviewGetOne = async(req,res,next)=>{
    try {
        const reviewId = req.params.reviewId
        const review = await reviewModel.findById(reviewId)
        if(review){
            res.send(review)
        }else{next(`not found`)}
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
        }else{next('not found')}
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
        }else{next('not found')}
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