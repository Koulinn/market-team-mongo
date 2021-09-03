import mongoose from "mongoose";

const{Schema,model} = mongoose

const reviewSchema = new Schema({
    comment:{type: String,required:true} ,
	rate: {type: Number,required:true},
	product:{type:Schema.Types.ObjectId,ref:'product'}
},{
    timestamps:true
})

export default model("Review",reviewSchema)