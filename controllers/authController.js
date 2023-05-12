const User = require('./../models/userModels')
const jwt = require ('jsonwebtoken')
const AppError = require('./../utils/appError')
const { promisify, isNullOrUnderdefined} = require('util')


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn :  process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ), 
        httpOnly: true, 
    }

    res.cookie('jwt', token, cookieOptions)
    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }
    })
    

}
exports.signup = async (req, res, next) => {
    try{
    const newUser = await User.create(req.body)

    createSendToken(newUser, 201, res)
    // const token = signToken(newUser._id)

    // res.status(201).json({
    //     status : 'success',
    //     token,
    //     data : {
    //         user : newUser
    //     }
    // }
    
    // )
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
}

exports.login = async (req, res, next) => {
    try{
        console.log(req.headers)
        const { email, password} = req.body

        if( !email || !password ){
            return next(new AppError('Please provide an email and password!', 400))
        }
        
        // 1.check if user exists && password is correct
        const user = await User.findOne({email}).select('+password')
         //fetch document(particular users)and check and store it as a user
        //user.findOne(find particular info) is document that is the part of data
        //collection in local database is users

         // 2. check if user exists&& password is correct
        const correct = await user.correctPassword(password, user.password)

        if (!user || !correct) {
            return next(new AppError('Incorrect email and password!', 401))
        }

        // if (!user || ! (await user.correctPassword(password, user.password))) {
        //     return next(new AppError('Incorrect email and password!', 401))
 
        // }
      
        //3.if everthing ok, send token to client
        createSendToken(user, 200, res)

        // const token = signToken(user._id)
        // res.status(200).json({
        //     status : 'success',
        //     token
        // })
            
            
    }

    catch(err) {
        res.status(500).json({error: err.message});

    }
}
exports.logout = (req,res)=>{
    res.cookie('token','',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly:true,
    })
    res.status(200).json({status:'success'})
}

exports.protect = async (req, res, next)=>{
    try{
        // 1. getting token and check of its there
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1]
        }
        else if (req.cookies.jwt){
            token = req.cookies.jwt
        }
        if (!token){
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401),
            )
        }

        // 2. Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decoded)

        // 3. Check if user still exists
        const freshUser =await User.findById(decoded.id)
        if (!freshUser){
            return next(
                new AppError('The user belonging ot this token is no longer exist', 401),
            )
        }
        // Grant access to protected route
        req.user=freshUser
        next()

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}


