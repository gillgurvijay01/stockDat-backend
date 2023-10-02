const errorHandler = (err,req,res,next) =>{
    err.message = err.message || "Internal Server Error"
    return res.status(500).send({success:false,message:err.message})
}
module.exports = errorHandler;