var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//linking the date formatting function to not reference it everywhere
const fmt = require('./utils/DateFormatting');



var indexRouter = require('./routes/index');
const playerRouter = require('./routes/playerRoute');
const organisationRouter = require('./routes/organisationRoute');
const contractRouter = require('./routes/contractRoute');
const pApiRouter = require('./routes/api/PlayerApiRoute');
const orgApiRouter = require('./routes/api/OrganisationApiRoute');
const conApiRouter = require('./routes/api/ContractApiRoute');

var app = express();

const session = require('express-session');
const authUtils = require("./utils/authUtils");

app.use(session({
  secret: 'my_secret_password',
  resave: false
}))

app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
})
/**
 * ROUTERS FOR DIFFERENT CLASSES
 **/




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});
app.use(cookieParser('secret'));
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
  directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
  objectNotation: true, // enables the use of nested keys in object notation
  cookie: 'acme-hr-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});
app.use(i18n.init); //initialization and connection to the application context

app.use('/', indexRouter);
app.use('/players',  playerRouter);
app.use('/organisations', organisationRouter );
app.use('/contracts',  contractRouter );

/*app.use('/api/players', pApiRouter);
app.use('/api/organisations', orgApiRouter);
app.use('/api/contracts', conApiRouter);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
