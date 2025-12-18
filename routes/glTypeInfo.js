var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var db = require('./dbDatabase');
// var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');


router.get("/", function(req, res) {
          var companyID = req.query.companyID;
           // server connection
          var con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: 'codesquaddb',
            timezone : "+00:00",
          });
  
          console.log(companyID);
          //console.log('req.body here -> ', categoryID);
          var sql="SELECT * from glType  order by glType";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          con.query(sql, function (err, results, fields) {
           if(err){
       console.error('❌ GL List DB Error:', err);
             return res.status(500).json({ error: 'Database error' });
          }else{
  
  
             console.log('G/L Account Type fetched successfully');
            console.log(results);
                 res.send(results);
  
             //results(null,res);
          }
  
         con.end();
  
  
          });
          });

module.exports = router;  
         