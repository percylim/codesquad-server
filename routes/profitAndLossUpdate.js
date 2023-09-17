var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var md5 = require('md5');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

  //  var companyID = req.body.companyID;
     var TBData = req.body
     var companyID = TBData[0].companyID;
     var eDate = new Date(TBData[0].endDate);
     var year = eDate.getFullYear();
  console.log(TBData);
  console.log(year);

   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = ''



    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });

    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          });



                  // ready to create new database and table
                  // AAAA

                  // check admin
              // insert into codesquaddb companyCTRL if not existed
/*
           dbquery = "SElECT * FROM profitAndLoss WHERE companyID='"+ companyID+ "' and year='"+ year +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Profit ANd Loss existed");

                    dbquery = "delete from profitAndLoss where companyID='"+ companyID +"' and year ='"+ year +"'"

                       console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);

                           //res.sendStatus(500);
                            return;
                           } else {
                            console.log("Profit And Loss Deleted")

                           }

                       });
                   } // 2
                 } // else

               });
*/
      // insert into trialBalance
       for (let i = 0; i < TBData.length; i++) {
      dbquery = "INSERT INTO profitAndLoss (companyID, year, startDate, endDate, addNo, glName, totalText, amount, PNLType, date_close, date_created) VALUE('" + companyID + "', '"+ year + "', '"+TBData[i].startDate+"', '"+TBData[i].endDate+"', '"+ TBData[i].addNo+ "', '"+TBData[i].glName+"', '"+TBData[i].totalText+"', '"+TBData[i].amount+"', '"+TBData[i].PNLType+"', CURDATE(),  CURDATE())";

      console.log(dbquery);
                              con.query(dbquery, function(err, row) {

                              if (err) {
                                //console.log(err.message);
                                console.log(err);
                              //  res.send(alert("Trial Balance update fail"));
                               //res.sendStatus(500);
                            //    return;
                               } else {
                                console.log("New Profit And Loss created")
                               }

                           });

            } //for

            con.end();
            return(alert('Profit And Loss Statement Saved'));


});



module.exports = router;
