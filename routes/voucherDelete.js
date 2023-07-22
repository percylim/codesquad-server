var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var format = require("date-fns");
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var jvData
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
var companyID = req.body.companyID;
var userName =  req.body.userName;
var voucherNo = req.body.voucherNo. toUpperCase();
 var glAmount = 0;

console.log(companyID);
console.log(userName);
console.log(voucherNo);





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
// check if voucher No. already existed
           dbquery = "SElECT * FROM journal WHERE companyID='"+ companyID+ "' and voucherNo='"+ voucherNo +"'";
           console.log(dbquery);
           con.query(dbquery, function(err, results, fields) {
          //   const journalData = results;
        //    console.log(results);
                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                    res.sendStatus(500);
                   // return;
                 } else {
                    if (results.length>0) {   // 2
                      jvData = results
                   //   console.log("Voucher No. "+voucherNo+" not existed, please re-enter");
                //     res.send(alert("Voucher No."+voucherNo+" not existed, please re-enter"))
                      //  const jvData = results
                        console.log(jvData);

 var jvDate
 for (let i = 0; i < jvData.length; i++) {

jvDate = jvData[i].txnDate.toISOString().slice(0, 10);
jvData[i].txnDate = jvDate;
//console.log(jvDate);
//  jvData[i].txnDate =  format(new Date(jvData[i].txnDate), "dd/MM/yyyy")
dbquery = "INSERT INTO journalChange (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, userChange, dateChange, status, reasons) VALUE('" + companyID + "', '"+ jvData[i].glNo + "', '"+ jvData[i].glSub + "', '"+ jvData[i].department + "', '"+ jvData[i].glName + "', '"+jvData[i].jeParticular+"', '"+jvData[i].voucherNo+"', '"+ jvData[i].drAmt +"', '"+jvData[i].crAmt+"', '"+jvData[i].userName+"', '"+jvData[i].txnDate+"', 'JV', '"+userName+"', CURDATE(), 'JV', 'Voucher Deleted')"
  console.log(dbquery);
  con.query(dbquery, function(err, row) {

  if (err) {
    //console.log(err.message);
    console.log(err);

   }

});
glAmount= jvData[i].drAmt - jvData[i].crAmt;
// reverse the glAccount data
dbquery = "UPDATE glAccount SET glAmount=glAmount-'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+jvData[i].glNo+"' AND glSub='"+jvData[i].glSub+"' AND department='"+jvData[i].department+"'"
console.log(dbquery);
con.query(dbquery, function(err, row) {

if (err) {

  console.log(err);

 }

});
// delete the old voucher
dbquery = "Delete from journal WHERE companyID='"+companyID+"' AND voucherNo='"+jvData[i].voucherNo+"'"
console.log(dbquery);
con.query(dbquery, function(err, row) {

if (err) {

  console.log(err);

 }

});

// check gltxn and change the amount

// console.log(jvData[i].txnDate);
dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ jvData[i].glNo +"' and glSub='"+ jvData[i].glSub+ "' and department='"+jvData[i].department+"' and txnDate='"+jvData[i].txnDate+"'";
  console.log(dbquery);

       con.query(dbquery, function(err, rows) {

          if (err) {   // #1
             console.log(err)
             return (alert(err.message));
             } else {
                if ( rows.length >0 ) {
                 glAmount = jvData[i].drAmt - jvData[i].crAmt;
                 dbquery = "UPDATE glTxn SET txnAmount=txnAmount-'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+jvData[i].glNo+"' AND glSub='"+jvData[i].glSub+"' AND department='"+jvData[i].department+"' AND txnDate='"+jvData[i].txnDate+"'"
                 console.log(dbquery);
                 con.query(dbquery, function(err, row) {

                                     if (err) {
                                      console.log(err);

                                      return (alert(err+" occured in input gltxn data, update fail"));

                                      } else {
                                      console.log("glTxn updated")
                                      }

                       });
                 } // if  length

         } // if #1
       });




} // for

                 }

           };  //query
      //  con.end();
    }); // db.connect

   con.end();
});



module.exports = router;
