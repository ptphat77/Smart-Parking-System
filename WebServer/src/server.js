const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes');
const viewEngine = require('./config/viewEngine');
const db = require('./config/db');

// Connect to db
db.connect();

const app = express();
const port = 3000;

// Config view engine
viewEngine.config(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.getBgColor = (isBlankSlot) => {
    return isBlankSlot ? 'bg-success' : 'bg-danger';
};

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
