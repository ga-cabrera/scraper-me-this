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

// App set up
app.use(logger('dev'));
app.use(express.static('public'));
app.use(body.urlencoded({extended: false}));
app.use(method('_method'));
app.engine('handlebars', bars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(port, function() {
    console.log(`Listening on PORT ${port}`);
});

// handlebar routes
app.get('/', function(req, res) {
    article.find({}, null, {sort: {created: -1}}, function(err, data) {
        if(data.length === 0) {
            res.render('placehoder', {message: `These aren't the articles you are looking for.... because there aren't any. Scrape some knees, my boy! Click on \"Scrape the News\"`});
        }
        else {
            res.render('index', {articles: data});
        }
    });
});