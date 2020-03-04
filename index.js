var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//setup routes & db connection
require('./startup/routes')(app);

app.listen(port, () => {
  console.log(`Server running port ${port}`);
});