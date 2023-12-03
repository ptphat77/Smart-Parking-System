const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');
const authController = require('../controllers/authController');
import { checkUserJWT } from '../middleware/JWTAction';

function route(app) {
    app.get('/register', authController.getRegister);
    app.get('/login', authController.getLogin);
    app.get('/logout', authController.getLogout);

    app.post('/register', authController.postRegister);
    app.post('/login', authController.postLogin);

    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    app.get('/booking', homeController.showSlotBooking);
    app.post('/booking', homeController.cancelSlotBooking);

    app.post('/', homeController.bookSlot);
    app.get('/', checkUserJWT, homeController.getHomePage);
}

module.exports = route;
