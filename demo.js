const express = require('express');
const admin = require('./route/admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(__dirname, 'uploads')});
const db = require('./model/sql');
const app = express();
app.locals.title = '图书管理系统--车发发';
app.locals.desc = '车发发科技有限公司图书管理系统';
app.set('uploads', path.join(__dirname, 'uploads'));
app.set('trust proxy', true);
app.set('views', __dirname + '/template');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/admin', admin);
app.get('/', function (req, res) {
    db.query('select * from cff_users  limit 0, 10').then(function (result) {
        return result;
    }).then(function (d) {

        res.send(d);
    }).catch(function (err) {
        res.status(302).send(err.message);
    });
    //res.send('车发发科技有限公司');
});

app.route('/upload').get(function (req, res) {

    let html = '<form enctype="multipart/form-data" action="/upload" method="post"><input type="text" name="name"> <input type="text" name="age"> <input type="file" name="photo"><button>Submit</button></form> <div><img src="/image" alt=""></div>';
    res.send(html)
}).post(upload.single('photo'), function (req, res) {
    // console.log(req.file);
    res.send('get it');
});

app.get('/image', function (req, res, next) {
    res.download(path.join(__dirname, 'uploads/InstallDocker.msi'), 'some.msi', function (err) {
        if (err) {
            next(err);
        }
    })
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