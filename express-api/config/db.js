const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// let sql = "SELECT * FROM article;";

// connection.execute(sql, function(err, result) {
//     if(err) throw err;

//     console.log(result);
// });

module.exports = connection.promise();