var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var db = require('./dbDatabase');
var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var companyName = req.body.companyName;
    var adminID = req.body.adminID;
    var adminName = req.body.adminName;
    var email = req.body.email;
    var phone = req.body.phone;
    var md5Password = md5(req.body.password+req.body.adminName+req.body.companyID);
   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = "SElECT * FROM companyCTRL WHERE companyName="+"'"+ req.body.companyName+ "' AND companyID="+"'"+ req.body.companyID+ "'";
       console.log(dbquery);
    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        });



                  // ready to create new database and table


                  dbquery="CREATE DATABASE IF NOT EXISTS "+ companyID ;
                  console.log(dbquery);
                  con.query(dbquery, function (err, result) {
                   if (err) {
                     alert("Fail to create database")
                   } else {
                   console.log("Database created");
                   }
                  });

                  // AAAA

                  // check admin
              // insert into codesquaddb companyCTRL if not existed

                 dbquery = "SElECT * FROM companyCTRL WHERE companyID="+"'"+ companyID+ "'";
                  con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {
                     alert("Company Account already existed");
                    // return res.status(404).json({ error: "Company Account existed" });

                    } else {   // insert new data

                      dbquery="INSERT INTO companyCTRL (companyID, companyName, databaseName, date_created) VALUES('" + companyID + "','"+ companyName +"','"+ companyID+ "', CURDATE() )" ;
                   //   console.log(dbquery);
                      con.query(dbquery, function (err, result) {
                      if (err) {
                      //console.log(err.message);
                      console.log(err);
                     // res.sendStatus(500);
                     // return;
                      } else {
                       console.log("company CTRL created");
                      }
                      });


                    }
                  };
                });


                  // check Admin is Existed

                  dbquery = "SElECT * FROM admin WHERE companyID="+"'"+ companyID+ "' AND adminID="+"'"+adminID+ "'";
                  con.query(dbquery, function(err, row) {

                 if (err) {
                       console.log(err);
                      //  res.sendStatus(500);
                      //  return;

                 } else {
                     if (row.length>0) {
                      alert("Admin ID already existed");
                     // return res.status(404).json({ error: "Admin ID existed" });

                  } else {   // insert new admin

                     // insert into codesauaddb admin database
                    dbquery="INSERT INTO admin (companyID, adminID, adminName, email, phone, password, companyName, date_create) VALUES('" + companyID + "','"+ adminID + "', '"+ adminName +"','"+ email + "', '"+ phone +"', '"+ md5Password+ "', '"+ companyName +"', CURDATE() )" ;
                    console.log(dbquery);
                    con.query(dbquery, function (err, result) {
                      if (err) {
                        console.log(err);
                        //res.sendStatus(500);
                        //return;

                     } else {
                         console.log("Admin created");
                      }
                     });

                  }
                };

              con.end();

               // reconnect to new database and create table
               var DB=companyID;
               var dbcon = mysql.createConnection({
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: DB,
               });
             console.log(DB);
             dbcon.connect(function(err) {
                   if (err) throw err;
                   console.log(DB+" Connected!");
                 });

                 // create general profile

      dbquery='CREATE TABLE IF NOT EXISTS employee (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, employeeNo VARCHAR(30) NOT NULL UNIQUE, employeeName VARCHAR(100) NOT NULL, nric VARCHAR (20) NOT NULL, sex CHAR(1) NOT NULL, dateBirth DATE NOT NULL, address1 VARCHAR(255), address2 VARCHAR(255), postCode INT (10), city VARCHAR(50), state VARCHAR(50), country VARCHAR(50), level int(1), position VARCHAR(50), salary DOUBLE(15,2), otRate DOUBLE(15,2), payMethod CHAR(1), incomeTaxNo VARCHAR(50), epfNo VARCHAR(50), socsoNo VARCHAR(50), drivingLicenseNo VARCHAR(50), childs INT(2), employDate DATE NOT NULL, telNp varchar(20), hpNo varchar(20), email varchar(100), password varchar(255), maritalStatus char(1));';


                 console.log(dbquery);
                 dbcon.query(dbquery, function (err, result) {
                  if (err) {
                    alert("Fail to create table employee");

                  } else {
                  console.log("Table employee created");
                  }
                 });

   // create company profile
   dbquery='CREATE TABLE IF NOT EXISTS company (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, companyName VARCHAR(100) NOT NULL, registerNo VARCHAR (50) NOT NULL, address1 VARCHAR(255), address2 VARCHAR(255), postCode INT (10), city VARCHAR(50), state VARCHAR(50), country VARCHAR(50), incomeTaxNo VARCHAR(50), epfNo VARCHAR(50), socsoNo VARCHAR(50), finYearStart DATE NOT NULL, finYearEnd DATE NOT NULL, telNo1 varchar(20), telNo2 varchar(20), telNo3 varchar(20), faxNo varchar(20), email varchar(100), website varchar(255));';

   console.log(dbquery);
   dbcon.query(dbquery, function (err, result) {
    if (err) {
      alert("Fail to create table company");

    } else {
    console.log("Table company created");

    }
   });

      // create general ledger account

      dbquery='CREATE TABLE IF NOT EXISTS glAccount (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, glNo INT(10) NOT NULL, glSub INT(3) NOT NULL, department INT(3) NOT NULL,  glName VARCHAR(50), glDescription VARCHAR(50), glAmount DOUBLE(15,2), lastTxnDate DATE, opBalance DOUBLE(15,2), currentBalance DOUBLE(15,2));';

      console.log(dbquery);
      dbcon.query(dbquery, function (err, result) {
       if (err) {
         alert("Fail to create table glAccount");

       } else {
       console.log("Table glAccount created");

       }
      });

      dbquery='CREATE TABLE IF NOT EXISTS journal (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, glNo INT(10) NOT NULL, glSub INT(3) NOT NULL, department INT(3) NOT NULL,  glName VARCHAR(50), glDescription VARCHAR(50), jeParticular varchar(255) NOT NULL, vouchNo varchar(20) NOT NULL, txnAmount DOUBLE(15,2), txnDate DATE);';

      console.log(dbquery);
      dbcon.query(dbquery, function (err, result) {
       if (err) {
         alert("Fail to create table journal");

       } else {
       console.log("Table journal created");

       }
      });
      // create gl transaction table
      dbquery='CREATE TABLE IF NOT EXISTS glTxn (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, voucherNo VARCHAR(20) , glNo INT(10) NOT NULL, glSub INT(3) NOT NULL, department INT(3) NOT NULL,  glName VARCHAR(50), txnYear INT(4), txnMonth INT(2), txnAmount DOUBLE(15,2), lastTxnDate DATE);';

      console.log(dbquery);
      dbcon.query(dbquery, function (err, result) {
       if (err) {
         alert("Fail to create table GLTxn");

       } else {
       console.log("Table GlTxn created");

       }
      });


          // create department profile

          dbquery='CREATE TABLE IF NOT EXISTS department (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, department INT(3) NOT NULL, glDescription VARCHAR(255) NOT NULL);';

          console.log(dbquery);
          dbcon.query(dbquery, function (err, result) {
           if (err) {
             alert("Fail to create table department");

           } else {
           console.log("Table department created");

           }
          });

          // create tax profile

          dbquery='CREATE TABLE IF NOT EXISTS tax (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, taxID char(10) NOT NULL, taxDescription VARCHAR(255) NOT NULL, taxRate DOUBLE(5,2) NOT NULL);';

          console.log(dbquery);
          dbcon.query(dbquery, function (err, result) {
           if (err) {
             alert("Fail to create table tax");

           } else {
           console.log("Table tax created");

           }
          });

          // create supplier profile

dbquery='CREATE TABLE IF NOT EXISTS suppCustAcct (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, supplierID char(10) NOT NULL, supplierName VARCHAR(255) NOT NULL, acctType char(4), tel1 VARCHAR(20), tel2 VARCHAR(20), handPhone VARCHAR(20), fax VARCHAR(20), email VARCHAR(100), website VARCHAR(255), address1 VARCHAR(255), address2 VARCHAR(255), city VARCHAR(100), state VARCHAR(100), country VARCHAR(100), paymentTerm INT(3), creditLimit DOUBLE(15,2), opBalance DOUBLE(15,2), currentBalance DOUBLE(15,2), lastTxnDate DATE);';

          console.log(dbquery);
          dbcon.query(dbquery, function (err, result) {
           if (err) {
             alert("Fail to create table suppCustAcct");

           } else {
           console.log("Table Supplier and Customer profile created");

           }
          });
            // create Purchase Invoice
            dbquery='CREATE TABLE IF NOT EXISTS purchaseInvoice (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, supplierID char(10) NOT NULL, supplierName VARCHAR(255) NOT NULL, invoiceNo VARCHAR(20) NOT NULL, invoiceDate DATE NOT NULL, productID VARCHAR(30) NOT NULL, barcode VARCHAR(30), productName VARCHAR(255), productDescription VARCHAR(255), unit CHAR(10),  purchaseQty DOUBLE(15,3),  unitPrice DOUBLE(15,2), discountPercent DOUBLE(4,2), unitDiscount DOUBLE(15,2), taxID CHAR(10), taxRate DOUBLE(5,2), itemTotal DOUBLE(15,2), itemTaxTotal DOUBLE(15,2), invTaxTotal DOUBLE(15,2));';

            console.log(dbquery);
            dbcon.query(dbquery, function (err, result) {
             if (err) {
               alert("Fail to create table purchaseInvoice");

             } else {
             console.log("Table Purchase Invoice created");

             }
            });

            // create sales table

            dbquery='CREATE TABLE IF NOT EXISTS salesInvoice (inv INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, customerID char(10) NOT NULL, customerName VARCHAR(255) NOT NULL, invoiceType char(4), invoiceNo VARCHAR(50) NOT NULL, invoiceDate DATE NOT NULL, productID VARCHAR(30) NOT NULL, barcode VARCHAR(30), productName VARCHAR(255), productDescription VARCHAR(255), unit CHAR(10),  salesQty DOUBLE(15,3),  unitPrice DOUBLE(15,2), discountPercent DOUBLE(4,2), unitDiscount DOUBLE(15,2), taxID CHAR(10), taxRate DOUBLE(5,2), itemTotal DOUBLE(15,2), taxItemTotal DOUBLE(15,2), invTaxTotal DOUBLE(15,2), remark VARCHAR(255));';

            console.log(dbquery);
            dbcon.query(dbquery, function (err, result) {
             if (err) {
               alert("Fail to create table salesinvoice");

             } else {
             console.log("Table Sales Invoice created");

             }
            });
          // create invTxn table for Purchase and Sales Cr and Dr Return transaction
          dbquery='CREATE TABLE IF NOT EXISTS invoiceTxn (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, custSuppID char(10) NOT NULL, custSuppName VARCHAR(255) NOT NULL, txnType char(3), documentNo VARCHAR(50) NOT NULL, voucherNo VARCHAR(50), invoiceNo VARCHAR(50), txnDate DATE NOT NULL, txnParticular VARCHAR(255), txnTotal DOUBLE(15,2), taxID CHAR(10), taxRate DOUBLE(5,2), taxTotal DOUBLE(15,2), netTaxTotal DOUBLE(15,2));';

            console.log(dbquery);
            dbcon.query(dbquery, function (err, result) {
             if (err) {
               alert("Fail to create table InvoiceTxn");

             } else {
             console.log("Table Invoice Transaction created");

             }
            });
               // create category pathToFile
               dbquery='CREATE TABLE IF NOT EXISTS category (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, categoryID char(10) NOT NULL, categoryName VARCHAR(255) NOT NULL, catDescription VARCHAR(255) NOT NULL,  image varchar(255), date_created DATE);';

               console.log(dbquery);
               dbcon.query(dbquery, function (err, result) {
                if (err) {
                  alert("Fail to create table category");

                } else {
                console.log("Table product category created");

                }
               });
               // stock location table

               dbquery='CREATE TABLE IF NOT EXISTS stockLocation (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, locationID char(10) NOT NULL, locationName VARCHAR(255) NOT NULL, locationAddress VARCHAR(255), date_created DATE);';

               console.log(dbquery);
               dbcon.query(dbquery, function (err, result) {
                if (err) {
                  alert("Fail to create table stockLocation");

                } else {
                console.log("Table product stock location created");

                }
               });

              // create product profile
              dbquery='CREATE TABLE IF NOT EXISTS product (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, productID VARCHAR(30) NOT NULL, sku VARCHAR(30), barcode VARCHAR(30), productName VARCHAR(255) NOT NULL, description VARCHAR(255), unit CHAR(10) NOT NULL, cost DOUBLE(15,2),  unitPrice DOUBLE(15,2), stockLocation VARCHAR(30), onHandQty DOUBLE(15,3), opBalQty DOUBLE(15,3), date_created DATE, productImage VARCHAR(255));';

              console.log(dbquery);
              dbcon.query(dbquery, function (err, result) {
               if (err) {
                 alert("Fail to create table product");

               } else {
               console.log("Table Product Profile created");

               }
              });

              // create product transaction
              dbquery='CREATE TABLE IF NOT EXISTS productTxn (id INT PRIMARY KEY AUTO_INCREMENT, companyID VARCHAR(20) NOT NULL, productID VARCHAR(30) NOT NULL, sku VARCHAR(30), barcode VARCHAR(30), productName VARCHAR(255), unit CHAR(10) NOT NULL, cost DOUBLE(15,2),  unitPrice DOUBLE(15,2), stockLocation VARCHAR(30), txnQty DOUBLE(15,3), txnTotal DOUBLE(15,2), txnDate DATE, txnParticular VARCHAR(255));';

              console.log(dbquery);
              dbcon.query(dbquery, function (err, result) {
               if (err) {
                 alert("Fail to create table productTxn");

               } else {
               console.log("Table Product transaction created");

               }
              });



              dbcon.end();

});
});

module.exports = router;
