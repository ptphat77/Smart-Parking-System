const loginRegisterService = require('../services/loginRegisterService');

const showLogin = (req, res) => {
    return res.render('login');
};

const showRegister = (req, res) => {
    return res.render('register');
};

const handleLogin = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    try {
        let user = await loginRegisterService.checkUserLogin(username, password)
        console.log(user);
        if(user) {
            res.redirect('/');
        }else {
            res.status(400).json('Dang nhap khong dung');
        }
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const handleRegister = async (req, res) => {
    try {
        await loginRegisterService.registerNewUser(req.body);
        res.redirect('/login');
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

module.exports = {
    handleLogin,
    showRegister,
    showLogin,
    handleRegister,
};
