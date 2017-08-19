const express = require('express');
const db = require('../model/mysqldb');
const router = express.Router();


const dataVaild = function (req, res, next) {
    const labelMap = {
        book_name: '书籍名称',
        book_author: '书籍作者',
        book_isbn: '书籍ISBN编码',
        book_category_id: '书籍分类',
        book_desc: '书籍简介'
    };
    for (let key in req.body) {
        if (req.body[key] === '') {
            return res.render('admin/result', {message: `“${labelMap[key]}”域，不能为空！`});
        }
    }
    next();
};

router.use(function (req, res, next) {
    console.log(req.path);
    res.locals = {
        title: '车发发后台图书管理系统',
        current: req.path
    };
    next();
});

// 图书列表
router.get('/', function (req, res) {
    // db.query('SHOW COLUMNS FROM `lib_book`', function (err, rows, fields) {
    //     console.log(JSON.stringify(rows))
    // });
    res.render('admin/index', {heading: '图书列表'});
});

// 新书入库
router.get('/storage', function (req, res) {
    res.render('admin/storage', {heading: '新书入库'});
});

// 借书管理
router.get('/borrow', function (req, res) {
    res.render('admin/borrow', {heading: '借书管理'});
});

// 用户管理
router.get('/user', function (req, res) {
    res.render('admin/user', {heading: '用户管理'});
});

// 分类管理
router.get('/category', function (req, res) {
    res.render('admin/category', {heading: '分类管理'});
});

//借阅统计
router.get('/data', function (req, res) {
    res.render('admin/data', {heading: '借阅统计'});
});

//系统信息
router.get('/system', function (req, res) {
    res.render('admin/system', {heading: '系统信息'});
});

// 登录界面
router.get('/login', function (req, res) {
    res.render('admin/login');
});

router.route('/add')
    .get(function (req, res) {
        res.render('admin/add');
    })
    .post(dataVaild, function (req, res) {
        let now = Date.now().toString().slice(0, -3);
        let sql = 'INSERT INTO `lib_book` (book_name, book_author, book_isbn, book_category_id, book_desc, utime, ctime) VALUES ("'+req.body.book_name+'","'+req.body.book_author+'","'+req.body.book_isbn+'","'+req.body.book_category_id+'","'+req.body.book_desc+'",'+now+','+now+') ';
        db.query(sql, function (err, rows, fields) {
            if (err) {
                res.send(err.message);
            } else {
                res.send('ok');
            }
        });

    });

router.get('/edit/:bookid', function (req, res) {
    
});


module.exports = router;