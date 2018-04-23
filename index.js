const config      = require('./config.json');
const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');

const path          = require('path');
const fs            = require('fs');
const morgan        = require('morgan');
const rfs           = require('rotating-file-stream');

// Create the application
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//
// Set up Morgan logger to file (rotate)
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});

app.use(morgan('combined', {stream: accessLogStream}));

app.all('*', (req, res, next) => {
    //console.log( req.method + " " + req.url);
    next();
});

// Middleware statische bestanden (HTML, CSS, images)
app.use(express.static(__dirname + '/public'));

// Routing with versions
app.use('/apiv1', require('./routes/routes_apiv1'));
app.use('/apiv3', require('./routes/routes_apiv3'));
app.use('/apiv4', require('./routes/routes_apiv4'));

// Handle all errors
app.use((err, req, res, next) => {

    console.log(err.toString());

    const error = {
        message: err.message,
        code: err.code,
        name: err.name,
        datetime: new Date().toUTCString(),
        url: req.url
    };
    res.status(500).json({
        error: error
    }).end();
});

app.use('*', (req, res, next) => {
    res.status(400).json({
        'error': 'This route is not available.'
    }).end();
});

// Start the server
var port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log('The magic happens at http://localhost:' + port);
});

module.exports = app;