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
     
     
     router.get("/", function(req, res, next) {
             var companyID = req.query.companyID;
             var glNo = req.query.glNo;
             var glSub= req.query.glSub;
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });  // ale/  var userLevel = req.query.userLevel;
 
             //console.log('req.body here -> ', categoryID);
             var sql="SELECT * from journal where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub= '"+glSub+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                console.log('Error while fetching GST Transaction Record, err');
               // results(null,err);
               return;
 
             }else{
           //    custData=results
           //    console.log(results);
       //     console.log(' Load successfully on '+taxType);
                 res.send(results);
 
             }
         //    });
 
 
 
                db.end();
 
 
 
             });
             });  

module.exports = router;  
      