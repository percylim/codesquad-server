var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var moment = require('moment');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";

var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo. toUpperCase();
var glNo='';
var glSub='';
var department = '';
var glName= '';
var jeParticular = ''
var drAmt = 0.00;
var crAmt = 0.00;
var glAmount=0.00;
var bankID = voucherData[0].bankID;
var txnDate;
// var format from "date-fns";
console.log(companyID)
console.log(userName);
console.log(voucherNo);
console.log(bankID);
console.log(voucherData);
//var event = new Date(voucherData[0].txnDate);

//var date = JSON.stringify(event)
//txnDate = date.slice(1,11)
//let date = voucherData[0].txnDate;
//txnDate = moment(new Date(date)).format("YYYY/MM/DD")
//voucherData[0].txnDate = txnDate;
//console.log(txnDate);

for (let i = 0; i < voucherData.length; i++) {
 let date = voucherData[i].txnDate;
  txnDate = date.split("/").reverse().join("-");
  voucherData[i].txnDate = txnDate;
  let dAmt = voucherData[i].drAmt;
  let cAmt = voucherData[i].crAmt;
  drAmt=dAmt.replace(/,(?=.*\.\d+)/g, '');
  crAmt=cAmt.replace(/,(?=.*\.\d+)/g, '');
  voucherData[i].drAmt = drAmt;
  voucherData[i].crAmt = crAmt;

} // for
  console.log(voucherData);

    var dbquery = ''

    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });

    con.connect(function(err) {
          if (err) {
           console.log(err);
       }else{
          console.log("Connected!");
        }
    });

//  check bankAcct
dbquery = "SElECT * FROM bankAcct WHERE companyID='"+ companyID+ "' and bankID='"+bankID+"'";
console.log(dbquery);
con.query(dbquery, function(err, row) {

       if (err) {  //#1
         //console.log(err.message);
         console.log(err);

        } else {  //#1
          if (row.length===0) {   // 2
          console.log("Bank ID: "+bankID+" is invalid");
          res.send(alert("Bank ID"+bankID+" is invalid, please re-enter"));

         } else {  // #1a
      // journal check


           dbquery = "SElECT * FROM journal WHERE companyID='"+ companyID+ "' and voucherNo='"+ voucherNo +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

              if (err) { //#3
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
               } else {  // #3

                    if (row.length>0) {   // #4
                     console.log("Voucher No. "+voucherNo+" already existed, please re-enter");
                     res.send(alert("Voucher No."+voucherNo+" already existed, please re-enter"))

                     } else {   //#4


 //  start update journal, glAccount and BankAcct and banktxn


 for (let i = 0; i < voucherData.length; i++) {

   glNo=voucherData[i].glNo;
   glSub=voucherData[i].glSub;
   department = voucherData[i].department;
   glName= voucherData[i].glName;
     let event = new Date(voucherData[i].txnDate);

     let date = JSON.stringify(event)
      txnDate = date.slice(1,11)
   jeParticular = voucherData[i].jeParticular;
   drAmt = voucherData[i].drAmt;
   crAmt = voucherData[i].crAmt;
    drAmt=drAmt.replace(",", "");
    crAmt=crAmt.replace(",", "");
//glAmount= (parseFloat(drAmt) - parseFloat(crAmt));
                          // create new record
  dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"',CURDATE(), 'JV')"

 console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Voucher created")
                           }

                       });

} // update journal
 // update G/L Account
for (let i = 0; i < voucherData.length; i++) {

  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;

  jeParticular = voucherData[i].jeParticular;
  drAmt = voucherData[i].drAmt.replace(",", "");;
  crAmt = voucherData[i].crAmt.replace(",", "");;
  console.log(drAmt);
  console.log(crAmt);
    //  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
  //    con.query(dbquery, function (err, results, fields) {

    //  });

  glAmount= drAmt - crAmt;
  console.log(glAmount);
                       dbquery = "UPDATE glAccount SET glAmount=glAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
                       console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                                               if (err) {
                                                 //console.log(err.message);
                                                 console.log(err);
                                                 res.send(alert(err+" occured in input data, update fail"));
                                                //res.sendStatus(500);
                                                // return;
                                                } else {
                                                 console.log("Journal Voucher created")
                                            //     res.send("Success");
                                                }
                                        // con.end();
                                            });

                    }; // for







//      con.end();






// check jpurnal
} // #4

} // #3
});  // check Journal

 // check bank
} // 1a
}  // #1
}); // check bank
 //con.end();
}); // post


module.exports = router;
