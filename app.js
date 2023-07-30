require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var passport = require("passport");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var LocalStrategy = require('passport-local').Strategy;
var env = require('dotenv').config();
var alert = require("alert");
var flash    = require('connect-flash');
var md5 = require('md5');
var db=require('./routes/csDatabase');
var multer  =   require('multer');
// var cool = require('cool-ascii-faces');
//var companyID = req.body.companyID;

var companyRegisterRouter = require('./routes/companyRegister');
var companyUpdateRouter = require('./routes/companyUpdate');
var employeeNewRouter = require('./routes/employeeNew');
var employeeUpdateRouter = require('./routes/employeeUpdate');
var employeeChangePasswordRouter = require('./routes/EmployeeChangePassword');
var departmentNewRouter = require('./routes/departmentNew');
var departmentUpdateRouter = require('./routes/departmentUpdate');
var customerNewRouter = require('./routes/customerNew');
var customerUpdateRouter = require('./routes/customerUpdate');
var bankNewRouter = require('./routes/bankNew');
var bankUpdateRouter = require('./routes/bankUpdate');
var glNewRouter = require('./routes/glNew');
var glUpdateRouter = require('./routes/glUpdate');
var taxNewRouter = require('./routes/taxNew');
var taxUpdateRouter = require('./routes/taxUpdate');
var epfNewRouter = require('./routes/epfNew');
var epfUpdateRouter = require('./routes/epfUpdate');
var socsoNewRouter = require('./routes/socsoNew');
var socsoUpdateRouter = require('./routes/socsoUpdate');
var locationUpdateRouter = require('./routes/locationUpdate');
var categoryUpdateRouter = require('./routes/categoryUpdate');
var imageSqlRouter = require('./routes/imageSql');
var productNewRouter = require('./routes/productNew');
var productUpdateRouter = require('./routes/productUpdate');
var glOpenBalanceRouter = require("./routes/glOpenBalance");
var voucherDeleteRouter = require("./routes/voucherDelete");
// var voucherChangeRouter = require("./routes/voucherChange");
var bankTransactionRouter = require("./routes/bankTransaction");
var purchaseInvoiceRouter = require('./routes/purchaseInvoice');
var purchaseVoucherRouter = require('./routes/purchaseVoucher');
var productOpenBalanceRouter = require('./routes/productOpenBalance');
var purchaseNoteRouter = require('./routes/purchaseNote');
var purchaseReturnNoteRouter = require('./routes/purchaseReturnNote');
var purchasePaymentRouter = require('./routes/purchasePayment');
var salesInvoiceRouter = require('./routes/salesInvoice');
var salesInvoiceEditRouter = require('./routes/salesInvoiceEdit');
var salesNoteRouter = require('./routes/salesNote');
var salesReturnNoteRouter = require('./routes/salesReturnNote');
var salesPaymentRouter = require('./routes/salesPayment');
var bankReconciliationRouter = require('./routes/bankReconciliation');
var monthlyTrialBalanceRouter = require('./routes/monthlyTrialBalance');

// upload = multer({dest: 'uploads/'});
// var homeRouter = require("./routes/sidebar");


var app = express();
/*
// testing mysql pool connection
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'pl0138026481',
    database : 'csac-ctrl-db'
  });

  app.get("/",(req,res) => {
      pool.getConnection((err, connection) => {

          console.log('connected as id ' + connection.threadId);
          connection.query('SELECT * from companyCTRL LIMIT 1', (err, rows) => {
              connection.release(); // return the connection to pool
              if(err) throw err;
              console.log('The data from users table are: \n', rows);
          });
          console.log("MySQL connected");
          if(err) throw err;
      });
  });
*/


//var upload = multer({ storage : storage}).single('avatar');
//  console.log(upload);

//app.use(fileUpload());
// view engine setup
//app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

app.use(cors());
//app.use(cors({
//  origin: '*'
//}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use("/companyRegister", companyRegisterRouter);
app.use("/companyUpdate", companyUpdateRouter);
app.use("/employeeNew", employeeNewRouter);
app.use("/employeeUpdate", employeeUpdateRouter);
app.use("/employeeChangePassword", employeeChangePasswordRouter);
app.use("/departmentNew", departmentNewRouter);
app.use("/departmentUpdate", departmentUpdateRouter);
app.use("/customerNew", customerNewRouter);
app.use("/customerUpdate", customerUpdateRouter);
app.use("/bankNew", bankNewRouter);
app.use("/bankUpdate", bankUpdateRouter);
app.use("/glNew", glNewRouter);
app.use("/glUpdate", glUpdateRouter);
app.use("/taxNew", taxNewRouter);
app.use("/taxUpdate", taxUpdateRouter);
app.use("/epfNew", epfNewRouter);
app.use("/epfUpdate", epfUpdateRouter);
app.use("/socsoNew", socsoNewRouter);
app.use("/socsoUpdate", socsoUpdateRouter);
app.use("/locationUpdate", locationUpdateRouter);
app.use("/categoryUpdate", categoryUpdateRouter);
app.use("/ImageSql", imageSqlRouter);
app.use("/productNew", productNewRouter);
app.use("/productUpdate", productUpdateRouter);
app.use("/glOpenBalance", glOpenBalanceRouter);
app.use("/voucherDelete", voucherDeleteRouter);
// app.use("/voucherChange", voucherChangeRouter);
app.use("/bankTransaction", bankTransactionRouter);
app.use("/purchaseInvoice", purchaseInvoiceRouter);
app.use("/purchaseVoucher", purchaseVoucherRouter);
app.use("/productOpenBalance", productOpenBalanceRouter);
app.use("/purchaseNote", purchaseNoteRouter);
app.use("/purchaseReturnNote", purchaseReturnNoteRouter);
app.use("/purchasePayment", purchasePaymentRouter);
app.use("/salesInvoice", salesInvoiceRouter);
app.use("/salesInvoiceEdit", salesInvoiceEditRouter);
app.use("/salesReturnNote", salesReturnNoteRouter);
app.use("/salesPayment", salesPaymentRouter);
app.use("/bankReconciliation", bankReconciliationRouter);
app.use("/monthlyTrialBalance", monthlyTrialBalanceRouter);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require("./routes/passport")(passport);

/*
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

*/
/*
passport.use(new LocalStrategy(
  // your verification logic goes here
  // this test verification function always succeeds and returns a hard-coded user
  function (username, password, done) {
    console.log("Verification function called");
    return done(null, { username, id: "1" });
  }
));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/', 'uploads'),
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
})
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
  connection.query("select * from admin where id = "+id,function(err,rows){
    done(err, rows[0]);
  });
  });
*/


app.get("/", express.static(path.join(__dirname, "./public")));
app.get("/", function(req, res){
   // res.json({
    //    message: "Thank you for visiting our online site, server is connected !"
   //  });

     res.render("home");

  });


//app.get('/cool', (req, res) => res.send(cool()));

app.post("/bankReconDelete", function(req, res, next) {
   var companyID = req.body.companyID;
   var bankID = req.body.bankID;
   var txnDate = req.body.txnDate;

   var db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   timezone : "+00:00",
 });  // ale/  var userLevel = req.query.userLevel;

 var sql="DELETE from bankRecon where companyID = '"+companyID+"' AND bankID='"+ bankID +"' AND txnDate='"+txnDate+"'" ;
   // console.log(req.beforeDestroy() {
  console.log(sql);
   // },);
 db.query(sql, function (err, results, fields) {
  if(err){
    console.log('Error while deleting Tax Record, err');
   res.send("fail");
  }else{


    console.log('Bank Reconciliation Record delete successfully');
    console.log(results.affectedRows);
   res.send("Bank Reconciliation for Bank: "+bankID+" at "+txnDate+" successfully deleted");
    //results(null,res);
 }
//   db.end();
});
});


  app.post("/employeeDelete", function(req, res, next) {
     var companyID = req.body.companyID;
     var employeeNo = req.body.employeeNo;
     console.log(employeeNo);
     var db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
   });  // ale/  var userLevel = req.query.userLevel;

     var sql="DELETE from employee where companyID = '"+companyID+"' AND employeeNo='"+ employeeNo +"'" ;
       // console.log(req.beforeDestroy() {
      console.log(sql);
       // },);
     db.query(sql, function (err, results, fields) {
      if(err){
        console.log('Error while fetching employee Record, err');
       res.send(alert("fail delete employee"));
      }else{


        console.log('Employee fetched successfully');
       res.send("success");
        //results(null,res);
     }
  //   db.end();
})
});


  app.get("/employeeList", function(req, res, next) {
    var companyID = req.query.companyID;
    var userLevel = req.query.userLevel;
    console.log(companyID);
    console.log(userLevel);
    var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // ale/  var userLevel = req.query.userLevel;

    //console.log('req.body here -> ', categoryID);
    var sql="SELECT * from employee where companyID = '"+companyID+"' and level > '"+ userLevel +"' order by employeeNo";
      // console.log(req.beforeDestroy() {
     console.log(sql);
      // },);
    db.query(sql, function (err, results, fields) {
     if(err){
       console.log('Error while fetching employee Record, err');
      // results(null,err);
      res.send(alert("employee load data fail"));
    }else{


       console.log('Employee fetched successfully');
      console.log(results);
           res.send(results);

       //results(null,res);
    }
    // db.end();



    });
    });

    app.get("/userSearch", function(req, res, next) {
      var companyID = req.query.companyID;
      var employeeNo = req.query.employeeNo;
      console.log(companyID);
      console.log(employeeNo);
      var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // ale/  var userLevel = req.query.userLevel;

      //console.log('req.body here -> ', categoryID);
      var sql="SELECT * from employee where companyID = '"+companyID+"' and employeeNo = '"+ employeeNo +"'";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching employee Record, err');
        // results(null,err);
        res.send(alert("employee load data fail"));
      }else{


         console.log('Employee search successfully');
          console.log(results);
             res.send(results);

         //results(null,res);
      }
  //     db.end();



      });
      });

    app.get("/customerList", function(req, res, next) {
      var companyID = req.query.companyID;
      var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
        connectionLimit: 100,
      });  // alert(c
    //  var userLevel = req.query.userLevel;
      console.log(companyID);
    //  db = conn.getConnection();
    //  db.connect(function(err) {
  //      if (err) throw err;
  //      console.log("Connected!");
  //      });

      // console.log(userLevel);I
      //console.log('req.body here -> ', categoryID);
      var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' order by supplierID";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching Customer/Supplier Record, err');
        // results(null,err);
        res.send(alert("fail to load supplier/Customer data "));
      }else{
         for (let i = 0; i < results.length; i++) {
            let amt=results[i].creditLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            results[i].creditLimit = amt;
           }

         console.log('Customer/Supplier fetched successfully');
        console.log(results);
             res.send(results);

         //results(null,res);
      }

  //     db.end();


      });
      });

      app.get("/suppCustAcctList", function(req, res, next) {
        var companyID = req.query.companyID;
        var acctType = req.query.acctType;
        var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // alert(c
      //  var userLevel = req.query.userLevel;
        console.log(companyID);
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' AND  acctType = '"+acctType+"' order by supplierID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Customer/Supplier Record, err');
          // results(null,err);
          res.send(alert("fail to load supplier/Customer data "));
        }else{
          // for (let i = 0; i < results.length; i++) {
          //    let amt=results[i].creditLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //    results[i].creditLimit = amt;
          //   }

           console.log('Customer/Supplier fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }

    //     db.end();


        });
        });

      app.get("/SupplierSearch", function(req, res, next) {
        var companyID = req.query.companyID;
        var supplierID = req.query.supplierID;
        var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // alert(c
      //  var userLevel = req.query.userLevel;
        console.log(companyID);
        console.log(supplierID);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' and SupplierID = '"+supplierID+"'";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while searching Customer/Supplier Record, err');
          // results(null,err);
          res.send(alert("fail to search supplier/Customer data "));
        }else{

           console.log('Customer/Supplier search successfully');
          console.log(results);
               res.send(results);


           //results(null,res);
        }

      //   db.end();


        });
        });



      app.get("/custSuppList", function(req, res, next) {
        var companyID = req.query.companyID;
        var acctType = req.query.acctType;
        var SuppCust = 'Supplier';
        var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // alert(c
      //  var userLevel = req.query.userLevel;
        console.log(companyID);
        if (acctType === 'CUST') {
            SuppCust='CUSTOMER';
        }
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' and acctType = '"+acctType+"' order by supplierID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching '+SuppCust+' Record, err');
          // results(null,err);
          res.send(alert("fail to load "+SuppCust+" data "));
        }else{
           for (let i = 0; i < results.length; i++) {
              let amt=results[i].creditLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              results[i].creditLimit = amt;
             }

           console.log(SuppCust+' fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }

      //   db.end();


        });
        });

      app.get("/bankList", function(req, res, next) {
        var companyID = req.query.companyID;
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;
//  var userLevel = req.query.userLevel;
        console.log(companyID);
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from bankAcct where companyID = '"+companyID+"' order by bankID";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Bank Record, err');
          // results(null,err);
          res.send(alert('fail to load bank data'));
        }else{


           console.log('Bank Account fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }


    //      db.end();

        });
        });



          app.get("/bankReconSearch", function(req, res, next) {
            var companyID = req.query.companyID;
            var bankID= req.query.bankID;
            var txnDate = req.query.txnDate;
            var db = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              timezone : "+00:00",
              connectionLimit: 100,
            });  // alert(c
          //  var userLevel = req.query.userLevel;
            console.log(companyID);
          //  db = conn.getConnection();
          //  db.connect(function(err) {
        //      if (err) throw err;
        //      console.log("Connected!");
        //      });

            // console.log(userLevel);I
            //console.log('req.body here -> ', categoryID);
            var sql="SELECT * from bankRecon where companyID = '"+companyID+"' and bankID='"+bankID+"' and txnDate = '"+txnDate+"'";
              // console.log(req.beforeDestroy() {
             console.log(sql);
              // },);
            db.query(sql, function (err, results, fields) {
             if(err){
               console.log('Error while fetching Bank Reconciliation Record, err');
              // results(null,err);
              res.send(null);
            }else{

               console.log('Bank Reconciliation fetched successfully');
                console.log(results);
                   res.send(results);

               //results(null,res);
            }

        //     db.end();


            });
            });

            app.get("/bankReconSummary", function(req, res, next) {
              var companyID = req.query.companyID;
          //    var bankID= req.query.bankID;
              var startDate = req.query.startDate;
              var endDate = req.query.endDate
              var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
                connectionLimit: 100,
              });  // alert(c
            //  var userLevel = req.query.userLevel;
              console.log(companyID);
            //  db = conn.getConnection();
            //  db.connect(function(err) {
            //      if (err) throw err;
            //      console.log("Connected!");
            //      });

              // console.log(userLevel);I
              //console.log('req.body here -> ', categoryID);
              var sql="SELECT * from bankRecon where companyID = '"+companyID+"' and (DATE(txnDate) BETWEEN '"+startDate+"' and '"+endDate+"') and rowNo = 0 order by txnDate ASC";
                // console.log(req.beforeDestroy() {
               console.log(sql);
                // },);
              db.query(sql, function (err, results, fields) {
               if(err){
                 console.log('Error while fetching Bank Reconciliation Record, err');
                // results(null,err);
                res.send(null);
              }else{
               if (results.length>0) {
                 console.log('Bank Reconciliation fetched successfully');
                  console.log(results);
                     res.send(results);
                } else {
                  res.send(alert('No Bank Reconciliation between '+startDate+' and '+endDate));
                }
                 //results(null,res);
              }

            //     db.end();


              });
              });



  app.post("/companyData", function(req, res, next) {
    var companyID = req.body.companyID;

     // var categoryID = req.body.categoryID;
     console.log(companyID);
     var db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
   });  // ale/  var userLevel = req.query.userLevel;
   //console.log('req.body here -> ', categoryID);
     var sql="SELECT * from company where companyID = '"+companyID+"'";
       // console.log(req.beforeDestroy() {
      console.log(sql);
       // },);
     db.query(sql, function (err, results, fields) {
      if(err){
        console.log('fail to load  Company Record');
       // results(null,err);
    }else{


        console.log('company fetched successfully');



        //results(null,res);
    }


      console.log(results);
      //console.log('company', results);
      if (results.length>0) {
        console.log(results);
      res.send(results);
    } else {

      res.send(null);
     }
  //   db.end();
     });
    });



      app.post("/employeeData", function(req, res, next) {
        var companyID = req.body.companyID;
        var employeeNo = req.body.employeeNo;
         // var categoryID = req.body.categoryID;
         console.log(employeeNo);
         var db = mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         timezone : "+00:00",
       });  // ale/  var userLevel = req.query.userLevel;
   //console.log('req.body here -> ', categoryID);
         var sql="SELECT * from employee where companyID = '"+companyID+"' and employeeNo = '"+employeeNo+"'";
           // console.log(req.beforeDestroy() {
          console.log(sql);
           // },);
         db.query(sql, function (err, results, fields) {
          if(err){
            console.log('Error while fetching employee Record, err');
            res.send(alert("fail to load employee data"));
           // results(null,err);
        }else{


            console.log('employee fetched successfully');



            //results(null,res);
        }


          console.log(results);
          //console.log('company', results);
          if (results.length>0) {
            console.log(results);
          res.send(results);
        } else {

          res.send(null);
         }
    //      db.end();
         });
        });

        app.post("/customerData", function(req, res, next) {
          var companyID = req.body.companyID;
          var supplierID = req.body.supplierID;
           // var categoryID = req.body.categoryID;
           console.log(supplierID);
           var db = mysql.createConnection({
           host: process.env.DB_HOST,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_NAME,
           timezone : "+00:00",
         });  // ale/  var userLevel = req.query.userLevel;

           var sql="SELECT * from suppCustAcct where companyID = '"+companyID+"' and supplierID = '"+supplierID+"'";
             // console.log(req.beforeDestroy() {
            console.log(sql);
             // },);
           db.query(sql, function (err, results, fields) {
            if(err){
              console.log('Error while fetching Supplier / Customer Record, err');
              res.send(alert("faile to load Supplier/Customer Data"));
             // results(null,err);
          }else{


              console.log('Supplier / Customer fetched successfully');



              //results(null,res);
          }


            console.log(results);
            //console.log('company', results);
            if (results.length>0) {
              console.log(results);
            res.send(results);
          } else {

            res.send(null);
           }
      //     db.end();
           });
          });

        app.post("/DepartmentData", function(req, res, next) {
          var companyID = req.body.companyID;
          var department = req.body.department;
           // var categoryID = req.body.categoryID;
           console.log(department);
           var db = mysql.createConnection({
           host: process.env.DB_HOST,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_NAME,
           timezone : "+00:00",
         });  // ale/  var userLevel = req.query.userLevel;
     //console.log('req.body here -> ', categoryID);
           var sql="SELECT * from department where companyID = '"+companyID+"' and department = '"+department+"'";
             // console.log(req.beforeDestroy() {
            console.log(sql);
             // },);
           db.query(sql, function (err, results, fields) {
            if(err){
              console.log('Error while fetching department Record, err');
              res.send(err);
             // results(null,err);
          }else{


              console.log('Department fetched successfully');



              //results(null,res);
          }


            console.log(results);
            //console.log('company', results);
            if (results.length>0) {
              console.log(results);
            res.send(results);
          } else {

            res.send(null);
           }
      //     db.end();
           });
          });

          app.post("/BankData", function(req, res, next) {
            var companyID = req.body.companyID;
            var bankID = req.body.bankID;
             // var categoryID = req.body.categoryID;
             console.log(bankID);
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });
            // ale/  var userLevel = req.query.userLevel;
   //console.log('req.body here -> ', categoryID);
             var sql="SELECT * from bankAcct where companyID = '"+companyID+"' and bankID = '"+bankID+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                console.log('Error while fetching Bank Record, err');
                res.send(alert('faile to load Bank record'));
               // results(null,err);
            }else{


                console.log('Bank fetched successfully');



                //results(null,res);
            }


              console.log(results);
              //console.log('company', results);
              if (results.length>0) {
                console.log(results);
              res.send(results);
            } else {

              res.send(null);
             }
        //      db.end();
             });
            });

  app.get("/login", function(req, res){
    res.render("login");
    //res.render("login", { message: req.flash('loginMessage') });
  });

  app.get("/register", function(req, res){
    // render the page and pass in any flash data if it exists
    res.render('register.ejs', { message: req.flash('signupMessage') });
    //res.render("register");
  });

  app.get("/secrets", function(req, res){
   // Successfullet submittedSecret = req.body.secret;
    // console.log("here");
    res.render("secrets"); // , {usersWithSecrets: "my secret"});

  });



  app.get("/saveImage", function(req, res){
    res.render('saveImage');
  });

  app.get("/uploadImage", function(req, res) {
    res.render('uploadImage');
  });


  app.post("/adminLogin", function(req, res){

    var md5Password = md5(req.body.password+req.body.adminName+req.body.companyID);
    // console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var uservalidate = "SElECT * FROM admin WHERE adminName="+"'"+ req.body.adminName+ "' AND companyID="+"'"+ req.body.companyID+ "'"+" AND password="+ "'"+md5Password+"'";
     //  console.log(uservalidate);
    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: 'centralsoft',
      password: 'F7eTo+zZ1c!9b*6e',
      database: 'codesquaddb',
      timezone : "+00:00",
    });

    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        });
        console.log(uservalidate);
    con.query(uservalidate, function(err, row) {

        if (err) {

            //alert(result);
           console.log(err.message);

           } else {
             if (row.length>0) {

               console.log(row[0].companyName);
               //alert("Login Success");
               res.send(row[0].companyName);
             } else {

              // res.redirect("/");
               res.send("fail!!!");
             }


           }

          // con.end();


    });

  });

  app.post("/employeeLogin", function(req, res){
    var md5Password = md5(req.body.password+req.body.employeeNo+req.body.companyID);

    // console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var uservalidate = "SElECT * FROM employee WHERE employeeNo='"+ req.body.employeeNo+ "' AND companyID='"+ req.body.companyID+ "' AND password='"+md5Password+"'";
       console.log(uservalidate);
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
    con.query(uservalidate, function(err, row) {

        if (err) {

            //alert(result);
           console.log(err.message);

           } else {
             if (row.length>0) {
                console.log(row);
              // res.redirect("/secrets");
               //alert("Login Success");
               res.send(row);

             } else {
                res.send(row);
                // res.redirect("/");
            // res.send(alert("login failed due to Company not register or employee name or password invalid"));
             }


           }

    //       con.end();


    });

  });

  app.get("/companyInfo", function(req, res, next) {
    var companyID = req.query.companyID;

    console.log(companyID);
    var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // ale/  var userLevel = req.query.userLevel;

    var sql="SELECT * from company where companyID = '"+companyID+"'";
      // console.log(req.beforeDestroy() {
     console.log(sql);
      // },);
    db.query(sql, function (err, results, fields) {
     if(err){
       console.log('Error while fetching Company Info, err');
      // results(null,err);
      res.send(alert('fail to load Company data'));
    }else{


       console.log('Company Info fetched successfully');
      console.log(results);
           res.send(results);

       //results(null,res);
    }

    db.end();


    });
    });


  app.get("/departmentList", function(req, res, next) {
    var companyID = req.query.companyID;

    console.log(companyID);
    var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // ale/  var userLevel = req.query.userLevel;

    var sql="SELECT * from department where companyID = '"+companyID+"' order by department";
      // console.log(req.beforeDestroy() {
     console.log(sql);
      // },);
    db.query(sql, function (err, results, fields) {
     if(err){
       console.log('Error while fetching Department Record, err');
      // results(null,err);
      res.send(alert('fail to load Department data'));
    }else{


       console.log('Department fetched successfully');
      console.log(results);
           res.send(results);

       //results(null,res);
    }

    db.end();


    });
    });
    app.get("/assetGlList", function(req, res, next) {
      var companyID = req.query.companyID;
      var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // ale/  var userLevel = req.query.userLevel;
      console.log(companyID);
    //  console.log(host);
    //  console.log(user);
  //    console.log(password);
  //    console.log(database);
      // console.log(userLevel);
      //console.log('req.body here -> ', categoryID);
      var sql="SELECT * from glAccount where companyID = '"+companyID+"' AND (glType='401' OR glType='501') order by glNo";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching General Ledger Record, err');
        // results(null,err);
        res.send(alert('fail to load General Ledger data'));
      }else{


         console.log('Generl Ledger fetched successfully');
        console.log(results);
             res.send(results);

         //results(null,res);
      }


    //  db.end();

      });
      });
      app.get("/salesGlList", function(req, res, next) {
        var companyID = req.query.companyID;
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;
        console.log(companyID);
      //  console.log(host);
      //  console.log(user);
      //    console.log(password);
      //    console.log(database);
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from glAccount where companyID = '"+companyID+"' AND (glType='401' OR glType='501' OR glType='201' OR glType='301') order by glNo";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching General Ledger Record, err');
          // results(null,err);
          res.send(alert('fail to load General Ledger data'));
        }else{


           console.log('Generl Ledger fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }


        db.end();

        });
        });
      app.get("/glList", function(req, res, next) {
        var companyID = req.query.companyID;
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;
        console.log(companyID);
       console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_NAME);

      //  db.connect()
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from glAccount where companyID = '"+companyID+"' order by glNo";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching General Ledger Record'+ err);
           return;
          // results(null,err);
        //  res.send(alert('fail to load General Ledger record'));
        }else{


           console.log('Generl Ledger fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }


        db.end();

        });
        });

app.get("/glSelectList", function(req, res, next) {
          var companyID = req.query.companyID;
          var glType = req.query.gType;
          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;
          console.log(companyID);
          console.log(process.env.DB_HOST);
          console.log(process.env.DB_USER);
          console.log(process.env.DB_PASSWORD);
          console.log(process.env.DB_NAME);
          //console.log('req.body here -> ', categoryID);
          var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glType= '"+glType+"' order by glNo";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
             console.log('Error while fetching General Ledger Record, err');
            // results(null,err);
        //    res.send(alert('fail to load General Ledger record'));
          }else{


             console.log('Generl Ledger fetched successfully');
            console.log(results);
                 res.send(results);

             //results(null,res);
          }


          db.end();

          });
          });

          app.get("/glMultiSelectList", function(req, res, next) {
                    var companyID = req.query.companyID;
                    var glType = req.query.gType;
                    var glType1 = req.query.gType1;
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;
                    console.log(companyID);
                    console.log(process.env.DB_HOST);
                    console.log(process.env.DB_USER);
                    console.log(process.env.DB_PASSWORD);
                    console.log(process.env.DB_NAME);
                    //console.log('req.body here -> ', categoryID);
                    var sql="SELECT * from glAccount where companyID = '"+companyID+"' and (glType= '"+glType+"' OR glType = '"+glType1+"') order by glNo";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching General Ledger Record, err');
                      // results(null,err);
                  //    res.send(alert('fail to load General Ledger record'));
                    }else{


                       console.log('Generl Ledger fetched successfully');
                      console.log(results);
                           res.send(results);

                       //results(null,res);
                    }


                  //  db.end();

                    });
                    });



    app.post("/departmentInfo", function(req, res, next) {

      var companyID = req.body.companyID;

      console.log(companyID);
      var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;
      var sql="SELECT id, department, description from department where companyID = '"+companyID+"' order by department";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching Department Record, err');
        // results(null,err);
        res.send(alert('fail to load Department record'));
      }else{


         console.log('Department fetched successfully');
        console.log(results);
             res.send(results);

         //results(null,res);
      }

         db.end();


      });
      });

      app.post("/glTypeInfo", function(req, res, next) {
        var companyID = req.body.companyID;
         // server connection
        var con = mysql.createConnection({
          host: process.env.DB_HOST,
          user: 'centralsoft',
          password: 'F7eTo+zZ1c!9b*6e',
          database: 'codesquaddb',
          timezone : "+00:00",
        });

        console.log(companyID);
        //console.log('req.body here -> ', categoryID);
        var sql="SELECT id, glType, glTypeName from glType  order by glType";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        con.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching G/: Account Type Record, err');
          // results(null,err);
          res.send(alert('fail to load General Ledger account type data'));
        }else{


           console.log('G/L Account Type fetched successfully');
          console.log(results);
               res.send(results);

           //results(null,res);
        }

       con.end();


        });
        });

        app.post("/glData", function(req, res, next) {
          var companyID = req.body.companyID;
          var glNo = req.body.glNo;
           var glSub = req.body.glSub;
           var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
           console.log(glNo+" - "+glSub);
           //console.log('req.body here -> ', categoryID);
           var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub='"+glSub+"'";
             // console.log(req.beforeDestroy() {
            console.log(sql);
             // },);
           db.query(sql, function (err, results, fields) {
            if(err){
              console.log('Error while fetching General Ledger Record, err');
              res.send('Error while fetching General Ledger Record');
             // results(null,err);
          }else{


              console.log('General Ledger fetched successfully');



              //results(null,res);



            console.log(results);
            //console.log('company', results);


            res.send(results);

         }
           db.end();
           });
          });

          app.get("/glData", function(req, res, next) {
            var companyID = req.body.companyID;
            var glNo = req.body.glNo;
             var glSub = req.body.glSub;
             var db = mysql.createConnection({
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME,
               timezone : "+00:00",
             });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
             console.log(glNo+" - "+glSub);
             //console.log('req.body here -> ', categoryID);
             var sql="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub='"+glSub+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                console.log('Error while fetching General Ledger Record, err');
                res.send('Error while fetching General Ledger Record');
               // results(null,err);
            }else{


                console.log('General Ledger fetched successfully');



                //results(null,res);



              console.log(results);
              //console.log('company', results);


              res.send(results);

           }
           db.end();
             });
            });
            // upload image
          app.post('/imageupload', async (req, res, next) => {
            //var companyID = req.body.companyID;
            //  console.log(req.query.companyID);
            //alert("here");
            //console.log(req.body.companyID);

              const storage = multer.diskStorage({


                destination: path.join(__dirname, './public/', 'uploads'),
                filename: function (req, file, cb) {
                  // null as first argument means no error
                //  const text = file.originalname;
                //  const pos = text.indexOf("#");
                //  const dir = text.slice(0,pos);
                    console.log(file.originalname);
                //    console.log(file.companyID);
                 //   destination: path.join(__dirname, './'+dir+'/', 'uploads'),

                  cb(null, file.originalname )
                }
              });

            try {
               // 'avatar' is the name of our file input field in the HTML form
              let upload = multer({ storage: storage}).single('avatar');

              upload(req, res, function(err) {
                // req.file contains information of uploaded file
                // req.body contains information of text fields
               // console.log(req.file);
                if (!req.file) {
                  return res.send(alert('Please select an image to upload'));
                }
                else if (err instanceof multer.MulterError) {
                  return res.send(alert("fail to upload image"));
                }
                else if (err) {
                  return res.send(alert("fail to upload image"));
                }

                const classifiedsadd = {
                  image: req.file.filename
                };
                  res.send("Image successfully Uploaded");

              });
            } catch (err) {console.log(err)}
          });

          app.post("/taxDelete", function(req, res, next) {
            var companyID = req.body.companyID;
            var taxID = req.body.taxID;
             console.log(taxID);
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });  // ale/  var userLevel = req.query.userLevel;

             var sql="DELETE from tax where companyID = '"+companyID+"' AND taxID='"+ taxID +"'" ;
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                console.log('Error while deleting Tax Record, err');
               res.send("fail");
              }else{


                console.log('Tax Record delete successfully');
               res.send("success");
                //results(null,res);
             }
             db.end();
          })
          });
          app.get("/taxVerify", function(req, res, next) {
            var companyID = req.query.companyID;
            var taxID = req.query.taxID;
            var db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,

            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone : "+00:00",
          });  // ale/  var userLevel = req.query.userLevel;
            console.log(taxID);
            // console.log(userLevel);
            //console.log('req.body here -> ', categoryID);
            var sql="SELECT * from purchaseInvoice where companyID = '"+companyID+"' AND taxID = '"+taxID+"'";
              // console.log(req.beforeDestroy() {
             console.log(sql);
              // },);
            db.query(sql, function (err, results, fields) {
             if(err){
               console.log('Error while verifying Government Tax on Purchase Invoice Record, err');
              // results(null,err);
              res.send(alert('fail to verify Government Tax on Purchase Invoice record'));
            }else{
              console.log(results);
                //   res.send(results)
             if (results.length > 0) {
                  res.send('Existed');
             } else{
                  res.send('Invalid');
             }



               //results(null,res);
            }


            db.end();

            });
            });
          app.get("/taxList", function(req, res, next) {
            var companyID = req.query.companyID;
            var taxType = req.query.taxType;
            var db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone : "+00:00",
          });  // ale/  var userLevel = req.query.userLevel;
            console.log(companyID);
            // console.log(userLevel);
            //console.log('req.body here -> ', categoryID);
            var sql="SELECT * from tax where companyID = '"+companyID+"' and taxType <> '"+taxType+"'";
              // console.log(req.beforeDestroy() {
            // console.log(sql);
              // },);
            db.query(sql, function (err, results, fields) {
             if(err) {
               console.log('Error while fetching Government Tax Record: '+err);
              return;
              // results(null,err);
            //  res.send(alert('fail to load Government Tax record'));
            }else{


               console.log('Government Tax fetched successfully');
              console.log(results);
                   res.send(results);

               //results(null,res);
            }


            db.end();

            });
            });

            app.post("/taxData", function(req, res, next) {
              var companyID = req.body.companyID;
              var taxID = req.body.taxID;

               var db = mysql.createConnection({
                 host: process.env.DB_HOST,
                 user: process.env.DB_USER,
                 password: process.env.DB_PASSWORD,
                 database: process.env.DB_NAME,
                 timezone : "+00:00",
               });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
               console.log(companyID+' - '+taxID);
               //console.log('req.body here -> ', categoryID);
               var sql="SELECT * from tax where companyID = '"+companyID+"' and taxID = '"+taxID+"'";
                 // console.log(req.beforeDestroy() {
                console.log(sql);
                 // },);
               db.query(sql, function (err, results, fields) {
                if(err){
                  console.log('Error while fetching Tax Record, err');
                //  res.send(alert('fail to load Tax Record'));
                 // results(null,err);
              }else{


                  console.log('Tax fetched successfully');



                  //results(null,res);



                console.log(results);
                //console.log('company', results);


                res.send(results);

             }
               db.end();
               });
              });

              app.get("/epfList", function(req, res, next) {
                var companyID = req.query.companyID;
              //  var userLevel = req.query.userLevel;
                console.log(companyID);
                var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
              });  // ale/  var userLevel = req.query.userLevel;

                var sql="SELECT * from epf where companyID = '"+companyID+"' order by startSalary";
                  // console.log(req.beforeDestroy() {
                 console.log(sql);
                  // },);
                db.query(sql, function (err, results, fields) {
                 if(err){
                   console.log('Error while fetching EPF Record, err');
                  // results(null,err);
                  res.send(alert('fail to load EPF record'));
                }else{

            for (let i = 0; i < results.length; i++) {
            let amt=results[i].startSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            results[i].startSalary = amt;


           };

            for (let i = 0; i < results.length; i++) {
            let amt=results[i].endSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            results[i].endSalary = amt;


           };



                   console.log('EPF fetched successfully');
                  console.log(results);
                       res.send(results);

                   //results(null,res);
                }


                db.end();

                });
                });

                app.post("/epfData", function(req, res, next) {
                  var companyID = req.body.companyID;
                  var ID = req.body.ID;

                   var db = mysql.createConnection({
                     host: process.env.DB_HOST,
                     user: process.env.DB_USER,
                     password: process.env.DB_PASSWORD,
                     database: process.env.DB_NAME,
                     timezone : "+00:00",
                   });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
                   console.log(companyID+' - '+ID);
                   //console.log('req.body here -> ', categoryID);
                   var sql="SELECT * from epf where companyID = '"+companyID+"' and id = '"+ID+"'";
                     // console.log(req.beforeDestroy() {
                    console.log(sql);
                     // },);
                   db.query(sql, function (err, results, fields) {
                    if(err){
                      console.log('Error while fetching EPF Record, err');
                      res.send(alert('Fail to load EPF Record'));
                     // results(null,err);
                  }else{


                      console.log('EPF fetched successfully');



                      //results(null,res);



                    console.log(results);
                    //console.log('company', results);


                    res.send(results);

                 }
                   db.end();
                   });
                  });

                  app.post("/epfDelete", function(req, res, next) {
                     var companyID = req.body.companyID;
                     var id = req.body.ID;
                     console.log(id);
                     var db = mysql.createConnection({
                     host: process.env.DB_HOST,
                     user: process.env.DB_USER,
                     password: process.env.DB_PASSWORD,
                     database: process.env.DB_NAME,
                     timezone : "+00:00",
                   });  // ale/  var userLevel = req.query.userLevel;

                     var sql="DELETE from epf where companyID = '"+companyID+"' AND id='"+ id +"'" ;
                       // console.log(req.beforeDestroy() {
                      console.log(sql);
                       // },);
                     db.query(sql, function (err, results, fields) {
                      if(err){
                        console.log('Error while deleting EPF Record, err');
                       res.send(alert("fail to load EPF record"));
                      }else{


                        console.log('EPF Record delete successfully');
                       res.send("success");
                        //results(null,res);
                     }
                     db.end();
                  })
                  });

                  app.get("/socsoList", function(req, res, next) {
                    var companyID = req.query.companyID;
                  //  var userLevel = req.query.userLevel;
                    console.log(companyID);
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    //console.log('req.body here -> ', categoryID);
                    var sql="SELECT * from socso where companyID = '"+companyID+"' order by startSalary";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching SOCSO Record, err');
                      // results(null,err);
                      res.send(alert('fail to load SOCSO record'));
                    }else{
                             for (let i = 0; i < results.length; i++) {
                                let amt=results[i].startSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                results[i].startSalary = amt;


                               };

                                for (let i = 0; i < results.length; i++) {
                                let amt=results[i].endSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                results[i].endSalary = amt;


                               };

                       console.log('SOCSO fetched successfully');
                      console.log(results);
                           res.send(results);

                       //results(null,res);
                    }

                     db.end()


                    });
                    });

                    app.post("/socsoData", function(req, res, next) {
                      var companyID = req.body.companyID;
                      var ID = req.body.ID;

                       var db = mysql.createConnection({
                         host: process.env.DB_HOST,
                         user: process.env.DB_USER,
                         password: process.env.DB_PASSWORD,
                         database: process.env.DB_NAME,
                         timezone : "+00:00",
                       });  // alert(companyID+" - "+glNo+ ' - '+glSub);// var categoryID = req.body.categoryID;
                       console.log(companyID+' - '+ID);
                       //console.log('req.body here -> ', categoryID);
                       var sql="SELECT * from socso where companyID = '"+companyID+"' and id = '"+ID+"'";
                         // console.log(req.beforeDestroy() {
                        console.log(sql);
                         // },);
                       db.query(sql, function (err, results, fields) {
                        if(err){
                          console.log('Error while fetching SOCSO Record, err');
                          res.send('fail to load SOCSO Record');
                         // results(null,err);
                      }else{


                          console.log('SOCSO fetched successfully');



                          //results(null,res);



                        console.log(results);
                        //console.log('company', results);


                        res.send(results);

                     }
                       db.end();
                       });
                      });

                      app.post("/socsoDelete", function(req, res, next) {
                         var companyID = req.body.companyID;
                         var id = req.body.ID;
                         console.log(id);
                         var db = mysql.createConnection({
                         host: process.env.DB_HOST,
                         user: process.env.DB_USER,
                         password: process.env.DB_PASSWORD,
                         database: process.env.DB_NAME,
                         timezone : "+00:00",
                       });  // ale/  var userLevel = req.query.userLevel;

                         var sql="DELETE from socso where companyID = '"+companyID+"' AND id='"+ id +"'" ;
                           // console.log(req.beforeDestroy() {
                          console.log(sql);
                           // },);
                         db.query(sql, function (err, results, fields) {
                          if(err){
                            console.log('Error while deleting SOCSO Record, err');
                           res.send(alert("fail to load SOCSO record"));
                          }else{


                            console.log('SOCSO Record delete successfully');
                           res.send("success");
                            //results(null,res);
                         }
                         db.end();
                      })
                      });

                      app.get("/locationList", function(req, res, next) {
                        var companyID = req.query.companyID;

                      //  var userLevel = req.query.userLevel;
                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from stockLocation where companyID = '"+companyID+"' order by locationID";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching Product Location Record, err');
                          // results(null,err);
                          res.send(alert('fail to load Product Location record'));
                        }else{


                           console.log('Product Location fetched successfully');
                          console.log(results);
                               res.send(results);

                           //results(null,res);
                        }

                         db.end();


                        });
                        });

                        app.get("/categoryList", function(req, res, next) {
                          var companyID = req.query.companyID;
                        //  var userLevel = req.query.userLevel;
                          console.log(companyID);
                          var db = mysql.createConnection({
                          host: process.env.DB_HOST,
                          user: process.env.DB_USER,
                          password: process.env.DB_PASSWORD,
                          database: process.env.DB_NAME,
                          timezone : "+00:00",
                        });  // ale/  var userLevel = req.query.userLevel;
    // console.log(userLevel);
                          //console.log('req.body here -> ', categoryID);
                          var sql="SELECT * from category where companyID = '"+companyID+"' order by categoryID";
                            // console.log(req.beforeDestroy() {
                           console.log(sql);
                            // },);
                          db.query(sql, function (err, results, fields) {
                           if(err){
                             console.log('Error while fetching Product Category Record, err');
                            // results(null,err);
                            res.send(alert('fail to load Product Category record'));
                          }else{


                             console.log('Product Category fetched successfully');
                            console.log(results);
                                 res.send(results);

                             //results(null,res);
                          }

                           db.end();


                          });
                          });

                          app.post("/categoryInfo", function(req, res, next) {
                            var companyID = req.body.companyID;
                            var db = mysql.createConnection({
                              host: process.env.DB_HOST,
                              user: process.env.DB_USER,
                              password: process.env.DB_PASSWORD,
                              database: process.env.DB_NAME,
                              timezone : "+00:00",
                            });  // alert(c
                            console.log(companyID);

                          //  var db = mysql.createConnection({
                        //      host: process.env.DB_HOST,
                          //    user: process.env.DB_USER,
                          //    password: process.env.DB_PASSWORD,
                          //    database: 'centralsoft',
                          //    timezone : "+00:00",
                          //  }); // alert(c
                            //console.log('req.body here -> ', categoryID);
                            var sql="SELECT id, categoryID, categoryName from category where companyID='"+ companyID +"' order by categoryID";
                              // console.log(req.beforeDestroy() {
                             console.log(sql);

                            db.query(sql, function (err, results, fields) {
                             if(err){
                               console.log('Error while fetching  Record, err');
                              // results(null,err);
                              res.send(alert('fail to load product category record'));
                            }else{


                               console.log('Category fetched successfully');
                              console.log(results);
                                   res.send(results);

                               //results(null,res);
                            }
                           db.end();
                            });
                            });


                            app.post("/imageInfo", function(req, res, next) {
                              var companyID = req.body.companyID;
                              var db = mysql.createConnection({
                                host: process.env.DB_HOST,
                                user: process.env.DB_USER,
                                password: process.env.DB_PASSWORD,
                                database: process.env.DB_NAME,
                                timezone : "+00:00",
                              });  // alert(c
                              console.log(companyID);
                            //  var db = mysql.createConnection({
                          //      host: process.env.DB_HOST,
                          //      user: process.env.DB_USER,
                          //      password: process.env.DB_PASSWORD,
                            //    database: 'centralsoft',
                            //    timezone : "+00:00",
                            //  });
                              //console.log('req.body here -> ', categoryID);
                              var sql="SELECT id, imageID, imagePath from image where companyID='"+ companyID +"' order by imageID";
                                // console.log(req.beforeDestroy() {
                               console.log(sql);

                              db.query(sql, function (err, results, fields) {
                               if(err){
                                 console.log('Error while fetching  Record, err');
                                // results(null,err);
                                res.send(alert('fail to load image location'));
                              }else{


                                 console.log('Image fetched successfully');
                                console.log(results);
                                     res.send(results);

                                 //results(null,res);
                              }
                                db.end();
                              });
                              // db.end();
                              });


                          app.get("/productList", function(req, res, next) {
                            var companyID = req.query.companyID;
                            var db = mysql.createConnection({
                              host: process.env.DB_HOST,
                              user: process.env.DB_USER,
                              password: process.env.DB_PASSWORD,
                              database: process.env.DB_NAME,
                              timezone : "+00:00",
                            });  // alert(c
                          //  var userLevel = req.query.userLevel;
                            console.log(companyID);
                            // console.log(userLevel);
                            //console.log('req.body here -> ', categoryID);
                            var sql="SELECT * from product where companyID = '"+companyID+"' order by productID";
                              // console.log(req.beforeDestroy() {
                             console.log(sql);
                              // },);
                            db.query(sql, function (err, results, fields) {
                             if(err){
                               console.log('Error while fetching Product Record, err');
                              // results(null,err);
                              res.send(alert('fail to load Product record'));
                            }else{


                               console.log('Product fetched successfully');
                              console.log(results);
                                   res.send(results);

                               //results(null,res);
                            }

                             db.end();


                            });
                            });


                            app.get("/productSearch", function(req, res, next) {
                              var companyID = req.query.companyID;
                              var productID = req.query.productID;
                              var db = mysql.createConnection({
                                host: process.env.DB_HOST,
                                user: process.env.DB_USER,
                                password: process.env.DB_PASSWORD,
                                database: process.env.DB_NAME,
                                timezone : "+00:00",
                              });  // alert(c
                            //  var userLevel = req.query.userLevel;
                              console.log(companyID);
                              // console.log(userLevel);
                              //console.log('req.body here -> ', categoryID);
                              var sql="SELECT * from product where companyID = '"+companyID+"' and productID='"+productID+"'";
                                // console.log(req.beforeDestroy() {
                               console.log(sql);
                                // },);
                              db.query(sql, function (err, results, fields) {
                               if(err){
                                 console.log('Error while fetching Product Search, err');
                                // results(null,err);
                                res.send(alert('fail to load Product search'));
                              }else{


                                 console.log('Product search successfully');
                                console.log(results);
                                     res.send(results);

                                 //results(null,res);
                              }

                               db.end();


                              });
                              });


                              app.get("/productAdjustWritrOffSearch", function(req, res, next) {
                                var companyID = req.query.companyID;
                                var startDate = req.query.startDate;
                                var endDate = req.query.endDate;
                                var txnType = req.query.txnType;

                                var db = mysql.createConnection({
                                  host: process.env.DB_HOST,
                                  user: process.env.DB_USER,
                                  password: process.env.DB_PASSWORD,
                                  database: process.env.DB_NAME,
                                  timezone : "+00:00",
                                });  // alert(c
                              //  var userLevel = req.query.userLevel;
                                console.log(companyID);
                                // console.log(userLevel);
                                //console.log('req.body here -> ', categoryID);
                                var sql="SELECT * from productTxn where companyID = '"+companyID+"' and txnType='"+txnType+"' and txnDate >= '"+startDate+"' and txnDate <= '"+endDate+"' order by txnDate";
                                  // console.log(req.beforeDestroy() {
                                 console.log(sql);
                                  // },);
                                db.query(sql, function (err, results, fields) {
                                 if(err){
                                   console.log('Error while fetching Product Txn. Search, err');
                                  // results(null,err);
                                  res.send(alert('fail to load Product Txn. search'));
                                }else{


                                   console.log('Product Txn. search successfully');
                                  console.log(results);
                                       res.send(results);

                                   //results(null,res);
                                }

                                           db.end();


                                });
                                });

                            app.get("/productListByCategory", function(req, res, next) {
                              var companyID = req.query.companyID;
                              var categoryID = req.query.categoryID;
                              var db = mysql.createConnection({
                                host: process.env.DB_HOST,
                                user: process.env.DB_USER,
                                password: process.env.DB_PASSWORD,
                                database: process.env.DB_NAME,
                                timezone : "+00:00",
                              });  // alert(c
                            //  var userLevel = req.query.userLevel;
                              console.log(companyID);
                              console.log(categoryID);
                              //console.log('req.body here -> ', categoryID);
                              var sql="SELECT * from product where companyID = '"+companyID+"' and categoryID = '"+categoryID+"' order by productID";
                                // console.log(req.beforeDestroy() {
                               console.log(sql);
                                // },);
                              db.query(sql, function (err, results, fields) {
                               if(err){
                                 console.log('Error while fetching Product Record, err');
                                // results(null,err);
                                res.send(alert('fail to load Product record'));
                              }else{


                                 console.log('Product fetched successfully');
                                console.log(results);
                                     res.send(results);

                                 //results(null,res);
                              }

                               db.end();


                              });
                              });


  app.get('/fetchImage/:file(*)', (req, res) => {

  const imageID = req.params.file;
  let fileLocation = path.join('./public/uploads/', imageID);
    //res.send({image: fileLocation});
    console.log(fileLocation);
     res.sendFile(`${fileLocation}`, { root: '.' })
// res.sendFile(req.params.file, {root: path.join(__dirname, '/public/uploads')});
     console.log(imageID);
  //   res.send(files);
    //  res.sendFile('./public/uploads/' + files, { root: '.' })

});
app.post("/productAdjust", function(req, res, next) {
    var data = req.body;
console.log(data);
    var companyID = data.companyID;
    var productID = data.productID;
    var productName = data.productName;
    var sku = data.sku;
    var barcode = data.barcode;
    var unit = data.unit;
    var unitPrice = data.unitPrice;
    var adjQty = data.adjQty;
    var txnDate = data.txnDate;
    var txnParticular = data.txnParticular;
    var txnType = 'ADJUSTMENT';
    var txnQtyIn = 0;
    var txnQtyOut =0;
    if ((typeof adjQty) === 'string') {
        adjQty=Number(adjQty);
    }
console.log(adjQty);

  //  if (adjQty < 0 ){
  //     txnQtyout = (adjQty*-1);
  //  }

    if (adjQty <0 ){
       txnQtyOut = adjQty * -1;
     }
     if (adjQty >0 ) {
        txnQtyIn = adjQty;
     }
    var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // alert(c   // var categoryID = req.body.categoryID;


    dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, unit, unitPrice, txnType, txnQtyIn, txnQtyOut, txnDate, txnParticular, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+unit+"', '"+unitPrice+"', '"+txnType+"', '"+txnQtyIn+"', '"+txnQtyOut+"', '"+txnDate+"', '"+txnParticular+"', CURDATE())"

    console.log(dbquery);
        db.query(dbquery, function(err, row) {

                            if (err) {
                              //console.log(err.message);
                              console.log(err);
                            //  res.send(alert(err+" occured in input data, update fail"));
                             //res.sendStatus(500);
                             // return;
                             } else {
                              console.log("New Adjustment ProductTxn created")
                              res.send('success');
                             }
db.end()
          });

});

app.post("/productWriteOff", function(req, res, next) {
    var data = req.body;
console.log(data);
    var companyID = data.companyID;
    var productID = data.productID;
    var productName = data.productName;
    var sku = data.sku;
    var barcode = data.barcode;
    var unit = data.unit;
    var unitPrice = data.unitPrice;
    var adjQty = data.adjQty;
    var txnDate = data.txnDate;
    var txnParticular = data.txnParticular;
    var txnType = 'WRITEOFF';
    var txnQtyIn = 0;
    var txnQtyOut =0;
    if ((typeof adjQty) === 'string') {
        adjQty=Number(adjQty);
    }
console.log(adjQty);

  //  if (adjQty < 0 ){
  //     txnQtyout = (adjQty*-1);
  //  }

    if (adjQty < 0 ){
       txnQtyOut = adjQty * -1;
     } else {
       txnQtyOut = adjQty;
     }


    var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // alert(c   // var categoryID = req.body.categoryID;


    dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, unit, unitPrice, txnType, txnQtyIn, txnQtyOut, txnDate, txnParticular, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+unit+"', '"+unitPrice+"', '"+txnType+"', '"+txnQtyIn+"', '"+txnQtyOut+"', '"+txnDate+"', '"+txnParticular+"', CURDATE())"

    console.log(dbquery);
        db.query(dbquery, function(err, row) {

                            if (err) {
                              //console.log(err.message);
                              console.log(err);
                            //  res.send(alert(err+" occured in input data, update fail"));
                             //res.sendStatus(500);
                             // return;
                             } else {
                              console.log("New WTITE OFF ProductTxn created")
                              res.send('success');
                             }
db.end()
          });

});


app.post("/productData", function(req, res, next) {
  var companyID = req.body.companyID;
  var productID = req.body.productID;
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // alert(c   // var categoryID = req.body.categoryID;
   console.log(productID);
   //console.log('req.body here -> ', categoryID);
   var sql="SELECT * from product where companyID = '"+companyID+"' and productID = '"+productID+"'";
     // console.log(req.beforeDestroy() {
    console.log(sql);
     // },);
   db.query(sql, function (err, results, fields) {
    if(err){
      console.log('Error while fetching Product Record, err');
      res.send(alert('fail to load Product data'));
     // results(null,err);
  }else{


      console.log('Product fetched successfully');



      //results(null,res);
  }


    console.log(results);
    //console.log('company', results);
    if (results.length>0) {
      console.log(results);
    res.send(results);
  } else {

    res.send(null);
   }
    db.end()
   });
  });

  app.get("/voucherList", function(req, res, next) {
    var companyID = req.query.companyID;
    var voucherNo = req.query.voucherNo;

    console.log(companyID);
    var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // ale/  var userLevel = req.query.userLevel;

    var sql="SELECT * from journal where companyID = '"+companyID+"' and voucherNo = '"+voucherNo+"'";
      // console.log(req.beforeDestroy() {
     console.log(sql);
      // },);
    db.query(sql, function (err, results, fields) {
     if(err){
       console.log('Error while fetching Journal Record, err');
      // results(null,err);
      res.send(alert('fail to load Journal record'));
     }else{

         if (results.length>0) {
            console.log(results);
          res.send(results);
          } else {

          res.send(alert('fail to Journal record'));
          }


       //results(null,res);
       }


//    db.end();


    });
    });

    app.get("/voucherSearch", function(req, res, next) {
          var companyID = req.query.companyID;
          var startDate = req.query.startDate;
          var endDate = req.query.endDate;

          console.log(companyID);
          console.log(startDate);
          console.log(endDate);
          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;

          var sql="SELECT * from journal where companyID = '"+companyID+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
        //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
             console.log('Error while fetching Journal Record, err');
            // results(null,err);
            res.send(alert('fail to load Journal record'));
           }else{

               if (results.length>0) {
                  console.log(results);
                res.send(results);
                } else {

                res.send(alert('No records between '+startDate+' and '+endDate));
                }


             //results(null,res);
             }


      //    db.end();


          });
          });

            app.get("/lastVoucherNo", function(req, res, next) {
              var companyID = req.query.companyID;
               var jvInit  = req.query.jvInit;

              console.log(companyID);
              var db = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              timezone : "+00:00",
            });  // ale/  var userLevel = req.query.userLevel;

              var sql="SELECT * FROM journal WHERE companyID = '"+companyID+"' and jvInit = '"+jvInit+"' ORDER BY SUBSTRING(voucherNo, 6, 9 )*1 DESC LIMIT 1";
                // console.log(req.beforeDestroy() {
               console.log(sql);
                // },);
              db.query(sql, function (err, results, fields) {
               if(err){
                 console.log('Error while fetching Journal Record'+ err);
                // results(null,err);
                res.send(alert('fail to get Journal record'));
               }else{


                      console.log(results);
                    res.send(results);
                    // if no record return null array

                 //results(null,res);
                 }


    //          db.end();


              });
              });
              app.get("/voucherVerify", function(req, res, next) {
                var companyID = req.query.companyID;
                 var voucherNo  = req.query.voucherNo;

                console.log(companyID);
                var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
              });  // ale/  var userLevel = req.query.userLevel;

                var sql="SELECT * FROM journal WHERE companyID = '"+companyID+"' and voucherNo = '"+voucherNo+"'";
                  // console.log(req.beforeDestroy() {
                 console.log(sql);
                  // },);
                db.query(sql, function (err, results, fields) {
                 if(err){
                   console.log('Error while fetching Journal Record, err');
                  // results(null,err);
                  res.send(alert('fail to get Journal record'));
                 }else{


                        console.log(results);
                       if (results.length >0) {


                      res.send("Existed");
                    } else {
                      res.send("Invalid");
                    }// if no record return null array

                   //results(null,res);
                   }


                db.end();


                });
                });
                app.get("/loadInvoiceTransaction", function(req, res, next) {
                  var companyID = req.query.companyID;
                  var supplierID = req.query.supplierID;
                  var pur_sal = req.query.pur_sal;
                  var invoiceNo = req.query.invoiceNo;


                  console.log(companyID);

                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });
                // ale/  var userLevel = req.query.userLevel;
              if (pur_sal === 'P') {
                  var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and pur_sal = '"+pur_sal+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' order by txnDate";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);

               }else {
                 var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and pur_sal = '"+pur_sal+"' and invoiceNo = '"+invoiceNo+"' order by txnDate";
               }
                  db.query(sql, function (err, results, fields) {
                   if(err){
                     console.log('Error while fetching Purchase Invoice Record, err');
                    // results(null,err);
                    res.send(err);
                   }else{


                          console.log(results);
                        res.send(results);

                  }
                  db.end()
                })



              //    db.end();

            //     });

                  });


                app.get("/loadPurchaseInvoice", function(req, res, next) {
                  var companyID = req.query.companyID;
                  var startDate = req.query.startDate;
                  var endDate = req.query.endDate;


                  console.log(companyID);
                  console.log(startDate)+" to "+endDate
                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });  // ale/  var userLevel = req.query.userLevel;

                  var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and txnDate >= '"+startDate+"' and txnDate <= '"+endDate+"' and invType='PUR'";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);
                    // },);
                  db.query(sql, function (err, results, fields) {
                   if(err){
                     console.log('Error while fetching Purchase Invoice Record, err');
                    // results(null,err);
                    res.send(err);
                   }else{

                  //     if (results.length>0) {
                          console.log(results);
                        res.send(results);
                  //      } else {

              //          res.send("fail");
                  }


                     //results(null,res);



                  db.end();


                  });
                  });
                  app.get("/lastSalesReceipt", function(req, res, next) {
                    var companyID = req.query.companyID;
                    var jvInit  = req.query.jvInit;

                    console.log(companyID);
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    var sql="SELECT * FROM invoiceTxn WHERE companyID = '"+companyID+"' AND jvInit = '"+jvInit+"' AND pur_sal = 'S' ORDER BY SUBSTRING(receiptNo, 6, 9 )*1 DESC LIMIT 1";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err) {
                       console.log('Error while fetching Sales Invoice Record, err');
                      // results(null,err);
                      res.send(alert('fail to get Sales Receipt No. record'));
                     }else{
                            if (results[0].receiptNo === null) {
                              results[0].receiptNo = '';
                            }

                            console.log(results);
                          res.send(results);
                          // if no record return null array

                       //results(null,res);
                       }


                    db.end();


                    });
                    });

                app.get("/lastSalesInvoice", function(req, res, next) {
                  var companyID = req.query.companyID;
                  var jvInit  = req.query.jvInit;

                  console.log(companyID);
                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });  // ale/  var userLevel = req.query.userLevel;

                  var sql="SELECT * FROM salesInvoice WHERE companyID = '"+companyID+"' AND jvInit = '"+jvInit+"' ORDER BY SUBSTRING(invoiceNo, 6, 9 )*1 DESC LIMIT 1";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);
                    // },);
                  db.query(sql, function (err, results, fields) {
                   if(err) {
                     console.log('Error while fetching Sales Invoice Record, err');
                    // results(null,err);
                    res.send(alert('fail to get Sales Invoice No. record'));
                   }else{


                          console.log(results);
                        res.send(results);
                        // if no record return null array

                     //results(null,res);
                     }


                  db.end();


                  });
                  });
                  app.get("/loadSalesInvoice", function(req, res, next) {
                    var companyID = req.query.companyID;
                    var startDate = req.query.startDate;
                    var endDate = req.query.endDate;


                    console.log(companyID);
                    console.log(startDate)+" to "+endDate
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and txnDate >= '"+startDate+"' and txnDate <= '"+endDate+"' and invType='SAL'";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching Sales Invoice Record, err');
                      // results(null,err);
                      res.send(err);
                     }else{

                    //     if (results.length>0) {
                            console.log(results);
                          res.send(results);
                    //      } else {

                //          res.send("fail");
                    }


                       //results(null,res);



                    db.end();


                    });
                    });


                app.get("/salesInvoiceVerify", function(req, res, next) {
                  var companyID = req.query.companyID;
                //  var supplierID = req.query.supplierID;
                  var invoiceNo = req.query.invoiceNo;


                  console.log(companyID);
                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });  // ale/  var userLevel = req.query.userLevel;

                  var sql="SELECT * from salesInvoice where companyID = '"+companyID+"' and invoiceNo = '"+invoiceNo+"'";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);
                    // },);
                  db.query(sql, function (err, results, fields) {
                   if(err){
                     console.log('Error while fetching Sales Invoice Record, err');
                    // results(null,err);
                    res.send(alert('fail to load Sales Invoice record'));
                   }else{

                       if (results.length>0) {
                          console.log(results);
                        res.send("Existed");
                        } else {

                        res.send("Invalid");
                        }


                     //results(null,res);
                     }


                  db.end();


                  });
                  });
                  app.get("/salesInvoiceDetail", function(req, res, next) {
                    var companyID = req.query.companyID;
                  //  var supplierID = req.query.supplierID;
                    var invoiceNo = req.query.invoiceNo;


                    console.log(companyID);
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    var sql="SELECT * from salesInvoice where companyID = '"+companyID+"' and invoiceNo = '"+invoiceNo+"'";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching Sales Invoice Record, err');
                      // results(null,err);
                      res.send(alert('fail to load Sales Invoice record'));
                     }else{


                            console.log(results);
                          res.send(results);

                     //results(null,res);
                       }


                    db.end();


                    });
                    });
                  app.get("/lastSalesNote", function(req, res, next) {
                    var companyID = req.query.companyID;
                    var jvInit  = req.query.jvInit;
                    var invType = req.query.invType;

                    console.log(companyID);
                    console.log(jvInit);
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    var sql="SELECT * FROM invoiceTxn WHERE companyID = '"+companyID+"' AND invType = '"+invType+"' AND jvInit = '"+jvInit+"' ORDER BY SUBSTRING(documentNo, 9, 12 )*1 DESC LIMIT 1";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err) {
                       console.log('Error while fetching Sales Note Record, err');
                      // results(null,err);
                    //  res.send(alert('fail to get Sales Invoice No. record'));
                     }else{


                            console.log(results);
                          res.send(results);
                          // if no record return null array

                       //results(null,res);
                       }


                    db.end();


                    });
                    });

              app.get("/purchaseInvoiceVerify", function(req, res, next) {
                var companyID = req.query.companyID;
                var supplierID = req.query.supplierID;
                var invoiceNo = req.query.invoiceNo;


                console.log(companyID);
                var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
              });  // ale/  var userLevel = req.query.userLevel;

                var sql="SELECT * from purchaseInvoice where companyID = '"+companyID+"' and supplierID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"'";
                  // console.log(req.beforeDestroy() {
                 console.log(sql);
                  // },);
                db.query(sql, function (err, results, fields) {
                 if(err){
                   console.log('Error while fetching Journal Record, err');
                  // results(null,err);
                  res.send(alert('fail to load Journal record'));
                 }else{

                     if (results.length>0) {
                        console.log(results);
                      res.send("Existed");
                      } else {

                      res.send("Invalid");
                      }


                   //results(null,res);
                   }


                db.end();


                });
                });
                app.get("/purchaseInvoiceDetail", function(req, res, next) {
                  var companyID = req.query.companyID;
                //  var supplierID = req.query.supplierID;
                  var invoiceNo = req.query.invoiceNo;


                  console.log(companyID);
                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });  // ale/  var userLevel = req.query.userLevel;

                  var sql="SELECT * from purchaseInvoice where companyID = '"+companyID+"' and invoiceNo = '"+invoiceNo+"'";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);
                    // },);
                  db.query(sql, function (err, results, fields) {
                   if(err){
                     console.log('Error while fetching Sales Invoice Detail Record, err');
                    // results(null,err);
                    res.send(alert('fail to load Sales Invoice Detail record'));
                   }else{


                          console.log(results);
                        res.send(results);

                     //results(null,res);
                     }


                            db.end();


                  });
                  });

                app.get("/purchaseInvoiceSearch", function(req, res, next) {
                  var companyID = req.query.companyID;
                  var supplierID = req.query.supplierID;
                  var invoiceNo = req.query.invoiceNo;
                  var invType = req.query.invType;

                  console.log(companyID);
                  var db = mysql.createConnection({
                  host: process.env.DB_HOST,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  timezone : "+00:00",
                });  // ale/  var userLevel = req.query.userLevel;

                  var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invType = '"+invType+"' and invoiceNo = '"+invoiceNo+"'";
                    // console.log(req.beforeDestroy() {
                   console.log(sql);
                    // },);
                  db.query(sql, function (err, results, fields) {
                   if(err){
                     console.log('Error while fetching invoiceTxn Record, err');
                    // results(null,err);
                    res.send(alert('fail to load invoiceTxn record'));
                   }else{
                          console.log(results);
                        res.send(results);

                     }

        //          db.end();

                  });
                  });

                  app.get("/purchaseInvoiceSummary", function(req, res, next) {
                    var companyID = req.query.companyID;
                    var supplierID = req.query.supplierID;
                    var invoiceNo = req.query.invoiceNo;



                    console.log(companyID);
                    var db = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    timezone : "+00:00",
                  });  // ale/  var userLevel = req.query.userLevel;

                    var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' and pur_sal='P'";
                      // console.log(req.beforeDestroy() {
                     console.log(sql);
                      // },);
                    db.query(sql, function (err, results, fields) {
                     if(err){
                       console.log('Error while fetching invoiceTxn ,'+  err);
                      // results(null,err);
                      res.send(alert('fail to load Invoice record'));
                     }else{


                            console.log(results);
                          res.send(results);

                       //results(null,res);
                       }


                    db.end();


                    });
                    });
                    app.get("/invoiceTxnSearch", function(req, res, next) {
                      var companyID = req.query.companyID;
                      var supplierID = req.query.supplierID;
                      var pur_sal = req.query.pur_sal;
                      var invType = req.query.invType;
                      var txnDate = req.query.txnDate;
                      var dueDate = req.query.dueDate;

                      console.log(companyID);
                      var db = mysql.createConnection({
                      host: process.env.DB_HOST,
                      user: process.env.DB_USER,
                      password: process.env.DB_PASSWORD,
                      database: process.env.DB_NAME,
                      timezone : "+00:00",
                    });  // ale/  var userLevel = req.query.userLevel;

                      var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invType = '"+invType+"' and pur_sal = '"+pur_sal+"' and txnDate>='"+txnDate+"' and txnDate<='"+dueDate+"'";
                        // console.log(req.beforeDestroy() {
                       console.log(sql);
                        // },);
                      db.query(sql, function (err, results, fields) {
                       if(err){
                         console.log('Error while fetching invoiceTxn Record, err');
                        // results(null,err);
                        res.send(alert('fail to load invoiceTxn record'));
                       }else{
                              console.log(results);
                            res.send(results);

                         }

                              db.end();

                      });
                      });

                      app.get("/purchaseInvoiceSummary", function(req, res, next) {
                        var companyID = req.query.companyID;
                        var supplierID = req.query.supplierID;
                        var invoiceNo = req.query.invoiceNo;



                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' and pur_sal='P'";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching invoiceTxn ,'+  err);
                          // results(null,err);
                          res.send(alert('fail to load Invoice record'));
                         }else{


                                console.log(results);
                              res.send(results);

                           //results(null,res);
                           }


                          db.end();


                        });
                        });

                        app.get("/salesYearlyReport", function(req, res, next) {
                          var companyID = req.query.companyID;
                          var pur_sal = 'S';
                          var startDate = req.query.startDate;
                          var endDate = req.query.endDate;

                          console.log(startDate);
                          var db = mysql.createConnection({
                          host: process.env.DB_HOST,
                          user: process.env.DB_USER,
                          password: process.env.DB_PASSWORD,
                          database: process.env.DB_NAME,
                          timezone : "+00:00",
                        });  // ale/  var userLevel = req.query.userLevel;

                          var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and pur_sal ='S' and (invType = 'SAL' or invType= 'SCN' or invType='SRN' or invType='SDN') and txnDate>='"+startDate+"' and txnDate<='"+endDate+"' order by txnDate";
                            // console.log(req.beforeDestroy() {
                           console.log(sql);
                            // },);
                          db.query(sql, function (err, results, fields) {
                           if(err){
                             console.log('Error while fetching invoiceTxn Record, err');
                            // results(null,err);
                            res.send(alert('fail to load invoiceTxn record'));
                           }else{
                                  console.log(results);
                                res.send(results);

                             }

                                  db.end();

                          });
                          });

                          app.get("/purchaseInvoiceSummary", function(req, res, next) {
                            var companyID = req.query.companyID;
                            var supplierID = req.query.supplierID;
                            var invoiceNo = req.query.invoiceNo;



                            console.log(companyID);
                            var db = mysql.createConnection({
                            host: process.env.DB_HOST,
                            user: process.env.DB_USER,
                            password: process.env.DB_PASSWORD,
                            database: process.env.DB_NAME,
                            timezone : "+00:00",
                          });  // ale/  var userLevel = req.query.userLevel;

                            var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' and pur_sal='P'";
                              // console.log(req.beforeDestroy() {
                             console.log(sql);
                              // },);
                            db.query(sql, function (err, results, fields) {
                             if(err){
                               console.log('Error while fetching invoiceTxn ,'+  err);
                              // results(null,err);
                              res.send(alert('fail to load Invoice record'));
                             }else{


                                    console.log(results);
                                  res.send(results);

                               //results(null,res);
                               }


                              db.end();


                            });
                            });

                    app.get("/purchaseInvoiceDetail", function(req, res, next) {
                      var companyID = req.query.companyID;
                      var supplierID = req.query.supplierID;
                      var invoiceNo = req.query.invoiceNo;


                      console.log(companyID);
                      var db = mysql.createConnection({
                      host: process.env.DB_HOST,
                      user: process.env.DB_USER,
                      password: process.env.DB_PASSWORD,
                      database: process.env.DB_NAME,
                      timezone : "+00:00",
                    });  // ale/  var userLevel = req.query.userLevel;

                      var sql="SELECT * from purchaseInvoice where companyID = '"+companyID+"' and supplierID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"'";
                        // console.log(req.beforeDestroy() {
                       console.log(sql);
                        // },);
                      db.query(sql, function (err, results, fields) {
                       if(err){
                         console.log('Error while fetching Journal Record, err');
                        // results(null,err);
                        res.send(alert('fail to load Journal record'));
                       }else{


                              console.log(results);
                            res.send(results);

                         //results(null,res);
                         }


                      db.end();


                      });
                      });

                      app.get("/purchaseNoteVerify", function(req, res, next) {
                        var companyID = req.query.companyID;
                        var supplierID = req.query.supplierID;
                        var documentNo = req.query.documentNo;
                      //  var invType = req.query.invType;

                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and documentNo = '"+documentNo+"'";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching invoiceTxn Record, err');
                          // results(null,err);
                          res.send(alert('fail to load invoiceTxn record'));
                         }else{
                                console.log(results);
                              res.send(results);

                           }

                        db.end();

                        });
                        });

                      app.get("/salesInvoiceSummary", function(req, res, next) {
                        var companyID = req.query.companyID;
                        var supplierID = req.query.supplierID;
                        var invoiceNo = req.query.invoiceNo;



                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' and pur_sal = 'S'";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching invoiceTxn ,'+  err);
                          // results(null,err);
                          res.send(alert('fail to load Sales Invoice record'));
                         }else{


                                console.log(results);
                              res.send(results);

                           //results(null,res);
                           }


                          db.end();


                        });
                        });

                      app.get("/salesInvoiceDetail", function(req, res, next) {
                        var companyID = req.query.companyID;
                      //  var supplierID = req.query.supplierID;
                        var invoiceNo = req.query.invoiceNo;


                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from salesInvoice where companyID = '"+companyID+"' and invoiceNo = '"+invoiceNo+"'";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching Sales Invoice Detail Record, err');
                          // results(null,err);
                          res.send(alert('fail to load Sales Invoice Detail record'));
                         }else{


                                console.log(results);
                              res.send(results);

                           //results(null,res);
                           }


                        db.end();


                        });
                        });

                        app.get("/salesNoteVerify", function(req, res, next) {
                          var companyID = req.query.companyID;
                        //  var supplierID = req.query.supplierID;
                          var documentNo = req.query.documentNo;
                        //  var invType = req.query.invType;

                          console.log(companyID);
                          var db = mysql.createConnection({
                          host: process.env.DB_HOST,
                          user: process.env.DB_USER,
                          password: process.env.DB_PASSWORD,
                          database: process.env.DB_NAME,
                          timezone : "+00:00",
                        });  // ale/  var userLevel = req.query.userLevel;

                          var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and documentNo = '"+documentNo+"'";
                            // console.log(req.beforeDestroy() {
                           console.log(sql);
                            // },);
                          db.query(sql, function (err, results, fields) {
                           if(err){
                             console.log('Error while fetching invoiceTxn Record, err');
                            // results(null,err);
                            res.send(alert('fail to load invoiceTxn record'));
                           }else{
                                  console.log(results);
                                res.send(results);

                             }

                                db.end();

                          });
                          });

                          app.get("/salesReceiptVerify", function(req, res, next) {
                            var companyID = req.query.companyID;
                          //  var supplierID = req.query.supplierID;
                            var receiptNo = req.query.receiptNo;
                          //  var invType = req.query.invType;

                            console.log(companyID);
                            var db = mysql.createConnection({
                            host: process.env.DB_HOST,
                            user: process.env.DB_USER,
                            password: process.env.DB_PASSWORD,
                            database: process.env.DB_NAME,
                            timezone : "+00:00",
                          });  // ale/  var userLevel = req.query.userLevel;

                            var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and receiptNo = '"+receiptNo+"'";
                              // console.log(req.beforeDestroy() {
                             console.log(sql);
                              // },);
                            db.query(sql, function (err, results, fields) {
                             if(err){
                               console.log('Error while fetching invoiceTxn Record, err');
                              // results(null,err);
                              res.send(alert('fail to load invoiceTxn record'));
                             }else{
                                    console.log(results);
                                  res.send(results);

                               }

                                  db.end();

                            });
                            });


                            app.get("/loadGlBalance", function(req, res, next) {
                              var companyID = req.query.companyID;
                              var txnDate = req.query.txnDate;
                              var glNo = req.query.glNo;
                              var glSub = req.query.glSub;
                              var opBalance = 0;
                              var curBalance =0;
                              var sumBalance=0;
                              console.log(companyID);
                              console.log(txnDate);

                              var db = mysql.createConnection({
                              host: process.env.DB_HOST,
                              user: process.env.DB_USER,
                              password: process.env.DB_PASSWORD,
                              database: process.env.DB_NAME,
                              timezone : "+00:00",
                            });  // ale/  var userLevel = req.query.userLevel;

                              // *** tsearch glAccount table for
                                var sql ="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub = '"+glSub+"'";
                                 console.log(sql);
                                 db.query(sql, function (err, results, fields) {
                                  if(err){
                                    console.log('Error while fetching G/L Account Record, err');
                                   // results(null,err);
                                   res.send(alert("Error: "+err));
                                  }else{

                                      if (results.length > 0) {
                                          opBalance = results[0].opBalance;
                                          console.log("O/P Balance = "+opBalance);
                                      } else {
                                       res.send(alert('No records existed with G/L No. '+glNo+' and G/L Sub No.'+glSub));
                                       }
                                  }
                              });

                                // Sum opcrAMt and drAmt in Jourm\nal file ****

                                sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate<='"+txnDate+"'";
                                 console.log(sql);

                                 db.query(sql, function (err, results, fields) {
                                  if(err){
                                    console.log('Error while sum Journal Record, err');
                                   // results(null,err);
                                   res.send(alert('fail to sum Journal record'));
                                  }else{

                                      if (results.length>0) {
                                          results[0].sumBalance = opBalance+results[0].sumBalance;
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
                                         console.log("sumBalance: "+sumBalance)
                                         console.log("opBalance: "+opBalance);
                                         console.log(results[0].sumBalance);
                                         res.send(results);
                                    //results(null,res);
                                    }
                                    db.end()
                                });
         /*
                                // Load Journal Transaction record ****
                                sql="SELECT * from journal where companyID = '"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
                            //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
                                // console.log(req.beforeDestroy() {
                               console.log(sql);
                                // },);
                              db.query(sql, function (err, results, fields) {
                               if(err){
                                 console.log('Error while fetching Journal Record, err');
                                // results(null,err);
                                res.send(alert('fail to load Journal record'));
                               }else{

                                   if (results.length>0) {
                                      console.log(results);
                            //          results[0].opBal=opBalance+sumBalance;
                                 results[0].opBal=opBalance+sumBalance;
                                 results[0].curBal= (opBalance+sumBalance)+results[0].drAmt-results[0].crAmt;
                                 curBalance = results[0].curBal;

                                 for (let i = 1; i < results.length; i++) {

                                       results[i].curBal = curBalance+results[i].drAmt-results[i].crAmt;
                                       curBalance = results[i].curBal;
                                       results[i].opBal = 0;
                                     // else {

                                     // console.log(i+" : "+curBalance);
                                 }

                                    res.send(results);
                                    } else {

                                    res.send(alert('No records between '+startDate+' and '+endDate));
                                    }


                                 //results(null,res);
                                 }


                            //    db.end();


                              });
                          */
                              });


    app.get("/glReportSearch", function(req, res, next) {
      var companyID = req.query.companyID;
      var startDate = req.query.startDate;
      var endDate = req.query.endDate;
      var glNo = req.query.glNo;
      var glSub = req.query.glSub;
      var opBalance = 0;
      var curBalance =0;
      var sumBalance=0;
      console.log(companyID);
      console.log(startDate);
      console.log(endDate);
      var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // ale/  var userLevel = req.query.userLevel;

      // *** tsearch glAccount table for
        var sql ="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub = '"+glSub+"'";
         console.log(sql);
         db.query(sql, function (err, results, fields) {
          if(err){
            console.log('Error while fetching G/L Account Record, err');
           // results(null,err);
           res.send(alert("Error: "+err));
          }else{

              if (results.length > 0) {
                  opBalance = results[0].opBalance;
                  console.log("O/P Balance = "+opBalance);
              } else {
            //   res.send(alert('No records existed with G/L No. '+glNo+' and G/L Sub No.'+glSub));

               }
          }
      });

        // Sum opcrAMt and drAmt in Jourm\nal file ****

        sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate<'"+startDate+"'";
         console.log(sql);

         db.query(sql, function (err, results, fields) {
          if(err){
            console.log('Error while sum Journal Record, err');
           // results(null,err);
           res.send(alert('fail to sum Journal record'));
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
                 console.log("sumBalance: "+sumBalance)
                 console.log("opBalance: "+opBalance);
            //results(null,res);
            }
        });

        // Load Journal Transaction record ****
        sql="SELECT * from journal where companyID = '"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
    //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching Journal Record, err');
        // results(null,err);
        res.send(alert('fail to load Journal record'));
       }else{

           if (results.length>0) {
              console.log(results);
    //          results[0].opBal=opBalance+sumBalance;
         results[0].opBal=opBalance+sumBalance;
         results[0].curBal= (opBalance+sumBalance)+results[0].drAmt-results[0].crAmt;
         curBalance = results[0].curBal;

         for (let i = 1; i < results.length; i++) {

               results[i].curBal = curBalance+results[i].drAmt-results[i].crAmt;
               curBalance = results[i].curBal;
               results[i].opBal = 0;
             // else {

             // console.log(i+" : "+curBalance);
         }

            res.send(results);
          } else {
             res.send([{opBal: opBalance, drAmt: 0, crAmt: 0, curBal: opBalance,}]);
          //  res.send(alert('No records between '+startDate+' and '+endDate));
            }


         //results(null,res);
         }


      db.end();


      });
      });

      app.get("/productReportSearch", function(req, res, next) {
        var companyID = req.query.companyID;
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        var productID = req.query.productID;
        var opBalance = 0;
        var curBalance =0;
        var sumBalance=0;
        console.log(companyID);
        console.log(startDate);
        console.log(endDate);
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;

        // *** tsearch glAccount table for
          var sql ="SELECT * from product where companyID = '"+companyID+"' and productID = '"+productID+"'";
           console.log(sql);
           db.query(sql, function (err, results, fields) {
            if(err){
              console.log('Error while fetching Product Record, err');
             // results(null,err);
             res.send(alert("Error: "+err));
            }else{

                if (results.length > 0) {
                    opBalance = results[0].opBalance;
                    console.log("O/P Balance = "+opBalance);
                } else {
                 res.send(alert('No records existed with ProductID '+productID));
                 }
            }
        });

          // Sum opcrAMt and drAmt in Jourm\nal file ****

          sql="SELECT SUM(TxnQtyIn-txnQtyOut) AS sumBalance FROM productTxn where companyID='"+companyID+"' and productID='"+productID+"' and txnDate<'"+startDate+"'";
           console.log(sql);

           db.query(sql, function (err, results, fields) {
            if(err){
              console.log('Error while sum Product Transaction Record, err');
             // results(null,err);
             res.send(alert('fail to sum product transaction record'));
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
                   console.log("sumBalance: "+sumBalance)
                   console.log("opBalance: "+opBalance);
              //results(null,res);
              }
          });

          // Load Journal Transaction record ****
          sql="SELECT * from productTxn where companyID = '"+companyID+"' and productID='"+productID+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
      //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Product Transaction Record, err');
          // results(null,err);
          res.send(alert('fail to load Product Transaction record'));
         }else{

             if (results.length>0) {
                console.log(results);
      //          results[0].opBal=opBalance+sumBalance;
           results[0].opBal=opBalance+sumBalance;
           results[0].curBal= (opBalance+sumBalance)+results[0].txnQtyIn-results[0].txnQtyOut;
           curBalance = results[0].curBal;

           for (let i = 1; i < results.length; i++) {

                 results[i].curBal = curBalance+results[i].txnQtyIn-results[i].txnQtyOut;
                 curBalance = results[i].curBal;
                 results[i].opBal = 0;
               // else {

               // console.log(i+" : "+curBalance);
              }
              console.log(results);
              res.send(results);
              } else {

              res.send(alert('No records between '+startDate+' and '+endDate));
              }


           //results(null,res);
           }


    //    db.end();


        });
        });

      app.get("/voucherEditSearch", function(req, res, next) {
        var companyID = req.query.companyID;
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;

        console.log(companyID);
        console.log(startDate);
        console.log(endDate);
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;

        var sql="SELECT * from journalChange where companyID = '"+companyID+"' and dateChange>='"+startDate+"' and dateChange<='"+ endDate +"' order by voucherNo ASC";
      //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching Journal Record, err');
          // results(null,err);
          res.send(alert('fail to load Journal editing record'));
         }else{

             if (results.length>0) {
                console.log(results);
              res.send(results);
              } else {

              res.send(alert('No Edited records between '+startDate+' and '+endDate));
              }


           //results(null,res);
           }


        db.end();


        });
        });
        app.get("/voucherCurrentList", function(req, res, next) {
          var companyID = req.query.companyID;
          var voucherNo = req.query.voucherNo;


          console.log(companyID);
          console.log(voucherNo);

          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;

          var sql="SELECT * from journal where companyID = '"+companyID+"' and voucherNo='"+voucherNo+"'";
        //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
             console.log('Error while fetching Journal Record, err');
            // results(null,err);
            res.send(alert('fail to load Voucher current record'));
           }else{

               if (results.length>0) {
                  console.log(results);
                res.send(results);
                } else {

                res.send(alert('Voucher No. '+voucherNo+' Already Been Deleted') );
                }


             //results(null,res);
             }


          db.end();


          });
          });



app.post("/voucherNew", function(req, res, next) {
   var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo.toUpperCase();
var glNo='';
var glSub='';
var department = '';
var glName= '';
var glType;
var jeParticular = '';
var txnDate;
var drAmt = 0.00;
var crAmt = 0.00;
var glAmount=0.00;
console.log(voucherData);

console.log(companyID)
console.log(userName);
console.log(voucherNo);
//res.send(alert(voucherNo));
for (let i = 0; i < voucherData.length; i++) {
 let date = voucherData[i].txnDate;
  txnDate = date.split("/").reverse().join("-");
  voucherData[i].txnDate = txnDate;
  let dAmt = voucherData[i].drAmt;
  let cAmt = voucherData[i].crAmt;
  drAmt=dAmt.replace(/,(?=.*\.\d+)/g, '');
  crAmt=cAmt.replace(/,(?=.*\.\d+)/g, '');
  voucherData[i].drAmt = drAmt;
  voucherData[i].crAmt = crAmt;

} // for

console.log(voucherData);


     //res.send(alert(req.body.password+req.body.adminName+req.body.companyID+ " //"+ md5Password));
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
          //res.send(alert("Connected"));
          });


// check if voucher No. already existed
           dbquery = "SElECT * FROM journal WHERE companyID='"+ companyID+ "' and voucherNo='"+ voucherNo +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);

                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Voucher No. "+voucherNo+" already existed, please re-enter");
                      //  res.send("existed");
                      res.send(alert("Voucher No."+voucherNo+" already existed, please press <New Voucher Button> to re-enter"));
                          return false;
              return res.status(400).json({
                         status: 'error',
                         error: '"Voucher No. "+voucherNo+" already existed, please press <New Voucher Button> to re-enter"',
                         });


                    } else  {

 for (let i = 0; i < voucherData.length; i++) {

   glNo=voucherData[i].glNo;
   glSub=voucherData[i].glSub;
   department = voucherData[i].department;
   glName= voucherData[i].glName;
   glType = voucherData[i].glType;
   txnDate = voucherData[i].txnDate;

    // alert(txnDate);
   jeParticular = voucherData[i].jeParticular;
   drAmt = voucherData[i].drAmt;
   crAmt = voucherData[i].crAmt;
   console.log('drAmt = '+drAmt);
  console.log('crAmt = '+crAmt);
  //  drAmt=drAmt.replace(",", "");
  //  crAmt=crAmt.replace(",", "");
  glAmount= drAmt - crAmt;
                          // create new record
  dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"', '"+ txnDate +"', 'JV', CURDATE())"

 console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Voucher created")
                           }

                       });


// check glTxn
/*
dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ glNo +"' and glSub='"+ glSub+ "' and department='"+department+"' and glType='"+glType+"' and txnDate='"+txnDate+"'";
  console.log(dbquery);


       con.query(dbquery, function(err, rows) {

     if (err) {   // #1

       console.log(err)

      return (alert(err.message));
     } else {
/*
console.log(rows);
// let numRows = row.affectedRows;
console.log(rows.length);
       if (rows.length > 0) {
        // update exusting glTxn
        dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"' AND glType='"+glType+"' AND txnDate='"+txnDate+"'"
        console.log(dbquery);
            con.query(dbquery, function(err, row) {

                                if (err) {
                                  //console.log(err.message);
                                  console.log(err);
                                //  return reconnect(con);
                                  return (alert(err+" occured in input data, update fail"));

                                 //res.sendStatus(500);
                                 // return;
                                 } else {
                                  console.log("glTxn updated")
                                 }

                 });

        } else {   // if
    //  if (rows.length === 0) {
          dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, glType, txnAmount, txnDate) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+glType+"', '"+ glAmount +"', '"+ txnDate +"')"

          console.log(dbquery);
              con.query(dbquery, function(err, row) {

                                  if (err) {
                                    //console.log(err.message);
                                    console.log(err);
                               //    res.send(alert(err+" occured in input data, //update fail"));



                                   // return;
                                   } else {
                                    console.log("New glTxn created")
                                   }

                 });


        } // else




        }
      });

*/








} // for


for (let i = 0; i < voucherData.length; i++) {

  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;
  glType = voucherData[i].glType;
  jeParticular = voucherData[i].jeParticular;
  txnDate = voucherData[i].txnDate;
//  txnDate = moment(new Date(date)).format("YYYY-MM-DD")
//    txnDate = date.split("/").reverse().join("-");
//   txnDate = voucherData[i].txnDate;

  drAmt = voucherData[i].drAmt; //.replace(",", "");;
  crAmt = voucherData[i].crAmt; //.replace(",", "");;
   glAmount= drAmt - crAmt;
  console.log(drAmt);
  console.log(crAmt);
  console.log(voucherData[i].glType);
    //  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
  //    con.query(dbquery, function (err, results, fields) {

    //  });

//  glAmount= drAmt - crAmt;
//  glAmount=Number(glAmount); // .replace(",", "");
  console.log(glAmount);
                       dbquery = "UPDATE glAccount SET glAmount=glAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
                       console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                                               if (err) {
                                                 //console.log(err.message);
                                                 console.log(err);
                                          //       res.send(alert(err+" occured in input data, update fail"));
                                              //   con.end();
                                                // return;
                                                } else {
                                                 console.log("G/L Account updated")
                                                }
                                        // con.end();
                                            });





   } // for



// reset

for (let i = 0; i < voucherData.length; i++) {

  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;
  glType = voucherData[i].glType;
  jeParticular = voucherData[i].jeParticular;
  txnDate = voucherData[i].txnDate;
//  txnDate = moment(new Date(date)).format("YYYY-MM-DD")
//    txnDate = date.split("/").reverse().join("-");
//   txnDate = voucherData[i].txnDate;

  drAmt = voucherData[i].drAmt; //.replace(",", "");;
  crAmt = voucherData[i].crAmt; //.replace(",", "");;
  glAmount = drAmt - crAmt;
//  glAMount = glAmount.replace(",", "");
  console.log(drAmt);
  console.log(crAmt);
  console.log(glType);
  console.log(department);
    //  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
  //    con.query(dbquery, function (err, results, fields) {

    //  });

//  glAmount= drAmt - crAmt;
  console.log(glAmount);


  // check glTxn

  dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ voucherData[i].glNo +"' and glSub='"+ voucherData[i].glSub+ "' and department='"+voucherData[i].department+"' and txnDate='"+txnDate+"'";
    console.log(dbquery);



         con.query(dbquery, function(err, rows) {

       if (err) {   // #1
        console.log(rows);                      //console.log(err.message);
         console.log(err)
      //  return reconnect(con); //  res.sendStatus(500);
           return (alert(err.message));
        } else {



            //  console.log(rows.length);

               if ( rows.length >0 ) {
                glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
                   console.log('update dr:'+drAmt);
                  console.log('update cr:'+crAmt);
                   console.log('total:'+glAmount );
                 dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+voucherData[i].glNo+"' AND glSub='"+voucherData[i].glSub+"' AND department='"+voucherData[i].department+"' AND txnDate='"+txnDate+"'"
                 console.log(dbquery);
                  con.query(dbquery, function(err, row) {

                                      if (err) {
                                        //console.log(err.message);
                                        console.log(err);
                                      //  return reconnect(con);
                                        return (alert(err+" occured in input data, update fail"));

                                       //res.sendStatus(500);
                                       // return;
                                       } else {
                                    // con.end();
                                        console.log("glTxn updated")
                                        //res.send("Success");
                                       }

                         });





          } else {
            glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
            console.log('dramt: '+voucherData[i].drAmt);
            console.log('cramt: '+voucherData[i].crAmt);
          //  let txnAmount = drAmt - crAmt;
          //  txnAmount = txnAmount.replace(",", "");
            console.log('total:'+glAmount);
            dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate) VALUE('" + companyID + "', '"+ voucherData[i].glNo + "', '"+ voucherData[i].glSub + "', '"+ voucherData[i].department + "', '"+ voucherData[i].glName + "', '"+ glAmount +"' , '"+ txnDate +"')"

            console.log(dbquery);
                con.query(dbquery, function(err, row) {

                                    if (err) {
                                      //console.log(err.message);
                                      console.log(err);
                                 //    res.send(alert(err+" occured in input data, update fail"));

                                     //res.s

                                     // return;
                                     } else {
                                     // con.end();
                                      console.log("New glTxn created")
                                    //  res.send("New Voucher Successfully Created");
                                     }

                   });


          }

          }
          }); // tempersry

}

} // for reset


      } // 2  to level

   res.send("Success");
   con.end()
 });



});



app.post("/voucherChange", function(req, res, next) {

var voucherData = req.body;
var companyID = voucherData[0].companyID;
var userName = voucherData[0].userName;
var voucherNo = voucherData[0].voucherNo; //.toUpperCase();
var glNo='';
var glSub='';
var department = '';
var glName= '';
var jeParticular = ''
var drAmt = 0.00;
var crAmt = 0.00;
var glAmount=0.00;
var jvData;
var glType = '';

console.log(companyID)
console.log(userName);
console.log(voucherNo);
console.log(voucherData);

for (let i = 0; i < voucherData.length; i++) {

  let dAmt = voucherData[i].drAmt;
  let cAmt = voucherData[i].crAmt;
// alert(dAmt+" = "+cAmt);

if (typeof dAmt !=='undefined') {
  drAmt=dAmt.replace(/,(?=.*\.\d+)/g, '');
}
if (typeof cAmt !=='undefined') {
  crAmt=cAmt.replace(/,(?=.*\.\d+)/g, '');
}

  voucherData[i].drAmt = drAmt;
  voucherData[i].crAmt = crAmt;


}

console.log(voucherData);


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

          dbquery = "SElECT * FROM journal WHERE companyID='"+ companyID+ "' and voucherNo='"+ voucherNo +"'";
          console.log(dbquery);
          con.query(dbquery, function(err, results, fields) {
         //   const journalData = results;
       //    console.log(results);
                 if (err) {
                   //console.log(err.message);
                   console.log(err);
                   res.sendStatus(500);
                  // return;
                } else {
                    if (results.length === 0) {
                        res.send("Invalid Voucher No. "+voucherNo)
                      return false // alert("Invalid Voucher No. "+voucherNo);
                    }
                   if (results.length>0) {   // 2
                     jvData = results;
                  //   console.log("Voucher No. "+voucherNo+" not existed, please re-enter");
                   // res.send("Voucher No."+voucherNo+" not existed, please re// -enter");
                     //  const jvData = results
                       console.log(jvData);

var jvDate
for (let i = 0; i < jvData.length; i++) {

//jvDate = jvData[i].txnDate;
jvDate = jvData[i].txnDate.toISOString().slice(0, 10);

jvData[i].txnDate = jvDate;
drAmt = jvData[i].drAmt;
crAmt = jvData[i].crAmt;
//drAmt = parseFloat(drAmt.replace(/,/g,''))
// console.log('txndate='+jvData[i].txnDate);// drAmt=drAmt.replace(",", "");
// crAmt=crAmt.replace(",", "");
glAmount= drAmt - crAmt; //console.log(jvDate);
//  jvData[i].txnDate =  format(new Date(jvData[i].txnDate), "dd/MM/yyyy")
dbquery = "INSERT INTO journalChange (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, userChange, dateChange, status, reasons) VALUE('" + companyID + "', '"+ jvData[i].glNo + "', '"+ jvData[i].glSub + "', '"+ jvData[i].department + "', '"+ jvData[i].glName + "', '"+jvData[i].jeParticular+"', '"+jvData[i].voucherNo+"', '"+ jvData[i].drAmt +"', '"+jvData[i].crAmt+"', '"+jvData[i].userName+"', '"+jvData[i].txnDate+"', 'JV', '"+userName+"', CURDATE(), 'JV', 'Voucher Edit Change')"
 console.log(dbquery);
 con.query(dbquery, function(err, row) {

 if (err) {
   //console.log(err.message);
   console.log(err);

  }

});
//glAmount= jvData[i].drAmt - jvData[i].crAmt;
// reverse the glAccount data
dbquery = "UPDATE glAccount SET glAmount=glAmount-'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+jvData[i].glNo+"' AND glSub='"+jvData[i].glSub+"' AND department='"+jvData[i].department+"'"
console.log(dbquery);
con.query(dbquery, function(err, row) {

if (err) {

 console.log(err);

}

});


// delete the old voucher

dbquery = "Delete from journal WHERE companyID='"+companyID+"' AND voucherNo='"+jvData[i].voucherNo+"'"
console.log(dbquery);
con.query(dbquery, function(err, row) {

if (err) {

 console.log(err);

}

});
// update gltxn
glAmount= jvData[i].drAmt - jvData[i].crAmt;
jvDate = jvData[i].txnDate;
dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ jvData[i].glNo +"' and glSub='"+ jvData[i].glSub+ "' and department='"+jvData[i].department+"' and txnDate='"+jvDate+"'";
  console.log(dbquery);

       con.query(dbquery, function(err, rows) {

          if (err) {   // #1
             console.log(err)
             return (alert(err.message));
             } else {

               console.log("159: "+rows.length);
                if ( rows.length >0 ) {
                 glAmount = jvData[i].drAmt - jvData[i].crAmt;
                 jvDate = jvData[i].txnDate;
                 dbquery = "UPDATE glTxn SET txnAmount=txnAmount-'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+jvData[i].glNo+"' AND glSub='"+jvData[i].glSub+"' AND department='"+jvData[i].department+"' AND txnDate='"+jvDate+"'"
                 console.log(dbquery);
                 con.query(dbquery, function(err, row) {


                                     if (err) {
                                      console.log(err);

                                      return (alert(err+" occured in input gltxn data, update fail"));

                                      } else {
                                      console.log("glTxn updated")
                                      }

                       });
                 } // if  length

         } // if #1
       });



// update glTxn


} // for

// insert new change journal\\\
 console.log(voucherData);
for (let i = 0; i < voucherData.length; i++) {
  if (voucherData[i].voucherNo !==undefined) {
  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;
  let date = voucherData[i].txnDate;
    txnDate = date.split("/").reverse().join("-");
   voucherData[i].txnDate = txnDate;
   console.log(voucherData[i].txnDate);
  jeParticular = voucherData[i].jeParticular;
  drAmt = voucherData[i].drAmt;
  crAmt = voucherData[i].crAmt;
  // drAmt=drAmt.replace(",", "");
  // crAmt=crAmt.replace(",", "");
  glAmount= voucherData[i].drAmt - voucherData[i].crAmt;
  // jvDate = voucherData[i].txnDate.toISOString().slice(0, 10);
  // voucherData[i].txnDate = jvDate;

//glAmount= (parseFloat(drAmt) - parseFloat(crAmt));
                         // create new record
 dbquery = "INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ department + "', '"+ glName + "', '"+jeParticular+"', '"+voucherNo+"', '"+ drAmt +"', '"+crAmt+"', '"+userName+"', '"+ txnDate+"', 'JV', CURDATE())"

console.log(dbquery);
     con.query(dbquery, function(err, row) {

                         if (err) {
                           //console.log(err.message);
                           console.log(err);
                         //  res.send(alert(err+" occured in input data, update fail"));
                          //res.sendStatus(500);
                          // return;
                          } else {
                           //   res.send("Success");
                           console.log("New Voucher created")
                          }

                      });
//  } // if
// update glTxn


dbquery = "SElECT * FROM glTxn WHERE companyID='"+ companyID+ "' and glNo='"+ voucherData[i].glNo +"' and glSub='"+ voucherData[i].glSub+ "' and department='"+voucherData[i].department+"' and txnDate='"+txnDate+"'";
  console.log(dbquery);



       con.query(dbquery, function(err, rows) {

     if (err) {   // #1
    //  console.log(rows);                      //console.log(err.message);
       console.log(err)
    //  return reconnect(con); //  res.sendStatus(500);
         return (alert(err.message));
      } else {





            console.log("248: "+rows.length);

             if ( rows.length >0 ) {
                glAmount = voucherData[i].drAmt - voucherData[i].crAmt;
               dbquery = "UPDATE glTxn SET txnAmount=txnAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+voucherData[i].glNo+"' AND glSub='"+voucherData[i].glSub+"' AND department='"+voucherData[i].department+"' AND txnDate='"+txnDate+"'"
               console.log(dbquery);
                con.query(dbquery, function(err, row) {

                                    if (err) {
                                      //console.log(err.message);
                                      console.log(err);
                                    //  return reconnect(con);
                                      return (alert(err+" occured in input data, update fail"));

                                     //res.sendStatus(500);
                                     // return;
                                     } else {
                                      console.log("glTxn updated")
                                     }

                       });





        } else {
         let tAmount= voucherData[i].drAmt - voucherData[i].crAmt;
        // let tAmount = 12345.00
            console.log('total:'+tAmount);

          dbquery = "INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate) VALUE('" + companyID + "', '"+ voucherData[i].glNo + "', '"+ voucherData[i].glSub + "', '"+ voucherData[i].department + "', '"+ voucherData[i].glName + "', '"+ tAmount +"', '"+txnDate+"')"

          console.log(dbquery);
              con.query(dbquery, function(err, row) {

                                  if (err) {
                                    //console.log(err.message);
                                    console.log(err);
                               //    res.send(alert(err+" occured in input data, update fail"));

                                   //res.s

                                   // return;
                                   } else {
                                    console.log("New glTxn created")
                                   }

                 });


        }

        }
        }); // tempersry

} // if undefined


//upDate glTxn

} // for
//update glAccount
for (let i = 0; i < voucherData.length; i++) {
if (voucherData[i].voucherNo !==undefined) {
  glNo=voucherData[i].glNo;
  glSub=voucherData[i].glSub;
  department = voucherData[i].department;
  glName= voucherData[i].glName;

  jeParticular = voucherData[i].jeParticular;
  drAmt = voucherData[i].drAmt // .replace(",", "");
  crAmt = voucherData[i].crAmt  //.replace(",", "");
  console.log(drAmt);
  console.log(crAmt);
    //  dbquery= "select glAmount from glAccount where WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
  //    con.query(dbquery, function (err, results, fields) {

    //  });

  glAmount= drAmt - crAmt;
  console.log(glAmount);
                       dbquery = "UPDATE glAccount SET glAmount=glAmount+'"+glAmount+"' WHERE companyID='"+companyID+"' AND glNo='"+glNo+"' AND glSub='"+glSub+"' AND department='"+department+"'"
                       console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                                               if (err) {
                                                 //console.log(err.message);
                                                 console.log(err);
                                                 res.send(alert(err+" occured in input data, update fail"));
                                                //res.sendStatus(500);
                                                // return;
                                                } else {
                                                // res.send("Sucess");
                                                 console.log("glTxn created");

                                                }
                                        // con.end();
                                            });

                    } // if
                    }; // for



                }

          };  //query
        res.send("Success");
    //    con.end()
   }); // db.connect


});
/*
app.post("/purchaseInvoice", function(req, res, next) {
   var invData = req.body;
//console.log('axios post to purhcase Invoice');
   console.log(invData) ;
   console.log(invData[0].productID);
   //console.log(err.message);
});
*/




  module.exports = app;
