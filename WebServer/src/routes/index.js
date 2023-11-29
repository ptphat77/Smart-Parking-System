const homeController = require('../controllers/homeController');
const iotController = require('../controllers/iotController');

function route(app) {
    app.post('/iot', iotController.updateFunc);
    app.get('/iot', iotController.readFunc);

    // Path / này luôn để dưới cùng vì nó sẽ so match từ trên xuống dưới
    app.use('/', homeController.getHomePage);
}

module.exports = route;
