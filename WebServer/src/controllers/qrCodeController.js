const qrCode = require('qrcode');

const qrService = require('../services/qrService');

const checkNumberPlate = async (req, res) => {
    const token = req.body.token;
    const numberPlate = await qrService.getNumberPlateUser(token);

    console.log(numberPlate);

    const isNumberPlateExists = await qrService.checkNumberPlateExists(numberPlate);

    if (isNumberPlateExists) {
        // Open door
    }

    // Announce to qr scan tool

    // console.log('getNumberPlate: ', token);
    // return res.sendStatus(200);
};

const getQrCode = async (req, res) => {
    const isParking = req.session.info.isParking;

    if (isParking) {
        const username = req.session.info.username;

        const token = await qrService.createToken(username);

        let qrString = await qrCode.toDataURL(token);

        return res.status(200).json(qrString);
    } else {
        return res.status(200).json(null);
    }
};

module.exports = {
    checkNumberPlate,
    getQrCode,
};
