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
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);

                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Voucher No. "+voucherNo+" already existed, please re-enter");
                //     return null
                    //  return alert("Voucher No. "+voucherNo+" already existed, please re-enter");
                //  return res.status(400).json({
              //           status: 'error',
              //           error: '"Voucher No. "+voucherNo+" already existed, please re-enter"',
              //           });
                       res.send(alert("Voucher No."+voucherNo+" already existed, please re-enter"))
                      return false;
                    } else  {

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
  //  drAmt=drAmt.replace(",", "");
  //  crAmt=crAmt.replace(",", "");
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


// check glTxn
/*
dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ glNo +"' and glSub='"+ glSub+ "' and department='"+department+"' and glType='"+glType+"' and txnDate='"+txnDate+"'";
  console.log(dbquery);


       con.query(dbquery, function(err, rows) {

     if (err) {   // #1

       console.log(err)

      return (alert(err.message));
     } else {
/*
console.log(rows);
// let numRows = row.affectedRows;
console.log(rows.length);
       if (rows.length > 0) {
        // update exusting glTxn
        dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"' AND glType='"+glType+"' AND txnDate='"+txnDate+"'"
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

        } else {   // if
    //  if (rows.length === 0) {
          dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, glType, txnAmount, txnDate) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+glType+"', '"+ glAmount +"', '"+ txnDate +"')"

          console.log(dbquery);
              con.query(dbquery, function(err, row) {

                                  if (err) {
                                    //console.log(err.message);
                                    console.log(err);
                               //    res.send(alert(err+" occured in input data, update fail"));

                                   //res.s

                                   // return;
                                   } else {
                                    console.log("New glTxn created")
                                   }

                 });


        } // else




        }
      });

*/








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
    //  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
  //    con.query(dbquery, function (err, results, fields) {

    //  });

//  glAmount= drAmt - crAmt;
//  glAmount=Number(glAmount); // .replace(",", "");
  console.log(glAmount);
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
             con.connect();

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
}

} // for reset


      } // 2  to level

 // con.end();
 });



});



module.exports = router;
