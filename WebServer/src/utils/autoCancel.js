const userService = require('../services/userService');

import { io } from '../server';

let timeoutInfoArray = [];

const timeoutCancel = (username, totalTime) => {
    // payment every 1 minute
    console.log('totalTime: ', totalTime);
    io.emit('fetch slot data', 'Broadcast success!!!');
    const timeoutId = setTimeout(async () => {
        // call payment service
        const userStatus = 0;
        await userService.paymentParking(username);
        await userService.setUserStatus(username, userStatus);

        io.emit('fetch slot data', 'Broadcast success!!!');

        // remove timeoutInfo
        timeoutInfoArray = timeoutInfoArray.filter((item) => item.timeoutId !== timeoutId);

        return;
    }, totalTime * 1000);
    timeoutInfoArray.push({ username, timeoutId });
};

module.exports = {
    timeoutCancel,
};
