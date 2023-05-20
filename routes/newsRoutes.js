const express = require('express')
const NewsFeedsController = require('./../controllers/newsFeedsController')
const authController = require('./../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(NewsFeedsController.getAllNews)
    .post(authController.protect,
        authController.restrictTo('sme'),NewsFeedsController.createNews)
    

router
    .route('/:id')
    .get(NewsFeedsController.getNews)
    .patch(NewsFeedsController.updateNews)
    .delete(
        NewsFeedsController.deleteNews,
    )

module.exports = router