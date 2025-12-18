 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql2/promise');
 const moment = require('moment');
 
 
 router.post("/", function(req, res, next) {
            var companyID = req.body.companyID;
            var taxID = req.body.taxID;
             console.log(taxID);
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });  // ale/  var userLevel = req.query.userLevel;

             var sql="DELETE from tax where companyID = '"+companyID+"' AND taxID='"+ taxID +"'" ;
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                console.log('Error while deleting Tax Record, err');
               return res.send("Tax Delete fail");
              }else{

                db.end();
                console.log('Tax Record delete successfully');
               return res.send("Success");
                //results(null,res);
             }
             
          })
          });
module.exports = router;