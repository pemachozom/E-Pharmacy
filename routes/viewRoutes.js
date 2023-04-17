const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController.js')

router.get('/', viewsController.getHome)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignForm)

module.exports = router