const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const express = require('express');
const NodeWebcam = require('node-webcam');
require('dotenv').config();


const app = express();
const port = 4000;
const numberPlateImgName = 'numberPlate';

const extractNumberPlate = async () => {
    const data = new FormData();
    data.append('srcImg', fs.createReadStream(`${numberPlateImgName}.png`));
    data.append('Session', 'string');

    const options = {
        method: 'POST',
        url: 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
        headers: {
            'X-RapidAPI-Key': process.env.Rapid_API_Key,
            'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com',
            ...data.getHeaders(),
        },
        data: data,
    };

    try {
        const response = await axios.request(options);
        let numberPlate = response.data.value;
        numberPlate = numberPlate.replace('\n', '-') // convert number plate 2 line to 1 line
        numberPlate = numberPlate.replace(/[^A-Z0-9\-\.]/g, ''); // remove invalid character
        console.log(numberPlate);
        return numberPlate;
    } catch (error) {
        console.error(error);
    }
};

const snapshot = async () => {
    // Create webcam instance with specified settings
    const Webcam = await NodeWebcam.create({
        width: 1280,
        height: 720,
        quality: 500,
        delay: 0,
        saveShots: true,
        output: 'png',
        device: false,
        callbackReturn: 'buffer',
    });

    // Take a photo
    await Webcam.capture(numberPlateImgName, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Photo captured');
        }
    });
};

app.get('/extract', async (req, res) => {
    await snapshot();
    // Do không thể đồng bộ nên chờ 3s cho máy chụp
    setTimeout(async () => {
        const numberPlate = await extractNumberPlate();
        return res.send(`Extract successfully: ${numberPlate}`);
    }, 3000);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
