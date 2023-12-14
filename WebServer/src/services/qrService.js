const randomstring = require('randomstring');

const User = require('../models/User');

const createToken = async (username) => {
    const token = randomstring.generate({
        length: 32,
    });
    await User.updateOne({ username }, { token });

    return token;
};

const removeToken = async (username) => {
    await User.updateOne({ username }, { token: null });
};

const getToken = async (username) => {
    const { token } = await User.findOne({ username }, 'token');
    return token;
};

const getUserInfoByToken = async (token) => {
    console.log("getUserInfoByToken1");

    const data = await User.findOne({ token }, 'username userStatus');
    console.log("getUserInfoByToken2");
    if(data) {
        return data;
    } else {
        return null;
    }
};

module.exports = {
    createToken,
    removeToken,
    getToken,
    getUserInfoByToken,
};
