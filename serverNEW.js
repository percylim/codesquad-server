require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var MemoryStore = require('memorystore')(session)
//var MongoStore = require('connect-mongo');
var passport = require("passport");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
var LocalStrategy = require('passport-local').Strategy;
var env = require('dotenv').config();
var alert = require("alert");
var flash    = require('connect-flash');
var md5 = require('md5');
var db=require('./routes/csDatabase');
var multer  =   require('multer');
//var fetch = require('node-fetch'); // Make sure to install node-const router = express.Router(); // Add this line



const router = express.Router(); // Add this line
// SSL/TLS certificates (generated earlier)
const app = express();
const https = require('https');
const fs = require('fs');


//dotenv.config();


 // Add this line
// SSL/TLS certificates (generated earlier)

const accountingUploadsPath = path.join(__dirname, "public", "uploads");

fs.readdir(accountingUploadsPath, (err, files) => {
  if (err) {
    console.error("Cannot read ACCOUNTING uploads folder:", accountingUploadsPath, err);
  } else {
    console.log("Accounting uploads folder OK. Files:", files);
  }
});

const foodUploadsPath = path.join(__dirname, "foods", "uploads");

fs.readdir(foodUploadsPath, (err, files) => {
  if (err) {
    console.error("Cannot read FOOD uploads folder:", foodUploadsPath, err);

  } else {
    console.log("Food uploads folder OK. Files:", files);
  }
});

const companyRegisterRouter = require('./routes/companyRegister');
const companyUpdateRouter = require('./routes/companyUpdate');
const departmentInfoRouter = require('./routes/departmentInfo');
const glTypeInfoRouter = require('./routes/glTypeInfo');
const glListRouter = require('./routes/glList');
const glVoucherSearchRouter = require('./routes/glVoucherSearch');
const glNewRouter = require('./routes/glNew');
const glDataRouter = require('./routes/glData');
const glUpdateRouter = require('./routes/glUpdate');
const glDeleteRouter = require('./routes/glDelete');
const departmentListRouter = require('./routes/departmentList');
const departmentNewRouter = require('./routes/departmentNew');
const departmentUpdateRouter = require('./routes/departmentUpdate');
const customerListRouter = require('./routes/customerList');
const ApArGlListRouter = require('./routes/ApArGlList');
const customerNewRouter = require('./routes/customerNew');
const customerDataRouter = require('./routes/customerData');
const customerDeleteRouter = require('./routes/customerDelete');
const customerUpdateRouter = require('./routes/customerUpdate');
const bankListRouter = require('./routes/bankList');
const assetGlListRouter = require('./routes/assetGlList');
const bankNewRouter = require('./routes/bankNew');
const bankGlInfoRouter = require('./routes/bankGlInfo');
const bankDataRouter = require('./routes/bankData');
const bankUpdateRouter = require('./routes/bankUpdate');
const bankDeleteRouter = require('./routes/bankDelete');
const incomeTaxUpdateRouter = require('./routes/incomeTaxUpdate');
const incomeTaxDeleteRouter = require('./routes/incomeTaxDelete');
const saveIncomeTaxRouter = require('./routes/saveIncomeTax');
const imageSqlRouter = require('./routes/imageSql');
const imageUploadRouter = require('./routes/imageUpload1');
const voucherNewRouter = require('./routes/voucherNew');
const voucherListRouter = require('./routes/voucherList');
const voucherDeleteRouter = require("./routes/voucherDelete");
const voucherChangeRouter = require("./routes/voucherChange");
const glOpenBalanceRouter = require("./routes/glOpenBalance");
const loadGlBalanceRouter = require("./routes/loadGlBalance");
const bankReconciliationRouter = require('./routes/bankReconciliation');
const fetchImageRouter = require('./routes/fetchImage');
const voucherCurrentListRouter = require('./routes/voucherCurrentList');
const voucherEditSearchRouter = require('./routes/voucherEditSearch');
const glReportSearchRouter = require('./routes/glReportSearch');
const glSelectListRouter = require('./routes/glSelectList');
const suppCustAcctListRouter = require('./routes/suppCustAcctList');
const bankReconDeleteRouter = require('./routes/bankReconDelete');
const bankReconSearchRouter = require('./routes/bankReconSearch');
const bankReconSummaryRouter = require('./routes/bankReconSummary');
const taxListRouter = require('./routes/taxList');
const companyInfoRouter = require('./routes/companyInfo');
const purchaseInvoiceVerifyRouter = require('./routes/purchaseInvoiceVerify');
const purchaseInvoiceRouter = require('./routes/purchaseInvoice');
const supplierSearchRouter = require('./routes/supplierSearch');
const lastVoucherNoRouter = require('./routes/lastVoucherNo');
const productSearchRouter = require('./routes/productSearch');
const productListRouter = require('./routes/productList');
const productDataRouter = require('./routes/productData');
const productAdjustWriteOffSearchRouter = require('./routes/productAdjustWriteOffSearch');
const productWriteOffRouter = require('./routes/productWriteOff');
const productReportSearchRouter = require('./routes/productReportSearch');
const productAdjustRouter = require('./routes/productAdjust');
const custSuppListRouter = require('./routes/custSuppList');
const productListByCategoryRouter = require('./routes/productListByCategory');
const voucherVerifyRouter = require('./routes/voucherVerify');
const purchaseVoucherRouter = require('./routes/purchaseVoucher');
const purchaseNoteVerifyRouter = require('./routes/purchaseNoteVerify');
const purchaseNoteRouter = require('./routes/purchaseNote');
const purchaseInvoiceSearchRouter = require('./routes/purchaseInvoiceSearch');
const purchaseReturnNoteRouter = require('./routes/purchaseReturnNote');
const purchaseInvoiceDetailRouter = require('./routes/purchaseInvoiceDetail');
const glMultiSelectListRouter = require('./routes/glMultiSelectList');
const purchaseInvoiceSummaryRouter = require('./routes/purchaseInvoiceSummary');
const purchasePaymentRouter = require('./routes/purchasePayment');
const loadInvoiceTransactionRouter = require('./routes/loadInvoiceTransaction');
const loadPurchaseInvoiceRouter = require('./routes/loadPurchaseInvoice');
const invoiceTxnSearchRouter = require('./routes/invoiceTxnSearch');
const salesGlListRouter = require('./routes/salesGlList');
const salesInvoiceVerifyRouter = require('./routes/salesInvoiceVerify');
const lastSalesInvoiceRouter = require('./routes/lastSalesInvoice');
const salesInvoiceDetailRouter = require('./routes/salesInvoiceDetail');
const loadSalesInvoiceRouter = require('./routes/loadSalesInvoice');
const salesInvoiceRouter = require('./routes/salesInvoice');
const salesNoteVerifyRouter = require('./routes/salesNoteVerify');
const salesNoteRouter = require('./routes/salesNote');
const lastSalesNoteRouter = require('./routes/lastSalesNote');
const salesInvoiceSummaryRouter = require('./routes/salesInvoiceSummary');
const salesReturnNoteRouter = require('./routes/salesReturnNote');
const salesInvoiceEditRouter = require('./routes/salesInvoiceEdit');
const salesReceiptVerifyRouter = require('./routes/salesReceiptVerify');
const salesPaymentRouter = require('./routes/salesPayment');
const lastSalesReceiptRouter = require('./routes/lastSalesReceipt');
const salesYearlyReportRouter = require('./routes/salesYearlyReport');
const categoryListRouter = require('./routes/categoryList');
const categoryUpdateRouter = require('./routes/categoryUpdate');
const categoryInfoRouter = require('./routes/categoryInfo');
const imageInfoRouter = require('./routes/imageInfo');
const companyDataRouter = require('./routes/companyData');
const loadImageRouter = require('./routes/loadImage');
const adminLoginRouter = require('./routes/adminLogin');
const voucherSearchRouter = require('./routes/voucherSearch');
const taxVerifyRouter = require('./routes/taxVerify');
const taxDataRouter = require('./routes/taxData');
const locationListRouter = require('./routes/locationList');
const taxUpdateRouter = require('./routes/taxUpdate');
const taxNewRouter = require('./routes/taxNew');
const yearlyTrialBalanceRouter = require('./routes/yearlyTrialBalance');
const monthlyTrialBalanceRouter = require('./routes/monthlyTrialBalance');
const trialBalanceUpdateRouter = require('./routes/trialBalanceUpdate');
const profitAndLossDeleteRouter = require('./routes/profitAndLossDelete');
const incomeSummaryDeleteRouter = require('./routes/incomeSummaryDelete');
const incomeSummaryRouter = require('./routes/incomeSummary');
const profitAndLossUpdateRouter = require('./routes/profitAndLossUpdate');
const monthlyRevenueRouter = require('./routes/monthlyRevenue');
const PNLCostOfSalesRouter = require('./routes/PNLCostOfSales');
const PNLExpensesRouter = require('./routes/PNLExpenses');
const loadTaxComputationRouter = require('./routes/loadTaxComputation');
const fixedAssetRouter = require('./routes/fixedAsset');
const currentAssetRouter = require('./routes/currentAsset');
const accountReceivableRouter = require('./routes/accountReceivable');
const closingStockRouter = require('./routes/closingStock');
const intangibleAssetRouter = require('./routes/intangibleAsset');
const otherAssetRouter = require('./routes/otherAsset');
const currentLiabilityRouter = require('./routes/currentLiability');
const accountPayableRouter = require('./routes/accountPayable');
const longTermLiabilityRouter = require('./routes/longTermLiability');
const ownerEquityRouter = require('./routes/ownerEquity');
const loadIncomeSummaryRouter = require('./routes/loadIncomeSummary');
const balanceSheetDeleteRouter = require('./routes/balanceSheetDelete');
const balanceSheetUpdateRouter = require('./routes/balanceSheetUpdate');
const yearlyProfitAndLossRouter = require('./routes/yearlyProfitAndLoss');
const yearlyBalanceSheetRouter = require('./routes/yearlyBalanceSheet');
const userListRouter = require('./routes/userList');
const userLoginRouter = require('./routes/userLogin');
const userUpdateRouter = require('./routes/userUpdate');
const bankTransactionRouter = require('./routes/bankTransaction');
const userDeleteRouter = require('./routes/userDelete');

//const allowedOrigins = ['http://localhost:3000', 'https://centralsoft.com.my'];
const imageRoutesRouter = require('./routes/imageRoutes');

app.set("views", path.join(__dirname, "views"));
app.set("help", path.join(__dirname, "help"));
app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({
//  extended: true
//}));
app.use(bodyParser.json());
//app.use('/public', express.static('public'));
// Basic route
//app.use(express.static('public'));  // Now `/company.png` maps to `./public/company.png`
app.use('/public', express.static(path.join(__dirname, 'public/uploads')));
router.use('/public/uploads', express.static(path.join(__dirname, '../public/uploads')));

//app.use(cors());
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.1.133:3000',
  'http://localhost:5002',
  'http://192.168.1.133:5002',      // for dev
  'https://centralsoft.com.my',
  'https://stall-centralsoft.com'
      // for production
];


const corsOptions = {
  origin: ['http://localhost:3000', 'https://centralsoft.com.my', 'https://stall-centralsoft.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};


// Apply CORS g

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const helmet = require('helmet');
app.use(helmet());
app.set('trust proxy', 1);

app.use(logger("dev"));
app.use(express.json());
//**app.use(express.static('/var/www/frontend/build'));
//app.use(express.static(path.join(__dirname, '../frontend/build')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/var/www/frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile('/var/www/frontend/build/index.html');
  });
}
//app.use(express.static(path.join(__dirname, 'path/to/frontend/build')));  // or /var/www/frontend
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'client/build/index.html'));
//});



app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
const foodsIndex = require("./foods/index");
const foodsMenu = require("./foods/menu");
const foodsOrder = require("./foods/orders");
const foodsAdmin = require("./foods/admin");

app.use("/api/foods", foodsIndex);
app.use("/api/menu", foodsMenu);
app.use("/api/orders", foodsOrder);
app.use("/api/admin", foodsAdmin);

// serve food images


app.use("/food-images", express.static(path.join(__dirname, "foods/uploads")));

//const foodsRouter = require('./routes/foods');
//const foodsUploadRouter = require('./routes/foodsUpload');

//app.use('/api/foods', foodsRouter);
//app.use('/api/foodsUpload', foodsUploadRouter);
//app.use('/foods', express.static(path.join(__dirname, 'public/foods')));

//app.use('/uploads', express.static('uploads'));
//app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));
//app.use('/api/images', express.static(path.join(__dirname, 'public', 'uploads'))); // if images are stored here
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(session({
  store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use('/api/companyRegister',companyRegisterRouter);
app.use('/api/companyUpdate',companyUpdateRouter);
app.use('/api/glList', glListRouter);
app.use('/api/departmentInfo', departmentInfoRouter);
app.use('/api/glTypeInfo', glTypeInfoRouter);
app.use('/api/glVoucherSearch', glVoucherSearchRouter);
app.use("/api/glNew", glNewRouter);
app.use("/api/glData", glDataRouter);
app.use("/api/glUpdate", glUpdateRouter)
app.use("/api/glDelete", glDeleteRouter)
app.use("/api/departmentList", departmentListRouter)
app.use("/api/departmentNew", departmentNewRouter)
app.use("/api/departmentUpdate", departmentUpdateRouter)
app.use("/api/customerList", customerListRouter)
app.use("/api/ApArGlList", ApArGlListRouter)
app.use("/api/customerData", customerDataRouter)
app.use("/api/customerDelete", customerDeleteRouter)
app.use("/api/customerUpdate", customerUpdateRouter);
app.use("/api/customerNew", customerNewRouter);
app.use("/api/bankList", bankListRouter);
app.use("/api/assetGlList", assetGlListRouter);
app.use("/api/bankNew", bankNewRouter);
app.use("/api/bankGlInfo", bankGlInfoRouter);
app.use("/api/bankData", bankDataRouter);
app.use("/api/bankUpdate", bankUpdateRouter);
app.use("/api/bankDelete", bankDeleteRouter);
app.use("/api/incomeTaxUpdate", incomeTaxUpdateRouter);
app.use("/api/incomeTaxDelete", incomeTaxDeleteRouter);
app.use("/api/saveIncomeTax", saveIncomeTaxRouter);
app.use("/api/imageSql", imageSqlRouter);
app.use("/api/imageUpload", imageUploadRouter);
app.use("/api/voucherNew", voucherNewRouter);
app.use("/api/voucherList", voucherListRouter);
app.use("/api/voucherDelete", voucherDeleteRouter);
app.use("/api/voucherChange", voucherChangeRouter);
app.use("/api/glOpenBalance", glOpenBalanceRouter);
app.use("/api/loadGlBalance", loadGlBalanceRouter);
app.use("/api/bankReconciliation", bankReconciliationRouter);
app.use('/api/fetchImage', fetchImageRouter);
app.use('/api/voucherSearch', voucherSearchRouter);
app.use('/api/voucherCurrentList', voucherCurrentListRouter);
app.use('/api/voucherEditSearch', voucherEditSearchRouter);
app.use('/api/glReportSearch', glReportSearchRouter);
app.use('/api/glSelectList', glSelectListRouter);
app.use('/api/suppCustAcctList', suppCustAcctListRouter);
app.use('/api/bankReconDelete', bankReconDeleteRouter);
app.use('/api/bankReconSearch', bankReconSearchRouter);
app.use('/api/bankReconSummary', bankReconSummaryRouter);
app.use('/api/taxList', taxListRouter);
app.use('/api/companyInfo', companyInfoRouter);
app.use('/api/custSuppList', custSuppListRouter);
app.use('/api/purchaseInvoiceVerify', purchaseInvoiceVerifyRouter);
app.use("/api/purchaseInvoice", purchaseInvoiceRouter);
app.use("/api/supplierSearch", supplierSearchRouter);
app.use("/api/lastVoucherNo", lastVoucherNoRouter);
app.use("/api/productSearch", productSearchRouter);
app.use("/api/productList", productListRouter);
app.use("/api/productData", productDataRouter);
//app.use("/api/productAdjust", productAdjustRouter);
//app.use("/api/productWriteOff", productWriteOffRouter);
app.use("/api/productReportSearch", productReportSearchRouter);
app.use("/api/productListByCategory", productListByCategoryRouter);
app.use("/api/voucherVerify", voucherVerifyRouter);
app.use("/api/purchaseVoucher", purchaseVoucherRouter);
app.use("/api/purchaseNoteVerify", purchaseNoteVerifyRouter);
app.use("/api/purchaseNote", purchaseNoteRouter);
app.use("/api/purchaseInvoiceSearch", purchaseInvoiceSearchRouter);
app.use("/api/purchaseInvoiceDetail", purchaseInvoiceDetailRouter);
app.use("/api/purchaseReturnNote", purchaseReturnNoteRouter);
app.use("/api/glMultiSelectList", glMultiSelectListRouter);
app.use("/api/purchaseInvoiceSummary", purchaseInvoiceSummaryRouter);
app.use("/api/purchasePayment", purchasePaymentRouter);
app.use("/api/loadInvoiceTransaction", loadInvoiceTransactionRouter);
app.use("/api/loadPurchaseInvoice", loadPurchaseInvoiceRouter);
app.use("/api/invoiceTxnSearch", invoiceTxnSearchRouter);
app.use("/api/salesGlList", salesGlListRouter);
app.use("/api/salesInvoiceVerify", salesInvoiceVerifyRouter);
app.use("/api/lastSalesInvoice", lastSalesInvoiceRouter);
app.use("/api/salesInvoiceDetail", salesInvoiceDetailRouter);
app.use("/api/loadSalesInvoice", loadSalesInvoiceRouter);
app.use("/api/salesInvoice", salesInvoiceRouter);
app.use("/api/salesNoteVerify", salesNoteVerifyRouter);
app.use("/api/salesNote" , salesNoteRouter);
app.use("/api/lastSalesNote" , lastSalesNoteRouter);
app.use("/api/salesInvoiceSummary" , salesInvoiceSummaryRouter);
app.use("/api/salesReturnNote", salesReturnNoteRouter);
app.use("/api/salesInvoiceEdit", salesInvoiceEditRouter);
app.use("/api/salesReceiptVerify", salesReceiptVerifyRouter);
app.use("/api/salesPayment", salesPaymentRouter);
app.use("/api/lastSalesReceipt", lastSalesReceiptRouter);
app.use("/api/salesYearlyReport", salesYearlyReportRouter);
app.use("/api/categoryList", categoryListRouter);
app.use("/api/categoryUpdate", categoryUpdateRouter);
app.use("/api/categoryInfo", categoryInfoRouter);
app.use('/api/companyData', companyDataRouter);
app.use('/api/imageInfo', imageInfoRouter);
app.use('/api/loadImage', loadImageRouter);
app.use('/api/imageRoutes', imageRoutesRouter);
app.use('/api/adminLogin', adminLoginRouter);
app.use('/api/taxVerify', taxVerifyRouter);
app.use('/api/taxData', taxDataRouter);
app.use('/api/locationList', locationListRouter);
app.use("/api/taxUpdate", taxUpdateRouter);
app.use("/api/taxNew", taxNewRouter);
app.use("/api/yearlyTrialBalance", yearlyTrialBalanceRouter);
app.use("/api/monthlyTrialBalance", monthlyTrialBalanceRouter);
app.use("/api/trialBalanceUpdate", trialBalanceUpdateRouter);
app.use("/api/profitAndLossDelete", profitAndLossDeleteRouter);
app.use("/api/incomeSummaryDelete", incomeSummaryDeleteRouter);
app.use("/api/incomeSummary", incomeSummaryRouter);
app.use("/api/profitAndLossUpdate", profitAndLossUpdateRouter);
app.use("/api/monthlyRevenue", monthlyRevenueRouter);
app.use("/api/PNLCostOfSales", PNLCostOfSalesRouter);
app.use("/api/PNLExpenses", PNLExpensesRouter);
app.use("/api/loadTaxComputation", loadTaxComputationRouter);
app.use("/api/fixedAsset", fixedAssetRouter);
app.use("/api/currentAsset", currentAssetRouter);
app.use("/api/accountReceivable", accountReceivableRouter);
app.use("/api/closingStock", closingStockRouter);
app.use("/api/intangibleAsset", intangibleAssetRouter);
app.use("/api/otherAsset", otherAssetRouter);
app.use("/api/currentLiability", currentLiabilityRouter);
app.use("/api/accountPayable", accountPayableRouter);
app.use("/api/longTermLiability", longTermLiabilityRouter);
app.use("/api/ownerEquity", ownerEquityRouter);
app.use("/api/loadIncomeSummary", loadIncomeSummaryRouter);
app.use("/api/balanceSheerDelete", balanceSheetDeleteRouter);
app.use("/api/balanceSheerUpdate", balanceSheetUpdateRouter);
app.use("/api/yearlyProfitAndLoss", yearlyProfitAndLossRouter);
app.use("/api/userList", userListRouter);
app.use("/api/userLogin", userLoginRouter);
app.use("/api/userUpdate", userUpdateRouter);
app.use("/api/bankTransaction", bankTransactionRouter);
app.use("/api/userDelete", userDeleteRouter);


app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});


app.use(passport.initialize());
app.use(passport.session());
/*
// ---- Load Routes Dynamically ----
const routeFiles = fs.readdirSync(path.join(__dirname, 'routes'));
routeFiles.forEach(file => {
  const routePath = `./routes/${file}`;
  const routeName = `/api/${file.replace('.js','')}`;
  app.use(routeName, require(routePath));
  console.log(`🔹 Loaded route: ${routeName}`);
});
*/

app.use((req, res, next) => {
  if (!res.headersSent) {
    console.log(`🔍 Unknown API route: ${req.originalUrl}`);
    res.status(404).send('Route not found');
  }
});

app.use('/api/*', (req, res) => {
  console.log("❌ Unknown API route:", req.originalUrl);
  res.status(404).send('API route not found');
});
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

/*
app.use((req, res, next) => {
  console.log(`🛰️  ${req.method} ${req.originalUrl}`);
  next();
});
*/
/*
app.use(flash());new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
  secret: "Our little secret.",
  resave: false,
  saveUninitialized:

   app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
  });
  */
// Routes
app.get('/', (req, res) => {
  res.send(`
    <html>
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      <body>
    <div class="jumbotron centered">
   <div class="container">
        <img src="/company.png" width="100" height="100" />
  <h1 class="display-3">CentralSoft Backend System 7.1.1</h1>
  </div>
  </div>
  </body>
    </html>
  `);

});
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

          app.get('/api/images/:imageId', (req, res) => {
     const imageId = req.params.imageId;
  const imagePath = path.join(__dirname, 'public', 'uploads', imageId);
  console.log("Sending file:", imagePath);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("Image not found");
    }
  });
  });



             // upload image



            app.get("/api/helpPage", (req, res) => {
              res.sendFile(__dirname + "/help/helpPage.html");
            });





     app.get("/GSTPeriodicalReport", function(req, res, next) {
        var companyID = req.query.companyID;
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        var custData=[];
      //  console.log(companyID);
      //  console.log(employeeNo);
        var db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
      });  // ale/  var userLevel = req.query.userLevel;

        //console.log('req.body here -> ', categoryID);
        var sql="SELECT * from taxTxn where companyID = '"+companyID+"' and document_date >= '"+ startDate +"' and document_date<= '"+endDate+"' order by document_date";
          // console.log(req.beforeDestroy() {
         console.log(sql);
          // },);
        db.query(sql, function (err, results, fields) {
         if(err){
           console.log('Error while fetching GST Transaction Record, err');
          // results(null,err);
          return;

        }else{
      //    custData=results
          console.log(results);
       console.log('GST Load successfully');
            res.send(results);

        }

           db.end();
        });
        });

   app.get("/GSTInputOutPutReport", function(req, res, next) {
          var companyID = req.query.companyID;
          var startDate = req.query.startDate;
          var endDate = req.query.endDate;
          var taxType = req.query.taxType;
          var custData=[];
        //  console.log(companyID);
        //  console.log(employeeNo);
          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;

          //console.log('req.body here -> ', categoryID);
          var sql="SELECT * from taxTxn where companyID = '"+companyID+"' and taxType = '"+taxType+"' and document_date >= '"+ startDate +"' and document_date<= '"+endDate+"' order by taxCode";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
             console.log('Error while fetching GST Transaction Record, err');
            // results(null,err);
            return;

          }else{
        //    custData=results
        //    console.log(results);
         console.log('GST Load successfully on '+taxType);
              res.send(results);
          }
             db.end();
          });
          });















app.listen(3000, '0.0.0.0', () => {
      console.log("✅ Server running at http://127.0.0.1:3000");
});
