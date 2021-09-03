const notFoundHandler = (err, req, res, next) =>{
    if(err.status === 404){
        res.send({
            msg: "Not found",
            successState: false
        })
    } else {
        next(err)
    }
}

const forbidden = (err, req, res, next) =>{
    if(err.status === 403){
        res.send({
            msg: "Forbidden",
            successState: false
        })
    } else{
        next(err)
    }
}

const badRequest = (err, req, res, next) =>{
    console.log(res)
    if(err.status === 400){
        res.status(400).send({
            msg: "Bad request, something went wrong",
            successState: false,
            errorMessage: err.errors? err.errors : err
        })
    } else{
        next(err)
    }
}

const serverError = (err, req, res, next) =>{
    res.status(500).send({msg: "I tried my best, but something went terribly wrong"})
}

const errorStatusHandlers = {
    forbidden:forbidden,
    notFoundHandler: notFoundHandler,
    badRequest: badRequest,
    serverError: serverError
}

export default errorStatusHandlers