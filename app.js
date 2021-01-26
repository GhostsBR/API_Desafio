const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const bodyParser = require('body-parser');

const { user } = require('./models/database');

const indexRouter = require('./routes/index');
const templateRouter = require('./routes/templates');
const responseRouter = require('./routes/responses');
const studentsRouter = require('./routes/students');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

require('dotenv').config({path:'variables.env'});

//Config
const app = express();

//Express
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

//Flash
app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(flash());

//helpers
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

app.use('/', indexRouter);
app.use('/', templateRouter);
app.use('/', responseRouter);
app.use('/', studentsRouter);

//Error 404
app.use(errorHandler.pageNotFound);

//Mustache
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views/pages');

module.exports = app;