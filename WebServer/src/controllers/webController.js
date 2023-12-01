const handleRegister = (req, res) => {
    return res.render('register');
};

const handleLogin = (req, res) => {
    return res.render('login');
};

module.exports = {
    handleRegister,
    handleLogin,
};
