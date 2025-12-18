var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var md5 = require('md5');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
   
    router.post("/", function(req, res) {
            var companyID = req.body.companyID;
            var supplierID = req.body.supplierID;
             // var categoryID = req.body.categoryID;
             console.log(supplierID);
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });  // ale/  var userLevel = req.query.userLevel;
  
             var sql="DELETE from suppCustAcct where companyID = '"+companyID+"' and supplierID = '"+supplierID+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
              console.error('❌ GL List DB Error:', err);
               return res.status(500).json({ error: 'Database error' });
               // results(null,err);
            }else{ 
                console.log('Supplier / Customer deleted successfully');
   
              res.send("Success");
            };
             db.end();
             
            }); 
    });             

module.exports = router;