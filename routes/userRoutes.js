const express = require('express')
const userController = require('./../controllers/userController.js')
const authController = require('./../controllers/authController.js')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)


// router.patch(
//     '/updateMyPassword',
//     authController.protect,
//     authController.updatePassword,
// )

// router.patch(
//     '/updateMe',
//     authController.protect,
//     userController.uploadUserPhoto,
//     userController.updateMe,
// )
router  
    .route('/')   //giving file path 
    .get(userController.getAllUsers)   //
    .post(userController.createUser)
 
router
    .route('/:id') //redirect usercontroller
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)



module.exports = router 