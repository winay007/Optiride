var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    password: "vinay@123",
    database: "optiride",
    user: "root",
})

module.exports = connection;