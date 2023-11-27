const homeController = require('../controllers/homeController');

function route(app) {
    // app.use('/login', webController);

    // Path / này luôn để dưới cùng vì nó sẽ so match từ trên xuống dưới
    app.use('/', homeController.showSlot);
}

module.exports = route;
