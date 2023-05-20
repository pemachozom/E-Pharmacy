class AppError extends Error{
    constructor (message, statusCode){
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4')? 'fail':'error'
        this.isOperational = true // handle the err that cant be handle by programmer

        Error.captureStackTrace(this, this.constructor)//captureStackTrace
    }

}
module.exports = AppError
