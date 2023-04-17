const path = require('path')

/*SIGN UP PAGE*/

exports.getLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../','views', 'login.html'))
}

 /* SIGN UP PAGE */

exports.getSignForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'))
}

 /*HOME PAGE*/

 exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'))
}