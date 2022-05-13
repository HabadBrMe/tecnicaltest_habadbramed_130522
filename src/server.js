const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const bodyparser = require('body-parser');
var router = require('./router/index');

app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(router);
app.listen(process.env.PORT || port, () => {
    console.log(`App listening on ${port}`);
  })