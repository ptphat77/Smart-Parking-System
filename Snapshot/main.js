const axios = require('axios');
const express = require('express');
const NodeWebcam = require('node-webcam');
require('dotenv').config();

const app = express();
const port = 4000;
const carInfoImgName = '../carInfoImg/numberPlate.png';

const snapshot = async () => {
    // Create webcam instance with specified settings
    const Webcam = await NodeWebcam.create({
        width: 1280,
        height: 720,
        quality: 300,
        delay: 0,
        saveShots: true,
        device: false,
        callbackReturn: 'buffer',
    });

    // Take a photo
    await Webcam.capture(carInfoImgName, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Photo captured');
        }
    });
};

app.get('/snapshot', async (req, res) => {
    await snapshot();
    return res.send('Snapshot successfully!!!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
