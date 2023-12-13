const fs = require('fs');

const qrCode = require('qrcode');

const qrService = require('../services/qrService');

const readNumberPlateFile = async () => {
    const fileName = 'numberPlate.txt';
    let fileContent = fs.readFileSync(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(`Read ${fileName} file failed!!!`, err);
            return;
        }
        return data;
    });
    return fileContent;
};

const checkNumberPlate = async (req, res) => {
    const token = req.body.token;

    const numberPlate = await qrService.getNumberPlateUser(token);

    // const isNumberPlateExists = await qrService.checkNumberPlateExists(numberPlate);

    const numberPlateTxt = await readNumberPlateFile();


    if (numberPlate === numberPlateTxt) {
        // Open door
        console.log('Open door');
    } else {
        console.log('Number plates are not same');
    }

    // Announce to qr scan tool
    return res.status(200).json({ numberPlate });
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
