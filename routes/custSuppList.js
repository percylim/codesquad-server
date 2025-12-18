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
 
 router.get("/", function(req, res, next) {
        var companyID = req.query.companyID;
        var acctType = req.query.acctType;
        var SuppCust = 'Supplier';
        var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // alert(c
      //  var userLevel = req.query.userLevel;
        console.log(companyID);
        if (acctType === 'CUST') {
            SuppCust='CUSTOMER';
        }
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' and acctType = '"+acctType+"' order by supplierID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
        
            if(err){
      console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Database error' });
        }else{
           for (let i = 0; i < results.length; i++) {
              let amt=results[i].creditLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              results[i].creditLimit = amt;
             }

           console.log(SuppCust+' fetched successfully');
          console.log(results);
               res.send(results);
              db.end();
           //results(null,res);
        }

         


        });
        });

module.exports = router;