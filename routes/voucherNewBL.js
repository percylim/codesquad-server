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
//const date = require('date-and-time')

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res) {
var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo.toUpperCase();
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
console.log(voucherData);

console.log(companyID)
console.log(userName);
console.log(voucherNo);

for (let i = 0; i < voucherData.length; i++) {
 let date = voucherData[i].txnDate;
  txnDate = date.split("/").reverse().join("-");
  voucherData[i].txnDate = txnDate;
  let dAmt = voucherData[i].drAmt;
  let cAmt = voucherData[i].crAmt;
  drAmt=dAmt.replace(/,(?=.*\.\d+)/g, '');
  crAmt=cAmt.replace(/,(?=.*\.\d+)/g, '');
  voucherData[i].drAmt = drAmt //.toFixed(2);
  voucherData[i].crAmt = crAmt //.toFixed(2);

} // for
console.log(txnDate);
console.log(voucherData);


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


// check if voucher No. already existed
           dbquery = "SElECT * FROM journal WHERE companyID='"+ companyID+ "' and voucherNo='"+ voucherNo +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                   console.error('❌ GL Update DB Error:', err);
                  return res.status(500).json({ error: 'Database error' });
                  } 
                    if (row.length>0) {   // 2

                       res.send(alert("Voucher No."+voucherNo+" already existed, please re-enter"))
                      return false;
                    } 

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
   console.log('drAmt = '+drAmt);
  console.log('crAmt = '+crAmt);
  
  glAmount= drAmt - crAmt;
                          // create new record
  dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"', '"+ txnDate +"', 'JV', CURDATE())"

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

} // for


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

  drAmt = voucherData[i].drAmt; //.replace(",", "");;
  crAmt = voucherData[i].crAmt; //.replace(",", "");;
   glAmount= drAmt - crAmt;
  console.log(drAmt);
  console.log(crAmt);
  console.log(voucherData[i].glType);
  console.log(glAmount);
                       dbquery = "UPDATE glAccount SET glAmount=glAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
                       console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                               if (err) {
                              console.error('❌ GL Update DB Error:', err);
                        return res.status(500).json({ error: 'Database error' });
                                                } else {
                                                 console.log("G/L Account updated")

                                                }
                                        // con.end();
                   });
   } // for

let completed = 0;
let hasError = false;

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
      if (hasError) return;
       if (err) {   // #1
          hasError = true;
         return res.status(500).json({ error: 'Database error' });
        } 
               if ( rows.length >0 ) {
                glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
                   console.log('update dr:'+drAmt);
                  console.log('update cr:'+crAmt);
                   console.log('total:'+glAmount );
                 dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+voucherData[i].glNo+"' AND glSub='"+voucherData[i].glSub+"' AND department='"+voucherData[i].department+"' AND txnDate='"+txnDate+"'"
               } else {
                 dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate) VALUE('" + companyID + "', '"+ voucherData[i].glNo + "', '"+ voucherData[i].glSub + "', '"+ voucherData[i].department + "', '"+ voucherData[i].glName + "', '"+ glAmount +"' , '"+ txnDate +"')"
               }
             console.log(dbquery);

         con.query(dbquery, function(err2, row) {
          if (hasError) return;

          if (err2) {
             hasError = true;
            return res.status(500).json({ error: 'Database error' });
          }
           completed++;
          if (completed === voucherData.length) {
           console.log("glTxn updated")
            return res.send('Success');
    
          }  
    })


   });
}; // for 2
});




module.exports = router;
