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
  var productID = '';
  var productName = '';
  //var glSub= '';
  var glData = [];
  var data = [];
  var cosData = [];
  var sql ='';
  var opBalance = 0;
  var curBalance =0;
  var sumBalance=0;
  var purBalance=0;
  var qtyIn=0;
  var qtyOut=0;
  var qtyCost=0;
  var txnQtyIn=0;
  var txnQtyOut=0;
  var finBalance =0;
  var dbquery = ''
  var Amount =0;
  var purAmt =0;
  var stockData=[];
  var stockOpenBal=0;
  var stockCloseBal=0;
//  const setCosData=useState([]);
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

           sql="SELECT * from product where companyID = '"+companyID+"' order by productID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        con.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Product Record'+ err);
           return;

           }else{
            const glData=results;
            stockData=results;
        //   console.log('Generl Ledger fetched successfully');
          console.log(glData);
        for (let j = 0; j < glData.length; j++) {
           qtyCost=glData[j].cost;



     productID=glData[j].productID ;

      productName=glData[j].productName; //glData[0].glSub ;
    opBalance = glData[j].opBalance;
    console.log(productID+' - '+productName +': '+ "O/P Balance = "+opBalance+" QtyCost = "+qtyCost);
      glData[j].txnQtyIn =0;
      glData[j].txnQtyOut=0;



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



                  //  con.end();
if (j === glData.length -1) {
  //cosData[{amount: Amount}];//
  const newData = {
    addNo: '',
    glName: 'Inventory Opening Balance',
    totalText: '',
    amount: stockOpenBal,
  }
//  const newDatas = [...data, newData]
  cosData.push(newData);

//  setCosData(newDatas);
  console.log('####  '+Amount);
  //  console.log(cosData);
    console.log(cosData);
  //   res.send(cosData);
}

  });



} // for j


} // for j
  //  console.log(data);
//}); // con.query on glAccount
// load purchase for P&L


}); // select * from glAccount type = 303 204

//************ Purchase
sql="SELECT * from glAccount where companyID = '"+companyID+"' and glType='202' order by glNo, glSub";
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



glNo=glData[j].glNo ; //glData[0].glNo;
glSub=glData[j].glSub; //glData[0].glSub ;
//opBalance = glData[j].opBalance;

sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+endDate+"'";
 console.log('PURCHASE : '+sql);

 con.query(sql, function (err, results, fields) {
  if(err){
    console.log('Error while sum Journal Record, err');
   // results(null,err);
//   res.send(alert('fail to sum Journal record'));
  }else{

      if (results.length>0) {
          purAmt+=results[0].sumBalance;

       }
       console.log('PURCHASE : '+purAmt);


    }

    if (j === glData.length -1) {
      //cosData[{amount: Amount}];//
      const newData = {
        addNo: 'Add :',
        glName: 'Purchases',
        totalText: '',
        amount: purAmt,
      }
    //  const newDatas = [...data, newData]
      cosData.push(newData);
      // **** closing stock

    //  setCosData(newDatas);
      console.log('Purchases :  '+purAmt);
      //  console.log(cosData);
        console.log(cosData);
      //   res.send(cosData);
    }

}); // sum purchase balance

} // for j purchase




} // else j
}); // purchase select glAccount
// ***************** labpur COst
purAmt=0
sql="SELECT * from glAccount where companyID = '"+companyID+"' and (glType='303' or glType='204') order by glType, glNo, glSub";
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



glNo=glData[j].glNo ; //glData[0].glNo;
glSub=glData[j].glSub; //glData[0].glSub ;
glName=glData[j].glName;
console.log('LOAD : '+glNo+' - '+glSub+' = '+glName);

sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and (glNo='"+glNo+"' and glSub='"+glSub+"') and (txnDate>='"+startDate+"' and txnDate<='"+endDate+"')";
 console.log('PURCHASE : '+sql);

 con.query(sql, function (err, results, fields) {
  if(err){
    console.log('Error while sum Journal Record, err');
   // results(null,err);
//   res.send(alert('fail to sum Journal record'));
  }else{
         console.log(results.length);
      if (results.length>0) {
          purAmt=results[0].sumBalance;
console.log(glNo+' - '+glSub+' - '+glName+" = "+purAmt);
       } else {
           purAmt =0;
       }
    //   console.log(glNo+' - '+glSub+' - '+glName);


    }


if (purAmt >0 ) {
      //cosData[{amount: Amount}];//
     if (glData[j].glType === '204')  {
      const newData = {
        addNo: 'Less :',
        glName: glData[j].glName,
        totalText: '',
        amount: purAmt,
      }
      cosData.push(newData);
    }else{
      const newData = {
        addNo: 'Add :',
        glName: glData[j].glName,
        totalText: '',
        amount: purAmt,
      }
    cosData.push(newData);
    }
    //  const newDatas = [...data, newData]
    //  cosData.push(newData);

    //  setCosData(newDatas);
      console.log('Labour :  '+purAmt);
}
if (j === glData.length -1) {
      //  console.log(cosData);
      // ******* closing stock
      const stockData = {
        addNo: 'Less :',
        glName: 'Inventory Closing',
        totalText: '',
        amount: stockCloseBal,
      }
      //  const newDatas = [...data, newData]
      cosData.push(stockData);


        console.log(cosData);

         res.send(cosData);
    }

}); // sum purchase balance

} // for j purchase




} // else j
//console.log("STOCK DATA : "+stockData.length);

}); // purchase select glAccount
//*************** closing Stock












}); //get
router.post('/', function(req, res, next) {



});

module.exports = router;
