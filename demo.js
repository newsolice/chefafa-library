const express = require('express');
const admin = require('./route/admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.locals.title = '图书管理系统--车发发';
app.locals.desc = '车发发科技有限公司图书管理系统';
app.set('trust proxy', true);
app.set('views', __dirname + '/template');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/admin', admin);
app.get('/', function (req, res) {
    res.send('车发发科技有限公司');
});


app.use(function (req, res) {
    res.status(404).send('not found');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.sendStatus(502);
});

app.listen(3000, function () {
    console.log('running at http://127.0.0.1:3000')
});