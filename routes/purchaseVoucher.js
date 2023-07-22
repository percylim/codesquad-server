var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');

//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var moment = require('moment');

var bodyParser = require('body-parser');
//const date = require('date-and-time')

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo.toUpperCase();
var jvInit = voucherData[0].voucherNo.substring(0,4);
var glNo='';
var glSub='';
var department = '';
var glName= '';
var glType;
var jeParticular = '';
var txnDate;
var drAmt = 0.00;
var crAmt = 0.00;
var glAmount=0.00;
console.log('*****voucherData*****');
console.log(voucherData);
//return(alert('purchaseVoucher connected'));


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


          for (let i = 0; i < voucherData.length; i++) {

            glNo=voucherData[i].glNo;
            glSub=voucherData[i].glSub;
            department = voucherData[i].department;
            glName= voucherData[i].glName;
            glType = voucherData[i].glType;
            txnDate = voucherData[i].txnDate;

             // alert(txnDate);
            jeParticular = voucherData[i].jeParticular;
            drAmt = voucherData[i].drAmt //.toFixed(2);
            crAmt = voucherData[i].crAmt //.toFixed(2);
        //    console.log('drAmt = '+drAmt);
        //   console.log('crAmt = '+crAmt);
           //  drAmt=drAmt.replace(",", "");
           //  crAmt=crAmt.replace(",", "");
           glAmount= drAmt - crAmt;
                                   // create new record
           dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, jvInit, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+jvInit+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"', '"+ txnDate +"', 'JV', CURDATE())"

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


// for


dbquery = "UPDATE glAccount SET glAmount=glAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
console.log(dbquery);
    con.query(dbquery, function(err, row) {

                        if (err) {
                          //console.log(err.message);
                          console.log(err);
                   //       res.send(alert(err+" occured in input data, update fail"));
                       //   con.end();
                         // return;
                         } else {
                          console.log("G/L Account updated")

                         }
                 // con.end();
                     });





} // for



// reset

for (let i = 0; i < voucherData.length; i++) {

glNo=voucherData[i].glNo;
glSub=voucherData[i].glSub;
department = voucherData[i].department;
glName= voucherData[i].glName;
glType = voucherData[i].glType;
jeParticular = voucherData[i].jeParticular;
txnDate = voucherData[i].txnDate;
//  txnDate = moment(new Date(date)).format("YYYY-MM-DD")
//    txnDate = date.split("/").reverse().join("-");
//   txnDate = voucherData[i].txnDate;

drAmt = voucherData[i].drAmt //.toFixed(2); //.replace(",", "");;
crAmt = voucherData[i].crAmt  //.toFixed(2); //.replace(",", "");;
glAmount = drAmt - crAmt;
//  glAMount = glAmount.replace(",", "");
console.log(drAmt);
console.log(crAmt);
console.log(glType);
console.log(department);
//  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
//    con.query(dbquery, function (err, results, fields) {

//  });

//  glAmount= drAmt - crAmt;
console.log(glAmount);


// check glTxn

dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ voucherData[i].glNo +"' and glSub='"+ voucherData[i].glSub+ "' and department='"+voucherData[i].department+"' and txnDate='"+txnDate+"'";
console.log(dbquery);



con.query(dbquery, function(err, rows) {

if (err) {   // #1
console.log(rows);                      //console.log(err.message);
console.log(err)
//  return reconnect(con); //  res.sendStatus(500);
return (alert(err.message));
} else {



//  console.log(rows.length);

if ( rows.length >0 ) {
glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
console.log('update dr:'+drAmt);
console.log('update cr:'+crAmt);
console.log('total:'+glAmount );
dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+voucherData[i].glNo+"' AND glSub='"+voucherData[i].glSub+"' AND department='"+voucherData[i].department+"' AND txnDate='"+txnDate+"'"
console.log(dbquery);
con.query(dbquery, function(err, row) {

               if (err) {
                 //console.log(err.message);
                 console.log(err);
               //  return reconnect(con);
                 return (alert(err+" occured in input data, update fail"));

                //res.sendStatus(500);
                // return;
                } else {
                 console.log("glTxn updated")
                }

  });





} else {
glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
console.log('dramt: '+voucherData[i].drAmt);
console.log('cramt: '+voucherData[i].crAmt);
//  let txnAmount = drAmt - crAmt;
//  txnAmount = txnAmount.replace(",", "");
console.log('total:'+glAmount);


dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate) VALUE('" + companyID + "', '"+ voucherData[i].glNo + "', '"+ voucherData[i].glSub + "', '"+ voucherData[i].department + "', '"+ voucherData[i].glName + "', '"+ glAmount +"' , '"+ txnDate +"')"

//dbquery = "INSERT INTO glTxn (companyID, txnAmount, txnDate) VALUE('" + companyID + "', '"+ glAmount +"' , '"+ txnDate +"')"
console.log(dbquery);
con.query(dbquery, function(err, row) {

             if (err) {
              console.error('error connecting: ' + err.stack); //console.log(err.message);
              // console.log(err);

          //    res.send(alert(err+" occured in input data, update fail"));

              //res.s

              // return;
              } else {
               console.log("New glTxn created")

              }

           });


}

}
}); // tempersry

//con.end();
 res.send("Success");
// con.end();
}

// 2  to level



});



module.exports = router;
