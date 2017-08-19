const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '192.168.1.40',
    user: 'root',
    password: 'root',
    database: 'chefafa_book'
});

connection.connect();
//connection.end();

exports.query = function (sql, callback) {
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            callback(err, rows, fields);
        }
    });
};

exports.close = function () {
    connection.end();
};