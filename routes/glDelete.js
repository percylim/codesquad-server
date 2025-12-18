var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');


router.get('/', function(req, res) {

});

router.post('/', function(req, res) {

    var companyID = req.body.companyID;
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;

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
          console.log("************ Connected!");
          });

        dbquery = "DELETE FROM glAccount WHERE companyID = '"+companyID+"' AND glNo ='"+ glNo +"' AND glSub='"+ glSub +"'";
    console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
           console.error('❌ GL Update DB Error:', err);
             return res.status(500).json({ error: 'Database error' });
                  } else {


                            console.log("G/L Account Deleted")
                            res.send("Success");
                    }




               });


      //     con.end();
});



module.exports = router;
