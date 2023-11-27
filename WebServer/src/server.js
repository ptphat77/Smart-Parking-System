const express = require('express');

const route = require('./routes');
const viewEngine = require('./config/viewEngine');
const db = require('./config/db');


// Connect to db
db.connect()

const app = express();
const port = 3000;

viewEngine.config(app);

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});