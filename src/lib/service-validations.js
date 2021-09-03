import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const productSchema = {
    "name": {
        in: ["body"],
        isString: {
            errorMessage: "Name must be string"
        }
    },
    "description": {
        in: ["body"],
        isString: {
            errorMessage: "description must be string"
        }
    },
    "brand": {
        in: ["body"],
        isString: {
            errorMessage: "brand must be string"
        }
    },
    "imageUrl": {
        in: ["body"],
        isString: {
            errorMessage: "imageUrl must be string"
        }
    },
    "price": {
        in: ["body"],
        isInt: {
            errorMessage: "Price must be a number"
        }
    },
    "category": {
        in: ["body"],
        isString: {
            errorMessage: "category must be string"
        }
    }
}

const reviewSchema = {
    "comment": {
        in: ["body"],
        isString: {
            errorMessage: "Comment must be string"
        }
    },
    "rate": {
        in: ["body"],
        isInt: {
            errorMessage: "description must be string"
        }
    },
    "product": {
        in: ["body"],
        isInt: {
            errorMessage: "description must be string"
        }
    }
}



const validateProductsBody = checkSchema(productSchema)
const validateReviewBody = checkSchema(reviewSchema)

const checkSchemaErrors = (req, res, next)=>{
    try {
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            next(createError(400, "Validation error", errors))
        } else{
            next()
        }
    } catch (error) {
        next()
    }
}


const validations = {
    validateProductsBody: validateProductsBody,
    checkSchemaErrors: checkSchemaErrors,
    validateReviewBody: validateReviewBody
}

export default validations