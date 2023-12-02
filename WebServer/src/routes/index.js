const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');
const LoginRegisterController = require('../controllers/loginRegisterController');

function route(app) {
    app.get('/register', LoginRegisterController.showRegister);
    app.get('/login', LoginRegisterController.showLogin);

    app.post('/register', LoginRegisterController.handleRegister);
    app.post('/login', LoginRegisterController.handleLogin);

    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    app.post('/', homeController.bookSlot);
    app.get('/', homeController.getHomePage);
}

module.exports = route;
