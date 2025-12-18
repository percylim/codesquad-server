 var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');
          
          //var db = require('./dbDatabase'); var md5 = require('md5');
 var qresult = "";
 var msg = "";
 var moment = require('moment'); 
 
 router.post("/", function(req, res) {
              var companyID = req.body.companyID;
              var taxID = req.body.taxID;

               var db = mysql.createConnection({
                 host: process.env.DB_HOST,
                 user: process.env.DB_USER,
                 password: process.env.DB_PASSWORD,
                 database: process.env.DB_NAME,
                 timezone : "+00:00",
               });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
               console.log(companyID+' - '+taxID);
               //console.log('req.body here -> ', categoryID);
               var sql="SELECT * from tax where companyID = '"+companyID+"' and taxID = '"+taxID+"'";
                 // console.log(req.beforeDestroy() {
                console.log(sql);
                 // },);
               db.query(sql, function (err, results, fields) {
                if(err){
                  console.log('Error while fetching Tax Record, err');
                  return res.send(alert('fail to load Tax Record'));
                 // results(null,err);
              }else{


                  console.log('Tax fetched successfully');
                 console.log(results);
                //console.log('company', results);
                 db.end();

                return res.send(results);

             }
               
               });
              });
module.exports = router;