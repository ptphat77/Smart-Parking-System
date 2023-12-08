import bcrypt from 'bcryptjs';

const User = require('../models/User');
import { createJWT } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const checkUserLogin = async (rawUserData) => {
    try {
        let user = await User.findOne({
            username: rawUserData.username,
        });

        if (user) {
            if (checkPassword(rawUserData.password, user.password)) {
                let payload = {
                    username: user.username,
                };

                let token = createJWT(payload);

                return {
                    EM: 'OK!',
                    EC: 0,
                    DT: { access_token: token, username: user.username, balance: user.balance, isParking: user.isParking},
                };
            }
        }
        return {
            EM: 'Your username or password is incorrect',
            EC: 1,
            DT: '',
        };
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

const registerNewUser = async (rawUserData) => {
    try {
        let hashPassword = hashUserPassword(rawUserData.password);
        const user = new User({ ...rawUserData, password: hashPassword });
        await user.save();
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

module.exports = {
    checkUserLogin,
    registerNewUser,
};
