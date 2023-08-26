var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var md5 = require('md5');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {
var companyID = req.query.companyID;
var cat = [{label: 'A', value: 'A'},{label:'B', value: 'B'},
          {label:'C', value: 'C'},{label:'D', value: 'D'},{label:'E', value: 'E'},
           {label: 'F', value: 'F'},{label: 'G', value: 'G'},{label: 'H', value: 'H'},
           {label: 'I', value: 'I'},{label: 'J', value: 'J'},{label: 'K', value: 'K'},
           {label: 'L', value: 'L'},{label: 'M', value: 'M'}, {label: 'O', value: 'O'},
           {label: 'P', value: 'P'},{label: 'Q', value: 'Q'},{label: 'R', value: 'R'},
           {label: 'S', value: 'S'},{label: 'T', value: 'T'},{label: 'U', value: 'U'},
           {label: 'V', value: 'V'},{label: 'W', value: 'W'}, {label: 'X', value: 'X'},
           {label: 'Y', value: 'Y'},{label: 'Z', value: 'Z'}];
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
      var sql="SELECT * from incomeTax where companyID='"+companyID+"' order by category";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      con.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching Income Tax Record'+ err);
         return;
        // results(null,err);
      //  res.send(alert('fail to load General Ledger record'));
      }else{

for (let i = 0; i < results.length; i++) {
    results[i].category =cat[i].value;
}
         console.log('Income Tax fetched successfully');
        console.log(results);
             res.send(results);

         //results(null,res);
      }


      //db.end();

      });


});

router.post('/', function(req, res, next) {
  const todaysDate = new Date()
  const year = todaysDate.getFullYear()
    var data = req.body
    var category ='';
    var incomeFrom = 0;
    var incomeTo = 0;
    var calFirst = 0;
    var calNext = 0;
    var rate = 0;
    var tax = 0;
    var companyID = '';



  console.log(data);


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
 // search incomeTax data wherether or not existed
// delete incomeTax first

/*
           dbquery = "SElECT * FROM incomeTax ";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                  //  return;
                  } else {
                    console.log(row);
                    if (row.length>0) {   // delete first

                    dbquery = "DELETE FROM incomeTax ";
                    console.log(dbquery);
                   con.query(dbquery, function(err, row) {

                           if (err) {
                             //console.log(err.message);
                             console.log(err);
                            //  return
                           }
                    });

                  }
                }
 }); // load incometax
*/
                  // **** update new data
  for (let i = 0; i < data.length; i++) {
    category = data[i].category;
    incomeFrom = data[i].incomeFrom;
    incomeTo = data[i].incomeTo;
    calFirst = data[i].calFirst;
    calNext = data[i].calNext;
    rate = data[i].rate;
    tax = data[i].tax;
    companyID=data[i].companyID;


    dbquery = "INSERT INTO incomeTax (companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate,tax, year, date_created) VALUE('"+ companyID +"','"+ category + "', '"+ incomeFrom + "', '"+ incomeTo + "', '"+ calFirst + "', '"+ calNext + "', '"+rate+"', '"+tax+"', '"+year+"', CURDATE())"

   console.log(dbquery);
        con.query(dbquery, function(err, row) {

                            if (err) {

                         console.log("Income Tax update fail "+err);
                             //res.sendStatus(500);
                            //   return;
                             } else {
                              console.log("New Income Tax created")
                             }

                         });

  } //for



                // update the full database



});



module.exports = router;
