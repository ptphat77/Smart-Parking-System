const userService = require('../services/userService');

const autoCancel = require('../utils/autoCancel');
import { io } from '../server';

const getHomePage = async (req, res) => {
    console.log('Session Info: ', req.session.info);
    if (req.session.info) {
        return res.render('home', {
            url: process.env.SERVER_URL,
            port: process.env.PORT,
            sessionInfo: req.session.info,
        });
    } else {
        return res.redirect('/login');
    }
};

const bookingRequest = async (req, res) => {
    try {
        const username = req.session.info.username;
        const userStatus = 1;
        console.log('setStartTime: ', userService.paymentParking);
        const data = await userService.setStartTime(username);
        const totalTime = Math.round(data.balance / 0.5);
        await autoCancel.timeoutCancel(username, totalTime);
        // await userService.setUserStatus(username, userStatus);

        io.emit('fetch slot data', 'Broadcast success!!!');
        req.session.info.userStatus = userStatus;

        return res.status(200).json('success');
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const bookingStatus = async (req, res) => {
    try {
        const username = req.session.info.username;
        const userStatus = await userService.getUserStatus(username);

        return res.status(200).json(userStatus);
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const cancelBooking = async (req, res) => {
    try {
        const username = req.session.info.username;
        const userStatus = 0;
        await userService.paymentBooking(username);
        await userService.setUserStatus(username, userStatus);

        io.emit('fetch slot data', 'Broadcast success!!!');
        req.session.info.userStatus = userStatus;

        return res.status(200).json('success');
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const getBalance = async (req, res) => {
    const username = req.session.info.username;

    const balance = await userService.getBalanceUser(username);

    return res.status(200).json(balance);
};

module.exports = {
    getHomePage,
    bookingRequest,
    cancelBooking,
    bookingStatus,
    getBalance,
};
