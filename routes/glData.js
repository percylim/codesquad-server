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
 
router.get("/", function(req, res, next) {
             var companyID = req.query.companyID;
             var glNo = req.query.glNo;
              var glSub = req.query.glSub;
              var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
              });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
              console.log(glNo+" - "+glSub);
              //console.log('req.body here -> ', categoryID);
              var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub='"+glSub+"'";
                // console.log(req.beforeDestroy() {
               console.log(sql);
                // },);
              db.query(sql, function (err, results, fields) {
               if(err){
             console.error('❌ GL Data DB Error:', err);
             return res.status(500).json({ error: 'Database error' });
             }else{
 
 
                 console.log('General Ledger fetched successfully');
 
 
 
                 //results(null,res);
 
 
 
               console.log(results);
               //console.log('company', results);
 
 
               res.send(results);
 
            }
            db.end();
              });
             });

 
router.post("/", function(req, res, next) {
           var companyID = req.body.companyID;
           var glNo = req.body.glNo;
            var glSub = req.body.glSub;
            var db = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              timezone : "+00:00",
            });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
            console.log(glNo+" - "+glSub);
            //console.log('req.body here -> ', categoryID);
            var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub='"+glSub+"'";
              // console.log(req.beforeDestroy() {
             console.log(sql);
              // },);
            db.query(sql, function (err, results, fields) {
             if(err){
             console.error('❌ GL Data DB Error:', err);
             return res.status(500).json({ error: 'Database error' });;
           }else{
 
 
               console.log('General Ledger fetched successfully');
 
 
 
               //results(null,res);
 
 
 
             console.log(results);
             //console.log('company', results);
 
 
             res.send(results);
 
          }
            db.end();
            });
           });
 
 module.exports = router; 