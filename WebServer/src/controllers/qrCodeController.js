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

const checkUsername = async (req, res) => {
    const token = req.body.token;

    const username = await qrService.getUsername(token);

    if (username) {
        // Payment if booking

        // Snapshot

        // Open door
        await fetch(process.env.IOT_URL).then((resoponse) => {
            if (resoponse.status === 200) {
                console.log('Open gate successfully');
            }
        });

        // Announce to qr scan tool
        return res.status(200).json({ username });
    } else {
        return res.status(200).json({ message: 'Not found user name' });
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
};
