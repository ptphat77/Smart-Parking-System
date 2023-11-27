const express = require('express');

/**
 * 
 * @param {*} app - express app
 */
const config = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set('views', "./src/views");
}

module.exports = { config };