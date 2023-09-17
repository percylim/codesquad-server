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
           sql="SELECT * from glAccount where companyID = '"+companyID+"' and glType='404'  order by glNo, glSub";
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
      //    if (glData[j].opBalance <0) {
    //          debit=glData[j].opBalance;
              glData[j].credit =0;
      //     } else {
      //        credit=glData[j].opBalance;
              glData[j].debit =0 ;
      //     }




     glNo=glData[j].glNo ; //glData[0].glNo;
    glSub=glData[j].glSub; //glData[0].glSub ;
    opBalance = glData[j].opBalance;
    console.log(glNo+' - '+glSub +': '+ "O/P Balance = "+opBalance);





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
                      //         console.log(glNo+' -'+glSub+"> sumBalance: "+sumBalance)
                        //       console.log(glNo+' -'+glSub+"> opBalance: "+opBalance);

                          }
                      });

                      // Load Journal Transaction record ****
                      sql="SELECT * from journal where companyID = '"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
             //      panyID = '"+companyID+"' order by txnDate ASC";

                     console.log(sql);

                    con.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching Journal Record, err');
                      // results(null,err);
                    //  res.send(alert('fail to load Journal record'));
                     }else{
        if (results.length>0) {

                      // results[0].opBal=opBalance+sumBalance;
                      // results[0].curBal= (opBalance+sumBalance)+results[0].drAmt-results[0].crAmt;
                      // curBalance =opBalance+sumBalance;  // results[0].curBal;
                       drAmount=0;
                       crAmount=0;
                       debit=0;
                       credit=0;
                       for (let i = 0; i < results.length; i++) {

                            // results[i].curBal = curBalance+results[i].drAmt-results[i].crAmt;
                            // curBalance = results[i].curBal;
                             results[i].opBal = 0;
                             drAmount+=results[i].drAmt;
                             crAmount+=Math.abs(results[i].crAmt);
                           // else { totalDebit+=res.data[x].debit;


                            // console.log(glNo+' -'+glSub+" : "+curBalance);
                          }
                            finBalance=glData[j].opBalance+sumBalance+drAmount-crAmount;
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
                         if (glData[j].opBalance > 0) {
                           glData[j].debit = glData[j].opBalance;
                            glData[j].credit =0;
                         } else {
                           glData[j].credit=glData[j].opBalance;
                           glData[j].debit=0;
                         }
                      }
            } // if result


//console.log(glData.length+' < '+j+' : '+glData[j].glNo+' - '+glData[j].glSub);
                  //  con.end();
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






});

router.post('/', function(req, res, next) {



});

module.exports = router;
