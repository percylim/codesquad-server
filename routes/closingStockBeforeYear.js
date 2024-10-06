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
  var stockSumBal=0;
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
      //    console.log(glData);
        for (let j = 0; j < glData.length; j++) {
           qtyCost=glData[j].cost;
        stockOpenBal+=(glData[j].opBalance*glData[j].cost);
       console.log('cost: '+qtyCost);
       console.log('stockOpenBal: '+stockOpenBal);

     productID=glData[j].productID ;

      productName=glData[j].productName; //glData[0].glSub ;
    opBalance = glData[j].opBalance;
  //  console.log(productID+' - '+productName +': '+ "O/P Balance = "+opBalance+" QtyCost = "+qtyCost);
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
                        //        curBalance = opBalance+results[0].sumBalance;
                          //      sumBalance=results[0].sumBalance;
                          stockSumBal+=(results[0].sumBalance*qtyCost);
                               //  console.log("first Sumbalance: "+sumBalance);
                        //     } else {

//                                curBala//nce = opBalance;
  //                              sumBalanc//e = 0;
                             }
    //                           if (sumBalance === null) {
      //                             sumBalance =0;
        //                       }
                              // sumBalance = opBalance+sumBalance;
                              // sun console.log("Type: "+(typeof sumBalance));
                              // opBalance = curBalance;
                        //   console.log("cost: "+qtyCost);
                        //     console.log("stockSumBal: "+stockSumBal);
                        //   stockCloseBal=(stockOpenBal-stockSumBal); // stock opening balance


                          }






                      // Load Journal Transaction record ****

                  if (j === glData.length -1) {
                    cosData[{amount: Amount}];//
                    const newData = {
                      addNo: '',
                      glName: 'Inventory Closing Balance',
                      totalText: '',
                      amount: (stockOpenBal-stockSumBal),
                    }
                  //  const newDatas = [...data, newData]
                    cosData.push(newData);
                    console.log("stockOpenBal: "+stockOpenBal);
                    console.log("stockSumBal: "+stockSumBal);
                     console.log(cosData);

                       res.send(cosData);
                  }

  });



} // for j


} // for j
  //  console.log(data);
//}); // con.query on glAccount
// load purchase for P&L

con.end();
}); // select * from glAccount type = 303 204






}); //get
router.post('/', function(req, res, next) {







});

module.exports = router;
