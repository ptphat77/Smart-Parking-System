const loginRegisterService = require('../services/loginRegisterService');

const showLogin = (req, res) => {
    return res.render('login', {errorMessage: undefined});
};

const showRegister = (req, res) => {
    return res.render('register');
};

const handleLogin = async (req, res) => {

    try {
        let data = await loginRegisterService.checkUserLogin(req.body)
        if(!data.EC) {
            res.redirect('/');
        }else {
            // res.status(400).json(data.EM);
            res.render('login', {errorMessage: data.EM});
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
