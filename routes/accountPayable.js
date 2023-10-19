var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {
  var companyID = req.query.companyID;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var glNo = '';
  var glName = '';
  //var glSub= '';
  var glData = [];
  var data = [];
  var stockData = [];
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
  var sumApBalance=0;
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
        console.log(" SQL Connected!");
        });
// load sales: type 202 and return inward : 203
           sql="SELECT * from glAccount where companyID = '"+companyID+"' and (glType='801' or glType='204')  order by glNo, glSub";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        con.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching General Ledger Record'+ err);
           return;

           }else{
            const glData=results;
        //   console.log('Generl Ledger fetched successfully');
          console.log(glData);
        for (let j = 0; j < glData.length; j++) {
              glData[j].credit =0;
              glData[j].debit =0 ;
     glNo=glData[j].glNo ; //glData[0].glNo;
    glSub=glData[j].glSub; //glData[0].glSub ;
    opBalance = glData[j].opBalance;
  //  console.log(glNo+' - '+glSub +': '+ "O/P Balance = "+opBalance);

//*************************************** computing monthly trial balance ******
                      // Sum opcrAMt and drAmt in Jourm\nal file ****

                      sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate<'"+startDate+"'";
                       console.log(sql);

                       con.query(sql, function (err, results, fields) {
                        if(err){
                          console.log('Error while sum Journal Record, err');
                         // results(null,err);
                      //   res.send(alert('fail to sum Journal record'));
                        }else{

                            if (results.length>0) {
                                curBalance = glData[j].opBalance+results[0].sumBalance;
                            //    sumBalance=results[0].sumBalance;
                               //  console.log("first Sumbalance: "+sumBalance);
                             } else {

                                curBalance = opBalance;
                            //    sumBalance = 0;
                             }
                               if (curBalance === null) {
                                   curBalance =0;
                               }
                              // sumBalance = opBalance+sumBalance;
                              // sun console.log("Type: "+(typeof sumBalance));
                              // opBalance = curBalance;
                      //         console.log(glNo+' -'+glSub+"> sumBalance: "+sumBalance)
                        //       console.log(glNo+' -'+glSub+"> opBalance: "+opBalance);

                          }
                      });

                      // Load Journal Transaction record ****
                      sql="SELECT sum(drAmt-crAmt) AS sumApBalance from journal where companyID = '"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
             //      panyID = '"+companyID+"' order by txnDate ASC";

                     console.log(sql);

                    con.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching Journal Record, err');
                      // results(null,err);
                    //  res.send(alert('fail to load Journal record'));
                     }else{
        if (results.length>0) {

                     sumBalance=results[0].sumApBalance;
                     if (sumBalance === null) {
                          sumBalance=0;
                     }
                              if (glData[j].glType==='204') {

                              } else {
                            finBalance=curBalance+sumBalance;
                          }
                            console.log('last curBalance: '+curBalance);
                            if (finBalance > 0 ) {
                                debit=finBalance;
                                credit=0;
                            } else {
                              credit=finBalance;
                              dedit=0;
                            }
                            glData[j].debit = debit;
                            glData[j].credit=credit;
                      //      console.log(glNo+' -'+glSub+'> debit: '+glData[j].debit+' == '+glData[j].credit);

                      } else {  // if not found

                      }
            } // if result

            if (j === glData.length -1) {
                console.log(glData);
                 res.send(glData);
            }

      });


//********************

} // for j

} // for j
  //  console.log(data);
}); // con.query on glAccount

// closing STock computation
/*
sql="SELECT * from product where companyID = '"+companyID+"' order by productID";
// console.log(req.beforeDestroy() {
console.log(sql);
// },);
con.query(sql, function (err, results, fields) {
if(err){
console.log('Error while fetching Product Record'+ err);
return;

}else{
 const gData=results;
 stockData=results;
//   console.log('Generl Ledger fetched successfully');
console.log(gData);
for (let j = 0; j < gData.length; j++) {
qtyCost=gData[j].cost;



productID=gData[j].productID ;

productName=gData[j].productName; //glData[0].glSub ;
opBalance = gData[j].opBalance;
console.log(productID+' - '+productName +': '+ "O/P Balance = "+opBalance+" QtyCost = "+qtyCost);
gData[j].txnQtyIn =0;
gData[j].txnQtyOut=0;



//*************************************** computing monthly trial balance ******
           // Sum opcrAMt and drAmt in Jourm\nal file ****




           sql="SELECT SUM(txnQtyIn-txnQtyOut) AS sumBalance FROM productTxn where companyID='"+companyID+"' and productID='"+productID+"' and txnDate<'"+startDate+"'";
            console.log(sql);

            con.query(sql, function (err, results, fields) {
             if(err){
               console.log('Error while sum Product Transaction Record, err');
              // results(null,err);
             // res.send(alert('fail to sum Product record'));
             }else{

                 if (results.length>0) {
                     curBalance = opBalance+results[0].sumBalance;
                     sumBalance=results[0].sumBalance;
                    //  console.log("first Sumbalance: "+sumBalance);
                  } else {

                     curBalance = opBalance;
                     sumBalance = 0;
                  }
                    if (sumBalance === null) {
                        sumBalance =0;
                    }
                   // sumBalance = opBalance+sumBalance;
                   // sun console.log("Type: "+(typeof sumBalance));
                   // opBalance = curBalance;
                    console.log("curBalance: "+curBalance)
                stockOpenBal+=(curBalance*qtyCost); // stock opening balance


               }
           });

           // Load Journal Transaction record ****
           sql="SELECT * from productTxn where companyID = '"+companyID+"' and productID='"+productID+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
  //      panyID = '"+companyID+"' order by txnDate ASC";

          console.log(sql);

         con.query(sql, function (err, results, fields) {
          if(err){
            console.log('Error while fetching Product Transaction Record, err');
           // results(null,err);
         //  res.send(alert('fail to load Journal record'));
       }else{ // if err
//  res.send(results);
if (results.length>0) {
 // cosData=results.data;
            for (let i = 0; i < results.length; i++) {
             //    if (results[i].txnType === 'PURCHASE') {
           //        qtyCost=results[i].cost;
           //      }
                 // results[i].curBal = curBalance+results[i].drAmt-results[i].crAmt;
                 // curBalance = results[i].curBal;
                  results[i].opBal = 0;
                  if (results[i].txnQtyIn === null) {
                    results[i].txnQtyIn=0;
                  }
                  if (results[i].txnQtyOut === null) {
                    results[i].txnQtyOut=0;
                  }


                  qtyIn+=results[i].txnQtyIn;
                  qtyOut+=results[i].txnQtyOut;

         //  Amount+=(txnQtyIn-txnQtyOut)*qtyCost;




               } // for i
                 finBalance=glData[j].opBalance+sumBalance+qtyIn-qtyOut;
                 console.log('last curBalance: '+finBalance);
                 if (finBalance > 0 ) {
                     txnQtyIn=finBalance*qtyCost;
                     txnQtyOut=0;
                 } else {
                   txnQtyOut=finBalance*qtyCost;
                   txnQtyIn=0;
                 }
                Amount+=(txnQtyIn-txnQtyOut);
                cosData[{amount: Amount}];
               //  glData[j].txnQtyIn = txnQtyIn*qtyCost;
             //    glData[j].txnQtyOut= txnQtyOut*qtyCost;

         } else {  // if results.length>0
              if (glData[j].opBalance > 0) {
               txnQtyIn = glData[j].opBalance*qtyCost;
               txnQtyOut =0;
              } else {
                txnQtyOut=glData[j].opBalance*qtyCost;
                txnQtyIn=0;
              }
                Amount+=(txnQtyIn-txnQtyOut);
                cosData[{amount: Amount}];
           } // if results.length<0
            console.log('txnQtyin: '+txnQtyIn+" - "+txnQtyOut);
       //    Amount+=txnQtyIn-txnQtyOut;
            console.log('Amount : '+Amount);
            stockCloseBal=Amount;

 } // if err

*/

});

router.post('/', function(req, res, next) {



});

module.exports = router;
