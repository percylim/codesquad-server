var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');

router.post("/", function(req, res, next) {
     var companyID = req.body.companyID;
     var year = req.body.year;


     console.log(req.body);
     var db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
   });  // ale/  var userLevel = req.query.userLevel;

     var sql="DELETE from incomeSummary where companyID = '"+companyID+"' AND year='"+ year +"'" ;
       // console.log(req.beforeDestroy() {
      console.log(sql);
       // },);
     db.query(sql, function (err, results, fields) {
      if(err){
        console.log('Error while delete Income Summary Record, err');
     return(alert("fail To Delete Income Summary"));
      }else{


        console.log('Income Summary successfully deleted');
      return res.send("success");
        //results(null,res);
     }

    // db.end();
  })

  });

module.exports = router;