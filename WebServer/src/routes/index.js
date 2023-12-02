const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');
const webController = require('../controllers/webController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

function route(app) {
    app.get('/register', webController.handleRegister);
    app.get('/login', webController.handleLogin);

    app.post('/register', userController.createFunc);
    app.post('/login', loginController.checkUserFunc);

    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    app.post('/', homeController.bookSlot);
    app.get('/', homeController.getHomePage);
}

module.exports = route;
