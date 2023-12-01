const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');
const webController = require('../controllers/webController');

function route(app) {
    app.get('/register', webController.handleRegister);
    app.get('/login', webController.handleLogin);

    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    app.post('/', homeController.bookSlot);
    app.get('/', homeController.getHomePage);
}

module.exports = route;
