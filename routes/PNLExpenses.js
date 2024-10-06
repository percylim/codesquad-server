var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {
  var companyID = req.query.companyID;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var glNo = '';
  var glSub= '';
  var glName = '';
  //var glSub= '';
  var glData = [];
  var data = [];
  var sql='';
  var opBalance = 0;
  var curBalance =0;
  var sumBalance=0;
  var debit=0;
  var credit=0;
  var drAmount=0;
  var crAmount=0;
  var finBalance =0;
  var dbquery = ''
  var cosData = [];
  //const [glData, setGlData]=useState([]);


  var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });

  con.connect(function(err) {
        if (err) throw err;
        console.log(" EXPENSES SQL Connected!");
        });

        //****************** generate Expenses
        purAmt=0;
        sql="SELECT * from glAccount where companyID = '"+companyID+"' and (glType='301' or glType='302' or glType='304') order by glType, glNo, glSub";
        console.log(sql);
        con.query(sql, function (err, results, fields) {

        if(err){
        console.log('Error while fetching General Ledger Record'+ err);
        return;

        }else{
           expData=results;

        for (let j = 0; j < expData.length; j++) {
purAmt=0;
sumBalance=0;
        sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+expData[j].glNo+"' and glSub='"+expData[j].glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+endDate+"'";
         console.log('Expenses : '+sql);

         con.query(sql, function (err, results, fields) {

          if(err){
            console.log('Error while sum Journal Record, err');
             return;
          } else {

              if (results.length>0) {
                  purAmt=results[0].sumBalance;
               console.log('Expenses : '+purAmt);
                if (purAmt >0 ) {
                 const newData = {
                 addNo: '',
                 glName: expData[j].glName,
                 totalText: '',
                 amount: purAmt,
                }

               cosData.push(newData);
               console.log(cosData);
          }
               } // if


          } // if else

          if (j === expData.length -1) {
                //  console.log(cosData);
                  console.log(cosData);

                   res.send(cosData);
              }
          });
        //  if (j === expData.length -1) {
             //  res.send(cosData);
        //   }
          } // for j
        //res.send(cosData);

        } // if (err) else

con.end();

        }); // sum expenses balance



});

router.post('/', function(req, res, next) {



});

module.exports = router;
