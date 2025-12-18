var express = require('express');
var router = express.Router();
var alert = require('alert');
var db = require('./catDatabase');
var md5 = require('md5');



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("received get from client");

  res.send('respond with a data');
});

router.post('/', function(req, res, next) {

  console.log("received from client ");

    var userName=req.body.userName;
    var email= req.body.email;
    var phone= req.body.phone;
    var address= req.body.address;
    var password= req.body.password;
    var md5Password = md5(password+userName);
    var db=require('./catDatabase');


    console.log(req.body);
//    console.log(req.body.userName);
    // let lPass = true;
    var sql="SELECT * FROM user where userName = '" + userName + "'";
    var sql1="SELECT * FROM user where email = '" + email + "'";

                  db.query(sql, function (err, rows) {

                   if (err) throw err;

                   if (rows.length) {

                    // alert(":"+ userName + " already taken");
                     // res.redirect('/product'); //, { title: 'New Category', categoryData: data});
                     res.send(alert('User Name: '+userName+' already existed'));
                    // return <div>No data</div>;
                  } else {

                    db.query(sql1, function (err, rows) {

                      if (err) throw err;

                       if (rows.length) {
                         lPass = false;
                      // alert(":"+ email + " already taken");
                      // res.redirect('/product'); //, { title: 'New Category', categoryData: data});
                        res.send(alert('Email: '+email+' already taken'));
                      // return false;

                    } else {

                      var sql3="INSERT INTO user (userName, email, phone, address, password, dateRegister) VALUES ('" + userName +"', '"+ email + "', '"+ phone+ "', '" + address + "', '"+ md5Password + "', NOW())";
                      db.query(sql3, function (err, data) {
                       if (err) {
                       console.log(err);
                     } else {


                       res.send(alert("New user register success"));
                     }
                     });
                    }
                    });
                  }
                });




//  console.log(newUser);
// res.send("yes");
//  res.send(alert('respond with a data'));
});
module.exports = router;
