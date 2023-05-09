const User = require('./../models/userModels')
const jwt = require ('jsonwebtoken')
const AppError = require('./../utils/appError')


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