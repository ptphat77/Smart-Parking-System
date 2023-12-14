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
    const data = await User.findOne({ token }, 'username userStatus');

    if (data) {
        return data;
    } else {
        return null;
    }
};

const snapshot = async (username) => {
    const imgName = randomstring.generate({
        length: 16,
    });

    await User.updateOne({ username }, { imgName });

    await fetch(process.env.SNAPSHOT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgName }),
    }).then((resoponse) => {
        if (resoponse.status === 200) {
            console.log('Snapshot successfully');
        }
    });
};

module.exports = {
    createToken,
    removeToken,
    getToken,
    getUserInfoByToken,
    snapshot,
};
