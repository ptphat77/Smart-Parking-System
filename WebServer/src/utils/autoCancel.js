const userService = require('../services/userService');

import { io } from '../server';

let timeoutInfoArray = [];

const timeoutCancel = (username, totalTime) => {
    // payment every 1 minute
    console.log('totalTime: ', totalTime);
    io.emit('fetch slot status', 'Fetch slot status success!!!');
    const timeoutId = setTimeout(async () => {
        // call payment service
        const price = process.env.BOOKING_PRICE
        await userService.payment(username, price);
        const userStatus = 0;
        await userService.setUserStatus(username, userStatus);

        io.emit('fetch slot status', 'Fetch slot status success!!!');

        removeTimeoutInfo(username);

        return;
    }, totalTime * 1000);
    timeoutInfoArray.push({ username, timeoutId });
};

const removeTimeoutInfo = (username) => {
    let removeTimeoutId = null;
    timeoutInfoArray = timeoutInfoArray.filter((item) => {
        if (item.username === username) {
            removeTimeoutId = item.timeoutId;
            return false;
        }
        return true;
    });
    io.emit(`fetch user status: username(${username})`, 'Fetch user status success!!!');
    clearTimeout(removeTimeoutId);
};

module.exports = {
    timeoutCancel,
    removeTimeoutInfo,
};
