const mongoose = require('mongoose')
const validator = require('validator')


const newsFeedsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A name should be unique'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: [
      40,
      'A news description must have less or equal than 40 characters',
    ],
    minLength: [
      10,
      'A news description must have more or equal than 10 characters',
    ],
},
publishedAt: {
  type: Date,
  default: Date.now(),
},
content: {
  type: String,
  required: true,
  trim: true,
},
imageCover: {
  type: String,
  required: [true, 'A tour must have a cover image'],
},
isPublished: {
  type: Boolean,
  default: false,
},
publishedBy: {
  type: String,
},
//SME: Subject Matter Experts
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'News must belong to a Users.']
  },
})


newsFeedsSchema.pre(/^find/, function(next){
this.populate({
  path: 'user',
  select: 'name'
})
next()
})
const newsFeed = mongoose.model('NewsFeeds', newsFeedsSchema)
module.exports = newsFeed
