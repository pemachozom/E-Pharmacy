const news = require('./../models/newsModels')


exports.getAllNews = async (req, res) => {
  try {
    const news1 = await news.find()
    res.status(200).json({
      status: 'success',
      results: news1.length,
      data: {
        news1,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    })
  }
}


exports.getNews = async (req, res) => {
  try {
    const news1 = await news.findById(req.params.id)


    res.status(200).json({
      status: 'success',
      results: news1.length,
      data: {
        news1,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}


exports.createNews = async (req, res) => {
  try {
    const newNews = await news.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        news: newNews,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}


exports.updateNews = async (req, res) => {
  try {
    const news1 = await news.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
        status: 'success',
        data: {
            news1,
        },
        })
    } catch (err) {
        res.status(404).json({
        status: 'fail',
        message: err,
        })
    }
}

  
exports.deleteNews = async (req, res) => {
try {
    const news1 = await news.findByIdAndDelete(req.params.id)


    res.status(200).json({
    status: 'success',
    data: {
        news1,
    },
    })
    } catch (err) {
    res.status(404).json({
    status: 'fail',
    message: err,
    })
    }
}
  


