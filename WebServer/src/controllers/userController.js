const userService = require('../services/userService');

const createFunc = async (req, res) => {
    console.log('>>>req, ', req.body);
    await userService.createUser(req.body);
    res.redirect('/login');
};

module.exports = {
    createFunc,
};
