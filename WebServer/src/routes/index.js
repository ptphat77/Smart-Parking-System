const slotController = require('../controllers/slotController');

function route(app) {
    // app.use('/login', webController);

    // Path / này luôn để dưới cùng vì nó sẽ so match từ trên xuống dưới
    app.use('/', slotController.read);
}

module.exports = route;