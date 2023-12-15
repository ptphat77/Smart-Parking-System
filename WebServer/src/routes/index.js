const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');
const authController = require('../controllers/authController');
const qrCodeController = require('../controllers/qrCodeController');
import { checkUserJWT } from '../middleware/JWTAction';

function route(app) {
    app.get('/register', authController.getRegister);
    app.get('/login', authController.getLogin);
    app.get('/logout', authController.getLogout);

    app.post('/register', authController.postRegister);
    app.post('/login', authController.postLogin);

    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    app.get('/booking/create', homeController.bookingRequest);
    app.get('/booking/cancel', homeController.cancelBooking);
    app.get('/booking/status', homeController.bookingStatus);

    // app.get('/gate/in', homeController.bookingRequest);
    // app.get('/gate/out', homeController.cancelBooking);

    app.get('/balance', homeController.getBalance);

    app.post('/qrcode/go-in', qrCodeController.checkUsername);
    app.post('/qrcode/go-out', qrCodeController.getImage);
    app.post('/qrcode/open-exit-door', qrCodeController.openExitDoor);
    app.get('/qrcode', qrCodeController.getQrCode);

    app.get('/', checkUserJWT, homeController.getHomePage);
    // app.get('/', homeController.getHomePage);
}

module.exports = route;
