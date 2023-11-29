const slotService = require('../services/slotService');

const getHomePage = async (req, res) => {
    return res.render('home');
};

module.exports = {
    getHomePage,
};
