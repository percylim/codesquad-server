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


router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo; //.toUpperCase();
var glNo='';
var glSub='';
var department = '';
var glName= '';
var jeParticular = ''
var drAmt = 0.00;
var crAmt = 0.00;
var glAmount=0.00;
var jvData;
var glType = '';

console.log(companyID)
console.log(userName);
console.log(voucherNo);
console.log(voucherData);

for (let i = 0; i < voucherData.length; i++) {

  let dAmt = voucherData[i].drAmt;
  let cAmt = voucherData[i].crAmt;
// alert(dAmt+" = "+cAmt);
if (typeof dAmt !=='undefined') {
  drAmt=dAmt.replace(/,(?=.*\.\d+)/g, '');
}
if (typeof cAmt !=='undefined') {
  crAmt=cAmt.replace(/,(?=.*\.\d+)/g, '');
}
  voucherData[i].drAmt = drAmt;
  voucherData[i].crAmt = crAmt;


}

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
                    if (results.length === 0) {
                      return alert("Invalid Voucher No. "+voucherNo);
                    }
                   if (results.length>0) {   // 2
                     jvData = results;
                  //   console.log("Voucher No. "+voucherNo+" not existed, please re-enter");
               //     res.send(alert("Voucher No."+voucherNo+" not existed, please re-enter"))
                     //  const jvData = results
                       console.log(jvData);

var jvDate
for (let i = 0; i < jvData.length; i++) {

jvDate = jvData[i].txnDate.toISOString().slice(0, 10);
jvData[i].txnDate = jvDate;
drAmt = jvData[i].drAmt;
crAmt = jvData[i].crAmt;
//drAmt = parseFloat(drAmt.replace(/,/g,''))
// drAmt=drAmt.replace(",", "");
// crAmt=crAmt.replace(",", "");
glAmount= drAmt - crAmt; //console.log(jvDate);
//  jvData[i].txnDate =  format(new Date(jvData[i].txnDate), "dd/MM/yyyy")
dbquery = "INSERT INTO journalChange (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, userChange, dateChange, status, reasons) VALUE('" + companyID + "', '"+ jvData[i].glNo + "', '"+ jvData[i].glSub + "', '"+ jvData[i].department + "', '"+ jvData[i].glName + "', '"+jvData[i].jeParticular+"', '"+jvData[i].voucherNo+"', '"+ jvData[i].drAmt +"', '"+jvData[i].crAmt+"', '"+jvData[i].userName+"', '"+jvData[i].txnDate+"', 'JV', '"+userName+"', CURDATE(), 'JV', 'Voucher Edit Change')"
 console.log(dbquery);
 con.query(dbquery, function(err, row) {

 if (err) {
   //console.log(err.message);
   console.log(err);

  }

});
//glAmount= jvData[i].drAmt - jvData[i].crAmt;
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
// update gltxn
glAmount= jvData[i].drAmt - jvData[i].crAmt;
jvDate = jvData[i].txnDate;
dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ jvData[i].glNo +"' and glSub='"+ jvData[i].glSub+ "' and department='"+jvData[i].department+"' and txnDate='"+jvDate+"'";
  console.log(dbquery);

       con.query(dbquery, function(err, rows) {

          if (err) {   // #1
             console.log(err)
             return (alert(err.message));
             } else {

               console.log("159: "+rows.length);
                if ( rows.length >0 ) {
                 glAmount = jvData[i].drAmt - jvData[i].crAmt;
                 jvDate = jvData[i].txnDate;
                 dbquery = "UPDATE glTxn SET txnAmount=txnAmount-'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+jvData[i].glNo+"' AND glSub='"+jvData[i].glSub+"' AND department='"+jvData[i].department+"' AND txnDate='"+jvDate+"'"
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



// update glTxn


} // for

// insert new change journal\\\
 console.log(voucherData);
for (let i = 0; i < voucherData.length; i++) {
  if (voucherData[i].voucherNo !==undefined) {
  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;
  let date = voucherData[i].txnDate;
    txnDate = date.split("/").reverse().join("-");
   voucherData[i].txnDate = txnDate;
   console.log(voucherData[i].txnDate);
  jeParticular = voucherData[i].jeParticular;
  drAmt = voucherData[i].drAmt;
  crAmt = voucherData[i].crAmt;
  // drAmt=drAmt.replace(",", "");
  // crAmt=crAmt.replace(",", "");
  glAmount= voucherData[i].drAmt - voucherData[i].crAmt;
  // jvDate = voucherData[i].txnDate.toISOString().slice(0, 10);
  // voucherData[i].txnDate = jvDate;

//glAmount= (parseFloat(drAmt) - parseFloat(crAmt));
                         // create new record
 dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"', '"+ txnDate+"', 'JV', CURDATE())"

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
//  } // if
// update glTxn


dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ voucherData[i].glNo +"' and glSub='"+ voucherData[i].glSub+ "' and department='"+voucherData[i].department+"' and txnDate='"+txnDate+"'";
  console.log(dbquery);



       con.query(dbquery, function(err, rows) {

     if (err) {   // #1
    //  console.log(rows);                      //console.log(err.message);
       console.log(err)
    //  return reconnect(con); //  res.sendStatus(500);
         return (alert(err.message));
      } else {





            console.log("248: "+rows.length);

             if ( rows.length >0 ) {
                glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
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
         let tAmount= voucherData[i].drAmt - voucherData[i].crAmt;
        // let tAmount = 12345.00
            console.log('total:'+tAmount);

          dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate) VALUE('" + companyID + "', '"+ voucherData[i].glNo + "', '"+ voucherData[i].glSub + "', '"+ voucherData[i].department + "', '"+ voucherData[i].glName + "', '"+ tAmount +"', '"+txnDate+"')"

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


        }

        }
        }); // tempersry

} // if undefined


//upDate glTxn

} // for
//update glAccount
for (let i = 0; i < voucherData.length; i++) {
if (voucherData[i].voucherNo !==undefined) {
  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;

  jeParticular = voucherData[i].jeParticular;
  drAmt = voucherData[i].drAmt // .replace(",", "");
  crAmt = voucherData[i].crAmt  //.replace(",", "");
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
                                                }
                                        // con.end();
                                            });

                    } // if
                    }; // for



                }

          };  //query
    // con.end();
   }); // db.connect


});





module.exports = router;
