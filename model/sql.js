const mysql = require('mysql');
const config = require('./config')();

exports.query = function (sql) {
    let connection;
    function connect() {
        connection = mysql.createConnection(config);
        connection.connect(errorHandle);
        connection.on('error', errorHandle)
    }

    function errorHandle(err) {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                connect();
            } else {
                console.log();
            }
        }
    }
    connect();
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });

        connection.end();
    })

};

