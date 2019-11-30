// Dependencies
const express = require('express');
const method = require('method-override');
const body = require('body-parser');
const bars = require('express-handlebars');
const mongoose = require('mongoose');
const logger = require('morgan');
const cheerio = require('cheerio');
const request = require('request');

//Mongoose
const note = require('./models/note');
const article = require('./models/article');
const dbURL = 'mongodb://localhost/scrapethis';

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
mongoose.connect(dbURL);

mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('error', function(error) {
    console.log("Mongoose Error: ", error);
});
db.once('open', function() {
    console.log("Mongoose Connection Successful");
});

const app = express();
const port = process.env.PORT || 3000;