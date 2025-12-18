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

router.get('/', function(req, res) {

});

router.post('/', function(req, res) {
  var Data = req.body;
  var companyID = Data[0].companyID;
  var bankID = Data[0].bankID;
  var bankName = Data[0].bankName;
  var bankAcctNo = Data[0].bankAcctNo;
  var particular = '';
  var bankBal = 0;
  var glBal = 0;
  var txnDate = Data[0].txnDate;
  var refNo = '';
  var voucherNo = '';
  var adjAmount = 0;
  var rowNo = 0 ;
  var dataLen = 0;
console.log('*****BankReconciliationData*****');
console.log(Data);
//return(alert('purchaseVoucher connected'));



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


          dbquery="SELECT * from bankRecon where companyID = '"+companyID+"' and bankID='"+bankID+"' and txnDate = '"+txnDate+"'";
           console.log(dbquery);
          con.query(dbquery, function (err, results, fields) {
           if(err){
               console.error('❌ GL Update DB Error:', err);
                   return res.status(500).json({ error: 'Database error' });
           }else{
             console.log('Bank Reconciliation fetched successfully');
             console.log(results);
              if (results.length > 0) {
                return(alert('Bank Reconciliation on bank '+bankName+' on Ending Date '+txnDate+' already existed'));
                } else {

  for (let i = 0; i < Data.length; i++) {

             particular = Data[i].particular;
             bankBal = Data[i].bankBal;
             glBal = Data[i].glBal;
             txnDate = Data[i].txnDate;
             refNo = Data[i].refNo;
             voucherNo = '';
             adjAmount = 0;
             rowNo = Data[i].id ;
              console.log(txnDate);
                                   // create new record

              dbquery= "INSERT INTO bankRecon (companyID, refNo, txnDate, bankID, bankName, bankAcctNo, bankBal, glBal, voucherNo, adjAmount, particular, rowNo, date_created) VALUE('" + companyID + "', '"+ refNo +"', '"+ txnDate + "','"+ bankID +"','"+ bankName +"','"+ bankAcctNo +"', '"+ bankBal +"', '"+glBal+"', '"+voucherNo+"', '"+adjAmount+"', '"+particular+"' , '"+rowNo+"', CURDATE())"



          console.log(dbquery);
               con.query(dbquery, function(err, row) {

                                   if (err) {
                                console.error('❌ GL Update DB Error:', err);
                   return res.status(500).json({ error: 'Database error' });
                                    } else {
                                     console.log("New Bank Reconciliation created")
                                    }

                                });


  } // for
//con.end();
 res.send("Success");
//con.end();
}
}
});
});  // post



module.exports = router;
