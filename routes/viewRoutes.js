const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController.js')
const authController = require('./../controllers/authController.js')


router.get('/', viewsController.getHome)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignForm)
router.get('/me', authController.protect, viewsController.getProfile)

module.exports = router