const User = require('../models/User');
const loginService = require('../services/loginService');
const Swal = require('sweetalert2');

const checkUserFunc = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    try {
        User.findOne({
            username: username,
            password: password,
        }).then((data) => {
            if (data) {
                res.redirect('/');
            } else {
                res.status(400).json('Dang nhap khong dung');
            }
        });
        console.log('>>>req, ', req.body);
        await loginService.checkUser(req.body);
    } catch (error) {
        res.status(500).json('Dang nhap khong dung hoac co loi ben server');
    }
};

module.exports = {
    checkUserFunc,
};
