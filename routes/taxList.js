 var express = require('express');
         var router = express.Router();
         var alert = require('alert');
         var env = process.env;
         var mysql = require('mysql2');
         
         //var db = require('./dbDatabase'); var md5 = require('md5');
         var qresult = "";
         var msg = "";
         var moment = require('moment'); 
 
 router.get("/", function(req, res, next) {
            var companyID = req.query.companyID;
            var taxType = req.query.taxType;
            var db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone : "+00:00",
          });  // ale/  var userLevel = req.query.userLevel;
            console.log(companyID);
            // console.log(userLevel);
            //console.log('req.body here -> ', categoryID);
            var sql="SELECT * from tax where companyID = '"+companyID+"' and taxType <> '"+taxType+"'";
              // console.log(req.beforeDestroy() {
            // console.log(sql);
              // },);
            db.query(sql, function (err, results, fields) {
               if(err){
      console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Database error' })
            } else {
             db.end();
              console.log('Government Tax fetched successfully');
              console.log(results);
                   return res.send(results);           
            
               //results(null,res);
            }
            });
          });

module.exports = router;
