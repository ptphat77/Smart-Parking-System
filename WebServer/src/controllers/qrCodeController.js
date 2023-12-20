const qrCode = require('qrcode');
const fs = require('fs');

const qrService = require('../services/qrService');
const userService = require('../services/userService');
import { io } from '../server';

const openGate = async () => {
    await fetch(process.env.IOT_URL).then((resoponse) => {
        if (resoponse.status === 200) {
            console.log('Open gate successfully');
        }
    });
};

const checkUsername = async (req, res) => {
    const token = req.body.token;

    const userInfo = await qrService.getUserInfoByToken(token);

    const username = userInfo.username;

    if (username) {
        // Payment if booking
        if (userInfo.userStatus === 1) {
            const price = process.env.BOOKING_PRICE;
            await userService.payment(username, price);
            const userStatus = 2;
            await userService.setUserStatus(username, userStatus);

            io.emit('fetch slot status', 'Fetch slot status success!!!');
        }

        // Snapshot
        qrService.snapshot(username);

        // Open gate
        // openGate();

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
    const username = userInfo.username;

    if (imgName) {
        const imgPath = `../carInfoImg/${imgName}.png`;
        let imgSrc = '';

        try {
            // Get the image
            const buffer = fs.readFileSync(imgPath);
            const base64Image = Buffer.from(buffer).toString('base64');
            imgSrc = `data:image/jpeg;base64,${base64Image}`;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('Đường dẫn không tồn tại hoặc tệp không được tìm thấy.');
            } else {
                console.error('Lỗi khi đọc tệp ảnh:', error);
            }
            return res.status(200).json({ message: 'Not found image' });
        }

        return res.status(200).json({ imgSrc, username });
    } else {
        return res.status(200).json({ message: 'Not found image' });
    }
};

const openExitDoor = async (req, res) => {
    const username = req.body.username;
    // Payment parking
    const price = process.env.PARKING_PRICE;
    await userService.payment(username, price);
    const userStatus = 0;
    await userService.setUserStatus(username, userStatus);

    io.emit('fetch slot status', 'Fetch slot status success!!!');

    // Open gate
    // openGate();
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
    openExitDoor,
};
