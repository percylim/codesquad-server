var env = process.env;
var mysql   = require("mysql");
// server mysql
var pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: 'centra55_codesquaddb',
    password: "Z3@Xn^DIu_(i",
    database: "centra55_codesquaddb",
    timezone : "+00:00",
});


var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;
