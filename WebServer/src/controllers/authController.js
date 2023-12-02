const loginRegisterService = require('../services/authService');

const getLogin = (req, res) => {
    return res.render('login', { errorMessage: undefined });
};

const getRegister = (req, res) => {
    return res.render('register');
};

const postLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.checkUserLogin(req.body);
        if (!data.EC) {
            res.cookie('jwt', data.DT.access_token, {
                httpOnly: true,
                expiresIn: process.env.JWT_EXPIRES_IN,
                sameSite: 'strict',
            });

            req.session.info = data.DT;
            return res.redirect('/');
        } else {
            return res.render('login', { errorMessage: data.EM });
        }
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const postRegister = async (req, res) => {
    try {
        await loginRegisterService.registerNewUser(req.body);
        return res.redirect('/login');
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const getLogout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
};

module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    getLogout,
};
