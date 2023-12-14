const userService = require('../services/userService');
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
        const isParking = true;
        await userService.setIsParking(username, isParking);
        await userService.setCreatedAtToken(username);

        io.emit('fetch slot data', 'Broadcast success!!!');
        req.session.info.isParking = isParking;

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
        const isParking = false;
        await userService.paymentBooking(username);
        await userService.setIsParking(username, isParking);

        io.emit('fetch slot data', 'Broadcast success!!!');
        req.session.info.isParking = isParking;

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
