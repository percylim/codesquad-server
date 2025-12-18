 var express = require('express');
  var router = express.Router();
  var alert = require('alert');
  var env = process.env;
  var mysql = require('mysql2');
  //var format = require("date-fns");
  //var db = require('./dbDatabase'); var md5 = require('md5');
  var qresult = "";
  var msg = "";
  var jvData
  var bodyParser = require('body-parser');
 
 router.get("/", function(req, res, next) {
        var companyID = req.query.companyID;
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;
//  var userLevel = req.query.userLevel;
        console.log(companyID);
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from bankAcct where companyID = '"+companyID+"' order by bankID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
                              console.error('❌ GL Update DB Error:', err);
                   return res.status(500).json({ error: 'Database error' });
        }else{


           console.log('Bank Account fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }


          db.end();

        });
        });

module.exports = router;
