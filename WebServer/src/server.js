const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

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

app.locals.getBgColor = (isBlankSlot) => {
    return isBlankSlot ? 'bg-success' : 'bg-danger';
};

// Socket.io
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        io.emit('message', message);
    });
});

route(app);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
