const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require ('cookie-parser');

const route = require('./routes');
const viewEngine = require('./config/viewEngine');
const db = require('./config/db');

// Connect to db
db.connect();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT;

// Config view engine
viewEngine.config(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser());

// Config session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 3 hours
            httpOnly: true,
            sameSite: 'strict',
        },
    }),
);

route(app);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
