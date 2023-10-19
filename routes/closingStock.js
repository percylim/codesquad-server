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
  var sumCurBalance =0;
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

        sql="SELECT * from glAccount where companyID = '"+companyID+"' and glType='804'";
        // console.log(req.beforeDestroy() {
        console.log(sql);
        // },);
        con.query(sql, function (err, results, fields) {
        if(err){
        console.log('Error while fetching Product Record'+ err);
        return;

        }else{

          if (results.length > 0) {
              stockCloseBal=results[0].opBalance;
          }

        }
    });




           sql="SELECT * from product where companyID = '"+companyID+"'";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        con.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Product Record'+ err);
           return;

           }else{
            glData=results;
            stockData=results;
        //   console.log('Generl Ledger fetched successfully');
          //console.log(glData.length);

        for (let j = 0; j < glData.length; j++) {
           console.log(glData[j].productID);
           qtyCost=glData[j].cost;



     productID=glData[j].productID ;

      productName=glData[j].productName; //glData[0].glSub ;

  //  console.log(productID+' - '+productName +': '+ "O/P Balance = "+opBalance+" QtyCost = "+qtyCost);
      glData[j].txnQtyIn =0;
      glData[j].txnQtyOut=0;



//*************************************** computing monthly trial balance ******
                      // Sum opcrAMt and drAmt in Jourm\nal file ****
        sql="SELECT SUM((txnQtyIn-txnQtyOut)*unitPrice) AS sumBalance FROM productTxn where companyID='"+companyID+"' and productID='"+glData[j].productID+"' and txnDate<'"+startDate+"'";
                       console.log(sql);

                       con.query(sql, function (err, results, fields) {
                        if(err){
                          console.log('Error while sum Product Transaction Record, err');
                         // results(null,err);
                        // res.send(alert('fail to sum Product record'));
                        }else{

                            if (results.length>0) {
                                curBalance =(results[0].sumBalance);
                              //  sumBalance=(results[0].sumBalance*qtyCost);
                               //  console.log("first Sumbalance: "+sumBalance);
                             }

                              // sumBalance = opBalance+sumBalance;
                              // sun console.log("Type: "+(typeof sumBalance));
                              // opBalance = curBalance;
                        //   console.log("curBalance: "+curBalance)
                           stockCloseBal+=(curBalance); // stock opening balance


                          }
                      });
//*******************
                      // Load Journal Transaction record ****
                      sql="SELECT SUM((txnQtyIn-txnQtyOut)*unitPrice) AS sumCurBalance from productTxn where companyID = '"+companyID+"' and productID='"+glData[j].productID+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"'";
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
                  stockCloseBal+= (results[0].sumCurBalance)

                  }
                  console.log('sumCurBalance : '+glData[j].productID+' = '+sumCurBalance);
                } // err
                          // cosData[{amount: Amount}];
                        //  //  glData[j].txnQtyIn = txnQtyIn*qtyCost;
                        //    glData[j].txnQtyOut= txnQtyOut*qtyCost;




                  //  con.end();
                  if (j === glData.length -1) {
                    //cosData[{amount: Amount}];//
                    const newData = {
                      addNo: '',
                      glName: 'Inventory Closing Balance',
                      totalText: '',
                      amount: stockCloseBal,
                    }
                  //  const newDatas = [...data, newData]
                    cosData.push(newData);
                     console.log(cosData);

                       res.send(cosData);
                  }

  });



} // for j
};

con.end();
});

}); //get
router.post('/', function(req, res, next) {
  var companyID = req.body.companyID;
  var  stockCLoseBal = req.body.stockCloseBal;
  var sql='';
  var cosData=[];
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
      sql="DELETE from glAccount where companyID = '"+companyID+"' and glType = '999'";
      console.log(sql);
       // },);
       con.query(sql, function (err, results, fields) {
        if(err){
          console.log('Error while deleting Product Closing Stock Record, err');
        // res.send("fail");
        }else{


          console.log('Product CLosing Stock Record delete successfully');

       }

       sql="INSERT INTO glAccount (companyID, glNo, glSub, glType, department, glName, glDescription, glAmount) VALUE('" + companyID + "', '9999', '999', '999', '999', 'Inventory Closing Balance', '', '"+stockCloseBal+"')"
        // },);
        con.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while insert Product Closing Stock Record, err');
         // res.send("fail");
         }else{


           console.log('Product Closing Stock Record inserted successfully');

        }

        const newData = {
          addNo: '',
          glName: 'Inventory Closing Balance',
          totalText: '',
          amount: stockCloseBal,
        }
      //  const newDatas = [...data, newData]
        cosData.push(newData);


           res.send(cosData);



     });

 con.end();

     });



});

module.exports = router;
