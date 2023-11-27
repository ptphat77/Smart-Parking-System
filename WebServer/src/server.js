const express = require('express');


const route = require('./routes');
const db = require('./config/db');


// Connect to db
db.connect()

const app = express();
const port = 3000;

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});