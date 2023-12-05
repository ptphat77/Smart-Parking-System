const getNumberPlate = async (req, res) => {
    const token = req.body;
    console.log('getNumberPlate: ', token);
    return res.sendStatus(200)
};

module.exports = {
    getNumberPlate,
};
