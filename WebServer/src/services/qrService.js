const randomstring = require('randomstring');

const User = require('../models/User');
const CheckNumberPlate = require('../models/CheckNumberPlate');

const createToken = async (username) => {
    const token = randomstring.generate({
        length: 32,
    });
    await User.updateOne({ username, isParking: true }, { token });

    return token;
};

const removeToken = async (username) => {
    await User.updateOne({ username }, { token: null });
};

const getToken = async (username) => {
    const data = await User.findOne({ username }, 'token');
    return data.token;
};

const checkNumberPlateExists = async (numberPlate) => {
    const isNumberPlateExists = await CheckNumberPlate.findOneAndDelete({ numberPlate });
    return isNumberPlateExists;
};

const getNumberPlateUser = async (token) => {
    const data = await User.findOne({ token }, 'numberPlate');
    return data.numberPlate;
};

module.exports = {
    createToken,
    removeToken,
    getToken,
    checkNumberPlateExists,
    getNumberPlateUser,
};
