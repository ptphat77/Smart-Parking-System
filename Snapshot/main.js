const axios = require('axios');
const express = require('express');
const NodeWebcam = require('node-webcam');
require('dotenv').config();

const app = express();
const port = 4000;


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

const snapshot = async (imgName) => {
    imgNameDir = `../carInfoImg/${imgName}.png`
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
    await Webcam.capture(imgNameDir, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Photo captured');
        }
    });
};

app.post('/snapshot', async (req, res) => {
    const imgName = req.body.imgName;
    console.log("snapshot working: ", imgName);
    await snapshot(imgName);
    return res.send('Snapshot successfully!!!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
