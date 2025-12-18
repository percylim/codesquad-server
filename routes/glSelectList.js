 var express = require('express');
     var router = express.Router();
     var alert = require('alert');
     var env = process.env;
     var mysql = require('mysql2');
     
     //var db = require('./dbDatabase'); var md5 = require('md5');
     var qresult = "";
     var msg = "";
     var moment = require('moment');
     
     var bodyParser = require('body-parser');
  

router.get("/", function(req, res) {
          var companyID = req.query.companyID;
          var glType = req.query.gType;
          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;
          console.log(companyID);
          console.log(process.env.DB_HOST);
          console.log(process.env.DB_USER);
          console.log(process.env.DB_PASSWORD);
          console.log(process.env.DB_NAME);
          //console.log('req.body here -> ', categoryID);
          var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glType= '"+glType+"' order by glNo";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
          console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Journal Voucher load error' })
          }else{


             console.log('Generl Ledger fetched successfully');
            console.log(results);
                 res.send(results);
                 db.end();
             //results(null,res);
          }


          

          });
          });

module.exports = router;