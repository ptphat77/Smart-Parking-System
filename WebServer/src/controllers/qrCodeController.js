const qrCode = require('qrcode');
const fs = require('fs');

const qrService = require('../services/qrService');
const userService = require('../services/userService');
import { io } from '../server';

const checkUsername = async (req, res) => {
    const token = req.body.token;

    const userInfo = await qrService.getUserInfoByToken(token);

    const username = userInfo.username;

    if (username) {
        // Payment if booking
        if (userInfo.userStatus === 1) {
            await userService.paymentBooking(username);
            const userStatus = 2;
            await userService.setUserStatus(username, userStatus);

            io.emit('fetch slot data', 'Broadcast success!!!');
        }

        // Snapshot
        qrService.snapshot(username);

        // Open door
        // await fetch(process.env.IOT_URL).then((resoponse) => {
        //     if (resoponse.status === 200) {
        //         console.log('Open gate successfully');
        //     }
        // });

        // Announce to qr scan tool
        return res.status(200).json({ username });
    } else {
        return res.status(200).json({ message: 'Not found username' });
    }
};

const getImage = async (req, res) => {
    const token = req.body.token;

    const userInfo = await qrService.getUserInfoByToken(token);

    const imgName = userInfo.imgName;

    if (imgName) {
        console.log('__dirname:', __dirname);
        const imgPath = `../carInfoImg/${imgName}.png`;
        let imgSrc = '';
        
        // Get the image
        const buffer = fs.readFileSync(imgPath);
        const base64Image = Buffer.from(buffer).toString('base64');
        imgSrc = `data:image/jpeg;base64,${base64Image}`;

        return res.status(200).json({ imgSrc });
    } else {
        return res.status(200).json({ message: 'Not found image' });
    }
};

const getQrCode = async (req, res) => {
    const userStatus = req.session.info.userStatus;

    if (userStatus !== 2) {
        const username = req.session.info.username;

        const token = await qrService.createToken(username);

        let qrString = await qrCode.toDataURL(token);

        return res.status(200).json(qrString);
    } else {
        return res.status(200).json(null);
    }
};

module.exports = {
    checkUsername,
    getQrCode,
    getImage,
};
