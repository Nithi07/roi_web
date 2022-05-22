
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
const database = require('./db/index.js');
const dbConfig = require('./config/index.js');
var cron = require('cron');

const defaultThreadPoolSize = 4;
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.dbPool.poolMax + defaultThreadPoolSize;

const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index')

const CronJobScheduler = require('./features/cronjob/commands/cronjob.js');

const staticFolder = 'public';
const app = express();

// view engine setup
global.basedir_filepath = path.resolve(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, staticFolder)));

app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const { COOKIE_EXPIRATION_MS } = process.env;
app.use(
  session({
    secret: 'keyboard fhop',
    name: process.env.SESSION_COOKIE_NAME,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
      maxAge: parseInt(COOKIE_EXPIRATION_MS, 10),
    },
  })
);

initAuthMiddleware(app);

// Middleware used for setting error and success messages as available in _ejs_ templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  if (req.session) {
    res.locals.messages = req.session.messages;
    res.locals.userInfo = req.session.userInfo;
    req.session.messages = {};
  }
  next();
});


try {
  console.log('Initializing database module');
  database.initialize();
} catch (err) {
  console.error(err);
  process.exit(1); // Non-zero failure code
}

var cronAutoEmailSend = cron.job("10 19 * * *", function () {
    console.log('Roi Email.....');
    CronJobScheduler.getSendRoiEmailToUser();
});

cronAutoEmailSend.start();

app.use('/', indexRouter);

global.__basedir =  "http://localhost:7200"; //"http://roi.fakhruddinproperties.com:7200";

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).render('pages/404');
});

module.exports = app;
