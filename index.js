var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 3000;

var sess = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie:{},
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

//setup routes & db connection
require('./startup/routes')(app);

app.listen(port, () => {
  console.log(`Server running port ${port}`);
});