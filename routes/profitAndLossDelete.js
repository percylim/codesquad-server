 var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');
 
 router.post("/", function(req, res) {
     var companyID = req.body.companyID;
     var year = req.body.year;
    // console.log(employeeNo);
     var db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
   });  // ale/  var userLevel = req.query.userLevel;

     var sql="DELETE from profitAndLoss where companyID = '"+companyID+"' AND year='"+ year +"'" ;
       // console.log(req.beforeDestroy() {
      console.log(sql);
       // },);
     db.query(sql, function (err, results, fields) {
      if(err){
        console.log('Error while delete Profit And Loss Record, err');
     return(alert("fail delete Monthly Profit And Loss Data"));
      }else{


        console.log('Profit And Loss successfully deleted');
         res.send("Success");
        //results(null,res);
     }

    // db.end();
  })

  });

module.exports = router;