var env = process.env;
var mysql = require('mysql');

var conn = mysql.createConnection({
    'host': env.DB_HOST || 'localhost',
    'user': env.DB_USER || 'root',
    'password': env.DB_PASSWORD || 'pl0138026481',
    'database': env.DB_NAME || 'codesquaddb',
}); 
conn.connect(function(err) {


  if (err) throw err;
  console.log('Database is connected successfully !');
});
