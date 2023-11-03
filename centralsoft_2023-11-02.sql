# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: dev-codesquad.cobtsowwpvts.ap-southeast-1.rds.amazonaws.com (MySQL 5.7.42-log)
# Database: centralsoft
# Generation Time: 2023-11-02 04:33:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table balanceSheet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `balanceSheet`;

CREATE TABLE `balanceSheet` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` char(30) DEFAULT NULL,
  `year` int(5) DEFAULT '0',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `addNo` varchar(30) DEFAULT '',
  `glName` varchar(255) DEFAULT '',
  `totalText` varchar(255) DEFAULT '',
  `amount` double(15,2) DEFAULT '0.00',
  `date_close` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `PNLType` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `balanceSheet` WRITE;
/*!40000 ALTER TABLE `balanceSheet` DISABLE KEYS */;

INSERT INTO `balanceSheet` (`id`, `companyID`, `year`, `startDate`, `endDate`, `addNo`, `glName`, `totalText`, `amount`, `date_close`, `date_created`, `PNLType`)
VALUES
	(3,'codesquad',2023,'2023-01-01','2023-12-31','Less :','Accumulated Depreciation - Office Equipment','',-340.00,'2023-09-17','2023-09-17','FAS'),
	(4,'codesquad',2023,'2023-01-01','2023-12-31','','Computer ','',500.00,'2023-09-17','2023-09-17','FAS'),
	(5,'codesquad',2023,'2023-01-01','2023-12-31','','Land and Building ','',20000.00,'2023-09-17','2023-09-17','FAS'),
	(6,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL FIXED ASSETS :',45760.00,'2023-09-17','2023-09-17','FAS'),
	(7,'codesquad',2023,'2023-01-01','2023-12-31','','CURRENT ASSETS :','RM',0.00,'2023-09-17','2023-09-17','CAS'),
	(8,'codesquad',2023,'2023-01-01','2023-12-31','','Cash in hand - cash receipt','',4870.02,'2023-09-17','2023-09-17','CAS'),
	(9,'codesquad',2023,'2023-01-01','2023-12-31',' Less :','AMB Bank Account','',-15640.00,'2023-09-17','2023-09-17','CAS'),
	(10,'codesquad',2023,'2023-01-01','2023-12-31','','RHB Bank Padungan Branch','',14974.00,'2023-09-17','2023-09-17','CAS'),
	(11,'codesquad',2023,'2023-01-01','2023-12-31',' Less :','Cash On Hand ','',-1420.00,'2023-09-17','2023-09-17','CAS'),
	(12,'codesquad',2023,'2023-01-01','2023-12-31',' Less :','SCB Bank Account ','',-3500.00,'2023-09-17','2023-09-17','CAS'),
	(13,'codesquad',2023,'2023-01-01','2023-12-31','','AMB Bank Bhd.','',30995.00,'2023-09-17','2023-09-17','CAS'),
	(14,'codesquad',2023,'2023-01-01','2023-12-31','','PBB Bank','',4000.00,'2023-09-17','2023-09-17','CAS'),
	(15,'codesquad',2023,'2023-01-01','2023-12-31','','PBB Bank (KCH)','',2000.00,'2023-09-17','2023-09-17','CAS'),
	(16,'codesquad',2023,'2023-01-01','2023-12-31',' Less :','HSBC Bank','',-1790.00,'2023-09-17','2023-09-17','CAS'),
	(17,'codesquad',2023,'2023-01-01','2023-12-31','','HSBC Bank (KCH)','',11106.00,'2023-09-17','2023-09-17','CAS'),
	(18,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL CURRENT ASSETS :',45595.02,'2023-09-17','2023-09-17','CAS'),
	(19,'codesquad',2023,'2023-01-01','2023-12-31','','','Account Receivable :',65011.36,'2023-09-17','2023-09-17','CAS'),
	(20,'codesquad',2023,'2023-01-01','2023-12-31','','Inventory Closing Balance','RM',0.00,'2023-09-17','2023-09-17','CAS'),
	(21,'codesquad',2023,'2023-01-01','2023-12-31','','Inventory Closing Balance','',5452.92,'2023-09-17','2023-09-17','CAS'),
	(22,'codesquad',2023,'2023-01-01','2023-12-31','','','INTANGIBLE ASSETS',2000.00,'2023-09-17','2023-09-17','INT'),
	(23,'codesquad',2023,'2023-01-01','2023-12-31','','','OTHER ASSETS',100.00,'2023-09-17','2023-09-17','OAS'),
	(24,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL ASSETS :',163919.30,'2023-09-17','2023-09-17','OAS'),
	(25,'codesquad',2023,'2023-01-01','2023-12-31','','','CURRENT LIABILITIES',0.00,'2023-09-17','2023-09-17','CUL'),
	(26,'codesquad',2023,'2023-01-01','2023-12-31','','Accrued Salary','',1200.00,'2023-09-17','2023-09-17','CUL'),
	(27,'codesquad',2023,'2023-01-01','2023-12-31','','Accrued GST Output Tax ','',1.38,'2023-09-17','2023-09-17','CUL'),
	(28,'codesquad',2023,'2023-01-01','2023-12-31','','','Account Payable',23816.12,'2023-09-17','2023-09-17','CUL'),
	(29,'codesquad',2023,'2023-01-01','2023-12-31','','','LONG TERM LIABILITIES',0.00,'2023-09-17','2023-09-17','LTL'),
	(30,'codesquad',2023,'2023-01-01','2023-12-31','','Long Term Liability','',10000.00,'2023-09-17','2023-09-17','LTL'),
	(31,'codesquad',2023,'2023-01-01','2023-12-31','','','OWNER EQUITIES',0.00,'2023-09-17','2023-09-17','OEQ'),
	(32,'codesquad',2023,'2023-01-01','2023-12-31','','Owner Equities / Capital Account','',200000.00,'2023-09-17','2023-09-17','OEQ'),
	(33,'codesquad',2023,'2023-01-01','2023-12-31','','','Retained Earning for the year',68104.56,'2023-09-17','2023-09-17','OEQ'),
	(34,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL OWNER EQUITIES :',268104.56,'2023-09-17','2023-09-17','OEQ'),
	(35,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL LIABILITIES AND OWNER EQUITIES :',303122.06,'2023-09-17','2023-09-17','OEQ');

/*!40000 ALTER TABLE `balanceSheet` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bankAcct
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankAcct`;

CREATE TABLE `bankAcct` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAcctNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  `tel1` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel2` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `openingBal` double(15,2) DEFAULT NULL,
  `curBal` double(15,2) DEFAULT NULL,
  `lastTxnDate` date DEFAULT NULL,
  `curTxnDate` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `glNo` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `bankAcct` WRITE;
/*!40000 ALTER TABLE `bankAcct` DISABLE KEYS */;

INSERT INTO `bankAcct` (`id`, `companyID`, `bankID`, `bankName`, `bankAcctNo`, `address1`, `address2`, `postcode`, `city`, `state`, `country`, `level`, `tel1`, `tel2`, `fax`, `email`, `openingBal`, `curBal`, `lastTxnDate`, `curTxnDate`, `date_created`, `glNo`, `glSub`, `glType`)
VALUES
	(12,'codesquad','RHB','RHB Bank Berhad','RHB1111','123, Jalan Song','Jalan Tun Juga',93350,'Kuching','Sarawak','Malaysia',NULL,'+60821238882','','','percylim@gmail.com',NULL,NULL,NULL,NULL,'2023-10-19','4001','300','401');

/*!40000 ALTER TABLE `bankAcct` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bankRecon
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankRecon`;

CREATE TABLE `bankRecon` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` varchar(50) DEFAULT NULL,
  `refNo` varchar(30) DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `bankID` varchar(50) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `bankAcctNo` varchar(50) DEFAULT NULL,
  `bankBal` double(15,2) DEFAULT NULL,
  `glBal` double(15,2) DEFAULT NULL,
  `voucherNo` varchar(30) DEFAULT NULL,
  `adjAmount` double(15,2) DEFAULT NULL,
  `particular` varchar(255) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `rowNo` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `bankRecon` WRITE;
/*!40000 ALTER TABLE `bankRecon` DISABLE KEYS */;

INSERT INTO `bankRecon` (`id`, `companyID`, `refNo`, `txnDate`, `bankID`, `bankName`, `bankAcctNo`, `bankBal`, `glBal`, `voucherNo`, `adjAmount`, `particular`, `date_created`, `rowNo`)
VALUES
	(128,'codesquad','20231025','2023-10-25','RHB','RHB Bank Berhad','RHB1111',0.00,3000.00,'',0.00,'Balance as at 25/10/2023','2023-10-25',0),
	(129,'codesquad','20231025','2023-10-25','RHB','RHB Bank Berhad','RHB1111',3000.00,0.00,'',0.00,'testing','2023-10-25',1),
	(130,'codesquad','20231030','2023-10-30','RHB','RHB Bank Berhad','RHB1111',0.00,3000.00,'',0.00,'Balance as at 30/10/2023','2023-10-25',0),
	(131,'codesquad','20231030','2023-10-30','RHB','RHB Bank Berhad','RHB1111',1000.00,0.00,'',0.00,'Unclear AMB Cheque No. 294884 deposit ','2023-10-25',1),
	(132,'codesquad','20231030','2023-10-30','RHB','RHB Bank Berhad','RHB1111',1000.00,0.00,'',0.00,'Unclear SCB Cheque No. 2956884 deposit ','2023-10-25',2),
	(133,'codesquad','20231030','2023-10-30','RHB','RHB Bank Berhad','RHB1111',1000.00,0.00,'',0.00,'Unclear RHB Cheque No. 66956884 deposit ','2023-10-25',3);

/*!40000 ALTER TABLE `bankRecon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `companyID`, `categoryID`, `categoryName`, `catDescription`, `image`, `date_created`)
VALUES
	(8,'codesquad','100','Health Foods','Health foods on mixed herbs',NULL,'2023-10-30'),
	(9,'codesquad','200','Medical Products','Medical product for hospital',NULL,'2023-10-30');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registerNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeTaxNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epfNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socsoNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finYearStart` date DEFAULT NULL,
  `finYearEnd` date DEFAULT NULL,
  `telNo1` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo2` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo3` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `faxNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `gstNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyLogo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAccount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `businessCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `companyID`, `companyName`, `registerNo`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `incomeTaxNo`, `epfNo`, `socsoNo`, `finYearStart`, `finYearEnd`, `telNo1`, `telNo2`, `telNo3`, `faxNo`, `email`, `website`, `date_created`, `gstNo`, `companyLogo`, `bankAccount`, `businessCode`)
VALUES
	(2,'codesquad','Code Squad Technology','1298846666-V','979, Bayor Bukit Lorong 4','Tabuan Jaya','93350','Kuching','SARAWAK','Malaysia','OG89909909734643','EPF777','SOS15552','2021-01-01','2021-12-31','+60821238882','+60821238882',NULL,'082-1029921','percylim@gmail.com','codesquad@gmail.com','2021-10-12','GST23646','codesquad-company.png','rhb bank berhad A/C no. 234590-128344','787998');

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateCreated` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;

INSERT INTO `department` (`id`, `companyID`, `department`, `Description`, `dateCreated`)
VALUES
	(1,'codesquad','100','Sales Department (Kuching)','2021-11-01'),
	(2,'codesquad','200','Purchase Department ','2021-11-01'),
	(3,'codesquad','300','Hardware Department ','2021-11-01'),
	(4,'codesquad','400','Health Foods Department','2021-11-01'),
	(5,'codesquad','500','Furniture Department','2021-11-01'),
	(7,'codesquad','600','Administration Department','2022-01-30'),
	(8,'codesquad','700','Financial Department','2022-02-02'),
	(9,'codesquad','800','IT Department','2022-02-16'),
	(10,'codesquad','810','Electrical Department','2022-02-16'),
	(12,'codesquad','101','Sales Department (Sibu)','2023-05-08'),
	(13,'codesquad','682','Account Department','2023-09-30');

/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nric` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` double(15,2) DEFAULT NULL,
  `otRate` double(15,2) DEFAULT NULL,
  `payMethod` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeTaxNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epfNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socsoNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drivingLicenseNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `childs` int(2) DEFAULT NULL,
  `employDate` date DEFAULT NULL,
  `telNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hpNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maritalStatus` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `race` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `companyID`, `employeeNo`, `employeeName`, `nric`, `sex`, `dateBirth`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `level`, `position`, `salary`, `otRate`, `payMethod`, `incomeTaxNo`, `epfNo`, `socsoNo`, `drivingLicenseNo`, `childs`, `employDate`, `telNo`, `hpNo`, `email`, `password`, `maritalStatus`, `race`, `image`, `companyName`)
VALUES
	(43,'codesquad','2222','Nancy','19909992','F','1988-11-01','111, Lorong 123','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia',2,'Clerk',1230.00,NULL,'M','TAX899','EPF777','SOS15552','dvi1999',0,'2022-01-01','+60821238882','+60821238882','percylim@gmail.com','0d17881ccd24ab48579a9ebb5df75995','M','Malay',NULL,'Code Squad Technology'),
	(45,'codesquad','3333','James','K.1222222','M','2001-03-12','111, Lorong 12354','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia',4,'',0.00,NULL,'','','','','',0,'0000-00-00','+60821238882','010-33333','percylim@gmail.com','0bc2e9c0f3bc0a4340bacdb55b59c7b1','','Chinese',NULL,'Code Squad Technology'),
	(46,'codesquad','4444','Peter','23323223','M','1980-11-01','979, Bayor Bukit Lorong 4','Tabuan Jaya','93350','Kuching','SARAWAK','Malaysia',4,'',0.00,NULL,'','','','','',0,'0000-00-00','+60821238882','+60821238882','percylim@gmail.com','97fff486e42f55a5a033e8a920c4b0d1','','Uban',NULL,'Code Squad Technology'),
	(47,'codesquad','5555','Peter','1289922','M','0000-00-00','111, Lorong 123','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia',4,'',0.00,NULL,'','','','','',0,'0000-00-00','+60821238882','+60821238882','percylim@gmail.com','c1e32939813062beb41ab415c9f88cf9','','Chinese',NULL,'Code Squad Technology'),
	(48,'codesquad','6666','Wong Siew Li','K.1222222','M','0000-00-00','111, Lorong 123','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia',4,'',0.00,NULL,'','','','','',0,'0000-00-00','+60821238882','+60821238882','percylim@gmail.com','98e377c27c4c2470a7bb08c67fe21577','','Chinese',NULL,'Code Squad Technology');

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table epf
# ------------------------------------------------------------

DROP TABLE IF EXISTS `epf`;

CREATE TABLE `epf` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startSalary` double(15,2) DEFAULT NULL,
  `endSalary` double(15,2) DEFAULT NULL,
  `companyRate` double(15,2) DEFAULT NULL,
  `employeeRate` double(15,2) DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortSalary` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `epf` WRITE;
/*!40000 ALTER TABLE `epf` DISABLE KEYS */;

INSERT INTO `epf` (`id`, `companyID`, `startSalary`, `endSalary`, `companyRate`, `employeeRate`, `remark`, `sortSalary`)
VALUES
	(1,'codesquad',10.01,20.09,1.10,0.90,'Fist EPF',10.01),
	(2,'codesquad',20.01,30.01,2.20,1.80,'Test edit',20.01),
	(3,'codesquad',30.01,40.01,3.30,2.70,'test edit',30.01),
	(4,'codesquad',50.00,60.01,5.50,4.50,'Testing ',50.00),
	(5,'codesquad',100.00,200.01,11.00,9.00,'Try',100.00),
	(6,'codesquad',300.00,400.00,33.00,27.00,'',NULL),
	(7,'codesquad',500.00,600.00,55.00,45.00,'',NULL),
	(8,'codesquad',700.00,800.00,77.00,63.00,'',NULL),
	(9,'codesquad',900.01,1000.00,99.00,81.00,'test',900.01),
	(11,'codesquad',1200.00,1300.00,144.00,108.00,'Testing edit',1200.00),
	(12,'codesquad',1100.00,1200.00,121.00,99.00,'Testing Edit',NULL),
	(13,'codesquad',1300.00,1400.00,162.00,112.00,'',NULL),
	(14,'codesquad',1400.00,1500.00,154.00,126.00,'',1400.00),
	(16,'codesquad',200.01,399.10,6.35,2.15,'testing',200.01),
	(17,'codesquad',1000.00,1100.00,12.00,11.00,'Remark',1000.00),
	(18,'codesquad',1500.01,1600.00,4.80,3.00,'EPF Rate per month',1500.01);

/*!40000 ALTER TABLE `epf` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table glAccount
# ------------------------------------------------------------

DROP TABLE IF EXISTS `glAccount`;

CREATE TABLE `glAccount` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glType` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glAmount` double(15,2) DEFAULT NULL,
  `lastTxnDate` date DEFAULT NULL,
  `opBalance` double(15,2) DEFAULT NULL,
  `currentBalance` double(15,2) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `debit` double(15,2) DEFAULT '0.00',
  `credit` double(15,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `glAccount` WRITE;
/*!40000 ALTER TABLE `glAccount` DISABLE KEYS */;

INSERT INTO `glAccount` (`id`, `companyID`, `glNo`, `glSub`, `glType`, `department`, `glName`, `glDescription`, `glAmount`, `lastTxnDate`, `opBalance`, `currentBalance`, `startDate`, `endDate`, `debit`, `credit`)
VALUES
	(3,'codesquad','2001','100','201','100','Credit Sales','Credit Sales on customer',-6920.50,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(4,'codesquad','2001','101','201','100','Cash Sales','Cash Sales on cash customer only',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(5,'codesquad','2002','100','202','100','Credit Purchase','Credit Purchase from Supplier',2175.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(6,'codesquad','2002','101','202','100','Cash Purchase','Purchase from cash supplier',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(7,'codesquad','2003','100','203','100','Sales Return Inward','Sales Return Inward',12.90,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(8,'codesquad','2003','101','203','100','Sales Credit / Discount','Sales Credit Note and Discount Given',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(9,'codesquad','2004','100','204','100','Purchase Return Outward','Purchase Return Outward',-12.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(10,'codesquad','2004','101','204','100','Purchase Debit / Discount Received','Puchase Debit Note and Discount Receiving',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(11,'codesquad','2005','100','205','100','Retal Receiving','Other Income / Rental / commission / Servicing',-2000.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(12,'codesquad','3001','100','301','100','Office Rental ','Office Monthly Rental',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(13,'codesquad','3001','101','301','100','Vehicle Fuel Consumption','Vehicle Running Expenses on Fuel',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(14,'codesquad','3001','102','301','100','Stationeries','Office Stationeries Expenses',100.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(15,'codesquad','3002','100','302','100','Salesmen Salaries','Salesmen Salaries for Sales Department',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(16,'codesquad','4001','100','401','100','Cash on Hand','Cash Receiving',2100.00,NULL,2100.00,NULL,NULL,NULL,0.00,0.00),
	(17,'codesquad','3004','100','304','600','Staffs Salaries','Staffs Salaries for All Department',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(18,'codesquad','2001','200','201','100','Travelling Expenses','Air Ticket, travelling expenses etc',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(19,'codesquad','8002','200','802','100','ABC Company','Retail CUstomer',23664.50,NULL,20000.00,NULL,NULL,NULL,0.00,0.00),
	(20,'codesquad','8002','202','802','100','DEF Company','Wholeseller Customer',23081.00,NULL,20500.00,NULL,NULL,NULL,0.00,0.00),
	(22,'codesquad','4006','100','406','700','Depreciation on Computer','for all office computer',-36000.00,NULL,-36000.00,NULL,NULL,NULL,0.00,0.00),
	(23,'codesquad','4006','101','406','100','Depreciation on Furniture','for office furnitures',-20000.00,NULL,-20000.00,NULL,NULL,NULL,0.00,0.00),
	(24,'codesquad','3004','300','304','700','Sales Office Rental','for slaes office',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(25,'codesquad','4001','300','401','682','RHB Bank Account','RHB BankTabuan Jaya',3000.00,NULL,1000.00,NULL,NULL,NULL,0.00,0.00),
	(26,'codesquad','4002','200','402','682','Shop House','3 stories shop house location at BDC',186500.00,NULL,186500.00,NULL,NULL,NULL,0.00,0.00),
	(27,'codesquad','4008','100','408','682','Accrual - Salaries','Staff Salary accrual',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(28,'codesquad','4008','200','408','682','Accrual - EPF','EPF contribution Accrual',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(29,'codesquad','3004','400','304','682','EPF Contribution','EPF Contribution',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(30,'codesquad','8001','100','801','200','MDD Supplier','Medication and Helth Foods Supplier',-17100.90,NULL,-15900.00,NULL,NULL,NULL,0.00,0.00),
	(31,'codesquad','8001','101','801','200','IT Supplier','IT Product Supplier',-22900.00,NULL,-20000.00,NULL,NULL,NULL,0.00,0.00),
	(32,'codesquad','5003','100','503','700','Bank Loan on RHB Bank','Fixed Loan on RHB Bank',-49880.00,NULL,-49880.00,NULL,NULL,NULL,0.00,0.00),
	(33,'codesquad','7001','100','701','700','Capital Account','Capital Account contribution',-20000.00,NULL,-200000.00,NULL,NULL,NULL,0.00,0.00),
	(34,'codesquad','4002','101','402','600','Office Computer','Office Computer',12700.00,NULL,10100.00,NULL,NULL,NULL,0.00,0.00),
	(35,'codesquad','4002','103','402','600','Office Furniture','Office Furniture',10000.00,NULL,10000.00,NULL,NULL,NULL,0.00,0.00),
	(36,'codesquad','4001','101','401','100','Petty Cash','Petty Cash',100.00,NULL,100.00,NULL,NULL,NULL,0.00,0.00),
	(37,'codesquad','4002','201','402','700','Land','Land own at BDC',6500.00,NULL,6500.00,NULL,NULL,NULL,0.00,0.00),
	(38,'codesquad','4004','100','404','700','Good Will','Good Will from XXX Company',30000.00,NULL,30000.00,NULL,NULL,NULL,0.00,0.00),
	(39,'codesquad','7001','300','701','700','Retained Earning','Accumulated Retained Earning',0.00,NULL,-21315.00,NULL,NULL,NULL,0.00,0.00),
	(40,'codesquad','4001','105','401','700','Investment','Investment on ZZZ Holdings',46000.00,NULL,46000.00,NULL,NULL,NULL,0.00,0.00),
	(41,'codesquad','4001','200','401','600','Prepared - Insurance','Prepared in Staffs Insurance',0.00,NULL,NULL,NULL,NULL,NULL,0.00,0.00),
	(42,'codesquad','4003','100','403','100','Other Assets','Other Assets',3000.00,NULL,3000.00,NULL,NULL,NULL,0.00,0.00),
	(43,'codesquad','8004','100','804','682','Inventory Opening Balance Carried Down','Opening Stock Balance',27295.00,NULL,27295.00,NULL,NULL,NULL,0.00,0.00);

/*!40000 ALTER TABLE `glAccount` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table glTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `glTxn`;

CREATE TABLE `glTxn` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `voucherNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `glNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glType` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnYear` int(4) DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `txnAmount` double(15,2) DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `glTxn` WRITE;
/*!40000 ALTER TABLE `glTxn` DISABLE KEYS */;

INSERT INTO `glTxn` (`id`, `companyID`, `jvInit`, `voucherNo`, `glNo`, `glSub`, `department`, `glName`, `glType`, `txnYear`, `txnDate`, `txnAmount`, `jeParticular`, `status`)
VALUES
	(3,'codesquad','','','8002','202','100','DEF Company',NULL,NULL,'2023-10-10',-675.00,NULL,NULL),
	(4,'codesquad','','','2002','100','100','Credit Purchase',NULL,NULL,'2023-10-10',675.00,NULL,NULL),
	(5,'codesquad','','','8001','100','200','MDD Supplier',NULL,NULL,'2023-10-12',-1200.00,NULL,NULL),
	(6,'codesquad','','','2002','100','100','Credit Purchase',NULL,NULL,'2023-10-12',1500.00,NULL,NULL),
	(7,'codesquad','','','8001','101','200','IT Supplier',NULL,NULL,'2023-10-12',-300.00,NULL,NULL),
	(8,'codesquad','','','8002','200','100','ABC Company',NULL,NULL,'2023-10-13',64.50,NULL,NULL),
	(9,'codesquad','','','2001','100','100','Credit Sales',NULL,NULL,'2023-10-13',-64.50,NULL,NULL),
	(10,'codesquad','','','8001','100','200','MDD Supplier',NULL,NULL,'2023-10-14',12.00,NULL,NULL),
	(11,'codesquad','','','2004','100','100','Purchase Return Outward',NULL,NULL,'2023-10-14',-12.00,NULL,NULL),
	(12,'codesquad','','','8001','101','200','IT Supplier',NULL,NULL,'2023-10-15',-2600.00,NULL,NULL),
	(13,'codesquad','','','4002','101','600','Office Computer',NULL,NULL,'2023-10-15',2600.00,NULL,NULL),
	(14,'codesquad','','','8002','200','100','ABC Company',NULL,NULL,'2023-10-15',3600.00,NULL,NULL),
	(15,'codesquad','','','2001','100','100','Credit Sales',NULL,NULL,'2023-10-15',-6856.00,NULL,NULL),
	(16,'codesquad','','','8002','202','100','DEF Company',NULL,NULL,'2023-10-15',3256.00,NULL,NULL),
	(17,'codesquad','','','8001','100','200','MDD Supplier',NULL,NULL,'2023-10-18',-12.90,NULL,NULL),
	(18,'codesquad','','','2003','100','100','Sales Return Inward',NULL,NULL,'2023-10-18',12.90,NULL,NULL);

/*!40000 ALTER TABLE `glTxn` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagePath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_uploaded` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;

INSERT INTO `image` (`id`, `companyID`, `imageID`, `imagePath`, `date_uploaded`)
VALUES
	(1,'codesquad','codesquad-pilose.png','/public/uploads',NULL),
	(3,'codesquad','codesquad-bakuteh.png','/public/uploads','2021-12-03'),
	(4,'codesquad','codesquad-barbury.png','/public/uploads','2021-12-03'),
	(5,'codesquad','codesquad-sengkee.png','/public/uploads','2021-12-03'),
	(6,'codesquad','codesquad-bioplastfab.png','/public/uploads','2021-12-03'),
	(7,'codesquad','codesquad-chicken_soup.png','/public/uploads','2021-12-03'),
	(8,'codesquad','codesquad-GLUCOSD.png','/public/uploads','2021-12-03'),
	(9,'codesquad','codesquad-kuching_laska.png','/public/uploads','2021-12-03'),
	(10,'codesquad','codesquad-chrysannthermum.png','/public/uploads','2021-12-16'),
	(11,'codesquad','codesquad-biopadhs1105.png','/public/uploads','2021-12-28'),
	(12,'codesquad','codesquad-biopadplaster.png','/public/uploads','2021-12-28'),
	(14,'codesquad','codesquad-wahkee.png','/public/uploads','2021-12-30'),
	(15,'codesquad','codesquad-white_pepper.png','/public/uploads','2021-12-30'),
	(16,'codesquad','codesquad-lotus_seed.png','/public/uploads','2021-12-30'),
	(17,'codesquad','codesquad-IMG-20181009-WA0021.jpg','/public/uploads','2022-04-12'),
	(18,'codesquad','codesquad-63599-10798794.jpg','/public/uploads','2022-04-12'),
	(19,'codesquad','codesquad-favicon.ico','/public/uploads','2023-01-03'),
	(21,'codesquad','codesquad-generated.json','/public/uploads','2023-01-03'),
	(29,'codesquad','codesquad-gluco-c.png','/public/uploads','2023-01-04'),
	(30,'codesquad','codesquad-zhunion_logo.png','/public/uploads','2023-01-04'),
	(31,'codesquad','codesquad-company.png','/public/uploads','2023-01-04');

/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table incomeSummary
# ------------------------------------------------------------

DROP TABLE IF EXISTS `incomeSummary`;

CREATE TABLE `incomeSummary` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` char(60) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `startDate` date DEFAULT '0000-00-00',
  `endDate` date DEFAULT '0000-00-00',
  `beforeTax` double(15,2) DEFAULT '0.00',
  `tax` double(15,2) DEFAULT '0.00',
  `afterTax` double(15,2) DEFAULT '0.00',
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `incomeSummary` WRITE;
/*!40000 ALTER TABLE `incomeSummary` DISABLE KEYS */;

INSERT INTO `incomeSummary` (`id`, `companyID`, `year`, `startDate`, `endDate`, `beforeTax`, `tax`, `afterTax`, `date_created`)
VALUES
	(15,'codesquad',2023,'2023-01-01','2023-12-31',1941.70,0.00,1941.70,'2023-10-31');

/*!40000 ALTER TABLE `incomeSummary` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table incomeTax
# ------------------------------------------------------------

DROP TABLE IF EXISTS `incomeTax`;

CREATE TABLE `incomeTax` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` char(30) DEFAULT NULL,
  `category` char(2) DEFAULT '',
  `incomeFrom` double(15,2) DEFAULT '0.00',
  `incomeTo` double(15,2) DEFAULT '0.00',
  `calFirst` double(15,2) DEFAULT '0.00',
  `calNext` double(15,2) DEFAULT '0.00',
  `rate` float(5,2) DEFAULT '0.00',
  `tax` double(15,2) DEFAULT '0.00',
  `nextTax` double(15,2) DEFAULT '0.00',
  `year` int(4) DEFAULT '0',
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `incomeTax` WRITE;
/*!40000 ALTER TABLE `incomeTax` DISABLE KEYS */;

INSERT INTO `incomeTax` (`id`, `companyID`, `category`, `incomeFrom`, `incomeTo`, `calFirst`, `calNext`, `rate`, `tax`, `nextTax`, `year`, `date_created`)
VALUES
	(228,'codesquad','A',0.00,5000.00,2500.00,0.00,0.00,0.00,0.00,2023,'2023-08-17'),
	(229,'codesquad','B',5001.00,20000.00,5000.00,1500.00,1.00,0.00,150.00,2023,'2023-08-17'),
	(230,'codesquad','C',20001.00,35000.00,20000.00,15000.00,3.00,150.00,450.00,2023,'2023-08-17'),
	(231,'codesquad','D',35001.00,50000.00,50000.00,20000.00,14.00,600.00,1200.00,2023,'2023-08-17'),
	(232,'codesquad','E',50001.00,70000.00,50000.00,20000.00,14.00,1800.00,2800.00,2023,'2023-08-17'),
	(233,'codesquad','F',70001.00,100000.00,70000.00,30000.00,21.00,4600.00,6300.00,2023,'2023-08-17'),
	(234,'codesquad','G',100001.00,250000.00,100000.00,150000.00,24.00,10950.00,36000.00,2023,'2023-08-17'),
	(235,'codesquad','H',250001.00,400000.00,250000.00,150000.00,24.50,46900.00,36750.00,2023,'2023-08-17'),
	(236,'codesquad','I',400001.00,600000.00,400000.00,200000.00,25.00,83650.00,50000.00,2023,'2023-08-17'),
	(237,'codesquad','J',6000010.00,1000000.00,600000.00,400000.00,26.00,133650.00,10400.00,2023,'2023-08-17'),
	(238,'codesquad','K',1000000.00,10000000.00,1000000.00,10000000.00,28.00,237650.00,0.00,2023,'2023-08-17');

/*!40000 ALTER TABLE `incomeTax` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoiceTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoiceTxn`;

CREATE TABLE `invoiceTxn` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suppCustID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suppCustName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnType` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invType` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pur_sal` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiptNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `txnParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceTotal` double(15,2) DEFAULT NULL,
  `discountTotal` double(15,2) DEFAULT NULL,
  `taxID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(15,2) DEFAULT '0.00',
  `taxTotal` double(15,2) DEFAULT '0.00',
  `drAmt` double(15,2) DEFAULT '0.00',
  `crAmt` double(15,2) DEFAULT '0.00',
  `date_created` date DEFAULT NULL,
  `term` double(15,2) DEFAULT '0.00',
  `dueDate` date DEFAULT NULL,
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `invoiceTxn` WRITE;
/*!40000 ALTER TABLE `invoiceTxn` DISABLE KEYS */;

INSERT INTO `invoiceTxn` (`id`, `companyID`, `suppCustID`, `suppCustName`, `txnType`, `invType`, `pur_sal`, `documentNo`, `receiptNo`, `jvInit`, `voucherNo`, `invoiceNo`, `txnDate`, `txnParticular`, `invoiceTotal`, `discountTotal`, `taxID`, `taxRate`, `taxTotal`, `drAmt`, `crAmt`, `date_created`, `term`, `dueDate`, `status`, `cost`)
VALUES
	(170,'codesquad','DEF','DEF Company','PURCHASE','PUR','P','',NULL,'2310','2310-1','1234','2023-10-10','Puchase Invoice',675.00,0.00,'',0.00,0.00,0.00,675.00,'2023-10-10',60.00,NULL,NULL,NULL),
	(171,'codesquad','MDD','MDD SUpplier','PURCHASE','PUR','P','',NULL,'2310','2310-2','2023-000001','2023-10-12','Puchase Invoice',1200.00,0.00,'',0.00,0.00,0.00,1200.00,'2023-10-12',90.00,NULL,NULL,NULL),
	(172,'codesquad','IT','IT Supplier','PURCHASE','PUR','P','',NULL,'2310','2310-3','2023-1','2023-10-12','Puchase Invoice',300.00,0.00,'',0.00,0.00,0.00,300.00,'2023-10-12',40.00,NULL,NULL,NULL),
	(173,'codesquad','ABC','ABC COmpany','SALES','SAL','S','',NULL,'2023','2310-4','2023-1','2023-10-13','Sales Invoice',64.50,0.00,'',0.00,0.00,64.50,0.00,'2023-10-13',90.00,NULL,NULL,6.45),
	(174,'codesquad','MDD','MDD SUpplier','RETURN NOTE','PRN','P','PRN-123',NULL,'2310','2310-5','2023-000001','2023-10-14','Purchase Invoice Goods Return Note',12.00,0.00,'FOT',0.00,0.00,0.00,12.00,'2023-10-14',0.00,NULL,NULL,NULL),
	(175,'codesquad','IT','IT Supplier','PURCHASE','PUR','P','',NULL,'2310','2310-6','654321','2023-10-15','Puchase Invoice',2600.00,0.00,'',0.00,0.00,0.00,2600.00,'2023-10-15',40.00,NULL,NULL,NULL),
	(176,'codesquad','ABC','ABC COmpany','SALES','SAL','S','',NULL,'2023','2310-7','2023-2','2023-10-15','Sales Invoice',3600.00,0.00,'',0.00,0.00,3600.00,0.00,'2023-10-15',90.00,NULL,NULL,0.00),
	(177,'codesquad','DEF','DEF Company','SALES','SAL','S','',NULL,'2023','2310-8','2023-3','2023-10-15','Sales Invoice',3256.00,0.00,'',0.00,0.00,3256.00,0.00,'2023-10-15',60.00,NULL,NULL,0.00),
	(178,'codesquad','MDD','MDD SUpplier','RETURN NOTE','SRN','S','RTN00012',NULL,'2310','2310-9','2023-1','2023-10-18','Sales Invoice Goods Return Note',12.90,0.00,'FOT',0.00,0.00,0.00,12.90,'2023-10-18',0.00,NULL,NULL,NULL);

/*!40000 ALTER TABLE `invoiceTxn` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table jeTmp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jeTmp`;

CREATE TABLE `jeTmp` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vouchNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drAmt` double(15,2) DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `crAmt` double(15,2) DEFAULT NULL,
  `user` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table journal
# ------------------------------------------------------------

DROP TABLE IF EXISTS `journal`;

CREATE TABLE `journal` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `drAmt` double(15,2) DEFAULT NULL,
  `crAmt` double(15,2) DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `voucherType` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `totalDrAmt` double(15,2) DEFAULT NULL,
  `totalCrAmt` double(15,2) DEFAULT NULL,
  `opBal` double(15,2) DEFAULT NULL,
  `curBal` double(15,2) DEFAULT NULL,
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;

INSERT INTO `journal` (`id`, `companyID`, `glNo`, `glSub`, `department`, `glName`, `glDescription`, `jeParticular`, `jvInit`, `voucherNo`, `drAmt`, `crAmt`, `userName`, `txnDate`, `voucherType`, `date_created`, `totalDrAmt`, `totalCrAmt`, `opBal`, `curBal`, `status`)
VALUES
	(7,'codesquad','8002','202','100','DEF Company',NULL,'Wholeseller Customer','2310','2310-1',0.00,675.00,'undefined','2023-10-10','JV','2023-10-10',NULL,NULL,NULL,NULL,NULL),
	(8,'codesquad','2002','100','100','Credit Purchase',NULL,'Credit Purchase from Supplier','2310','2310-1',675.00,0.00,'undefined','2023-10-10','JV','2023-10-10',NULL,NULL,NULL,NULL,NULL),
	(9,'codesquad','8001','100','200','MDD Supplier',NULL,'Medication and Helth Foods Supplier','2310','2310-2',0.00,1200.00,'undefined','2023-10-12','JV','2023-10-12',NULL,NULL,NULL,NULL,NULL),
	(10,'codesquad','2002','100','100','Credit Purchase',NULL,'Credit Purchase from Supplier','2310','2310-2',1200.00,0.00,'undefined','2023-10-12','JV','2023-10-12',NULL,NULL,NULL,NULL,NULL),
	(11,'codesquad','8001','101','200','IT Supplier',NULL,'IT Product Supplier','2310','2310-3',0.00,300.00,'undefined','2023-10-12','JV','2023-10-12',NULL,NULL,NULL,NULL,NULL),
	(12,'codesquad','2002','100','100','Credit Purchase',NULL,'Credit Purchase from Supplier','2310','2310-3',300.00,0.00,'undefined','2023-10-12','JV','2023-10-12',NULL,NULL,NULL,NULL,NULL),
	(13,'codesquad','8002','200','100','ABC Company',NULL,'Retail CUstomer','2310','2310-4',64.50,0.00,'Percy Lim','2023-10-13','JV','2023-10-13',NULL,NULL,NULL,NULL,NULL),
	(14,'codesquad','2001','100','100','Credit Sales',NULL,'Credit Sales on customer','2310','2310-4',0.00,64.50,'Percy Lim','2023-10-13','JV','2023-10-13',NULL,NULL,NULL,NULL,NULL),
	(15,'codesquad','8001','100','200','MDD Supplier',NULL,'Medication and Helth Foods Supplier','2310','2310-5',12.00,0.00,'undefined','2023-10-14','JV','2023-10-14',NULL,NULL,NULL,NULL,NULL),
	(16,'codesquad','2004','100','100','Purchase Return Outward',NULL,'Purchase Return Outward','2310','2310-5',0.00,12.00,'undefined','2023-10-14','JV','2023-10-14',NULL,NULL,NULL,NULL,NULL),
	(17,'codesquad','8001','101','200','IT Supplier',NULL,'IT Product Supplier','2310','2310-6',0.00,2600.00,'undefined','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(18,'codesquad','4002','101','600','Office Computer',NULL,'Office Computer','2310','2310-6',2600.00,0.00,'undefined','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(19,'codesquad','3001','102','100','Stationeries',NULL,'Stationery for Admin Department','','PV1234',100.00,0.00,'Percy Lim','2023-10-14','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(20,'codesquad','4001','100','100','Cash on Hand',NULL,'Stationery for Admin Department','','PV1234',0.00,100.00,'Percy Lim','2023-10-14','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(21,'codesquad','8002','200','100','ABC Company',NULL,'Retail CUstomer','2310','2310-7',3600.00,0.00,'Percy Lim','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(22,'codesquad','2001','100','100','Credit Sales',NULL,'Credit Sales on customer','2310','2310-7',0.00,3600.00,'Percy Lim','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(23,'codesquad','8002','202','100','DEF Company',NULL,'Wholeseller Customer','2310','2310-8',3256.00,0.00,'Percy Lim','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(24,'codesquad','2001','100','100','Credit Sales',NULL,'Credit Sales on customer','2310','2310-8',0.00,3256.00,'Percy Lim','2023-10-15','JV','2023-10-15',NULL,NULL,NULL,NULL,NULL),
	(27,'codesquad','8001','100','200','MDD Supplier',NULL,'Medication and Helth Foods Supplier','2310','2310-9',0.00,12.90,'undefined','2023-10-18','JV','2023-10-18',NULL,NULL,NULL,NULL,NULL),
	(28,'codesquad','2003','100','100','Sales Return Inward',NULL,'Sales Return Inward','2310','2310-9',12.90,0.00,'undefined','2023-10-18','JV','2023-10-18',NULL,NULL,NULL,NULL,NULL),
	(29,'codesquad','2005','100','100','Retal Receiving',NULL,'Retal Received on Oct 2023','','RV3577',0.00,2000.00,'Percy Lim','2023-10-18','JV','2023-10-19',NULL,NULL,NULL,NULL,NULL),
	(30,'codesquad','4001','300','682','RHB Bank Account',NULL,'Retal Received on Oct 2023','','RV3577',2000.00,0.00,'Percy Lim','2023-10-18','JV','2023-10-19',NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table journalChange
# ------------------------------------------------------------

DROP TABLE IF EXISTS `journalChange`;

CREATE TABLE `journalChange` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `glDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drAmt` double(15,2) DEFAULT NULL,
  `crAmt` double(15,2) DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` date DEFAULT NULL,
  `voucherType` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userChange` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateChange` date DEFAULT NULL,
  `status` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reasons` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table jvInit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jvInit`;

CREATE TABLE `jvInit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `voucherNo` int(10) NOT NULL,
  `jvType` char(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` double(15,2) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `categoryID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` double(15,3) DEFAULT NULL,
  `balance` double(15,3) DEFAULT NULL,
  `stockLocation` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnQtyOut` double(15,3) DEFAULT '0.000',
  `opBalance` double(15,3) DEFAULT NULL,
  `txnQtyIn` double(15,3) DEFAULT '0.000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `companyID`, `productID`, `sku`, `barcode`, `productName`, `description`, `unit`, `unitPrice`, `date_created`, `categoryID`, `cost`, `balance`, `stockLocation`, `productImage`, `txnQtyOut`, `opBalance`, `txnQtyIn`)
VALUES
	(2,'codesquad','BARBURY','898772','1234567890123','Golden Deer Buabury health product','120gm / pack','pack',12.00,'2021-12-27','30002',12.000,0.000,NULL,'codesquad-barbury.png',0.000,200.000,0.000),
	(3,'codesquad','BIOPLUS','17171005','17172233569024','Bioplus plaster','60 pcs / box','box',12.54,'2021-12-28','70001',12.540,0.000,NULL,'codesquad-biopadplaster.png',0.000,500.000,0.000),
	(4,'codesquad','GLUCOSED','987773','123456789012333','Glucose-D Glucose','10x20gm pack','pack',36.00,'2021-12-28','30002',7.300,0.000,NULL,'codesquad-GLUCOSD.png',0.000,300.000,0.000),
	(5,'codesquad','SENGKEE','172883','1234567890123','Jin Lu Brand Seng Kee Tang','30gm / pack','pack',12.00,'2021-12-28','30002',4.800,0.000,NULL,'codesquad-sengkee.png',0.000,600.000,0.000),
	(6,'codesquad','LAKSA','367882','1234567890123','Golden Deer Kuching Laksa','50gm','pack',6.45,'2021-12-28','30002',6.450,0.000,NULL,'codesquad-kuching_laska.png',0.000,400.000,0.000),
	(7,'codesquad','BUBARY','1234567','1234567890123','Golden Deer Buabury health product','120gm / pack','pack',12.39,'2021-12-28','10001',7.000,0.000,NULL,'codesquad-barbury.png',0.000,100.000,0.000),
	(8,'codesquad','BIOPLASTWOUND','8988844','1234567890123','Bioplast Wound Dressing','100pcs','box',11.00,'2021-12-28','70001',6.000,0.000,NULL,'codesquad-biopadhs1105.png',0.000,400.000,0.000),
	(9,'codesquad','BIOPLAST1105','123456','123456789012333','Bioplast 1105 plaster','100pcs','box',12.00,'2021-12-28','10001',12.000,0.000,NULL,'codesquad-bakuteh.png',0.000,300.000,0.000),
	(10,'codesquad','LOTUS_SEED','17171005','17172233569024','Jin Lu Brand Lotus Seed','105gm','packs',3.00,'2021-12-30','30002',3.000,0.000,NULL,'codesquad-lotus_seed.png',0.000,500.000,0.000),
	(11,'codesquad','WHITEPEPPER','1290001','18992888822','Golden Deer Sarawak White Pepper','50gm','pack',32.56,'2021-12-31','30002',1.300,0.000,NULL,'codesquad-white_pepper.png',0.000,1000.000,0.000),
	(12,'codesquad','BAKUTEH','1273888','23893899799','Golden Deer Bakuteh','50gm','pack',6.75,'2021-12-31','30002 Preserved Foods',6.750,0.000,NULL,'codesquad-bakuteh.png',0.000,100.000,0.000),
	(30,'codesquad','GLUCOD-C','GLUKOD-20-233','485999222','Glucod  C vita ','Golden Deer  health product','pack',23.00,'2023-01-03','70001 Medical Products',4.000,0.000,NULL,'codesquad-bioplastfab.png',0.000,200.000,0.000),
	(31,'codesquad','GLUCO-D','47858999','4988888','Glucose powder','Glucose Powder D','BAG',60.00,'2023-10-30','100',NULL,NULL,NULL,'codesquad-GLUCOSD.png',0.000,0.000,0.000);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table productTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `productTxn`;

CREATE TABLE `productTxn` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` double(15,3) DEFAULT '0.000',
  `LocationID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnType` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnQtyIn` double(15,3) unsigned DEFAULT '0.000',
  `txnQtyOut` double(15,3) DEFAULT '0.000',
  `txnTotal` double(15,3) DEFAULT '0.000',
  `txnDate` date DEFAULT NULL,
  `txnParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suppCustID` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `curBal` double(15,3) DEFAULT '0.000',
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `productTxn` WRITE;
/*!40000 ALTER TABLE `productTxn` DISABLE KEYS */;

INSERT INTO `productTxn` (`id`, `companyID`, `productID`, `sku`, `barcode`, `productName`, `invoiceNo`, `unit`, `unitPrice`, `LocationID`, `txnType`, `txnQtyIn`, `txnQtyOut`, `txnTotal`, `txnDate`, `txnParticular`, `document`, `suppCustID`, `voucherNo`, `date_created`, `curBal`, `status`)
VALUES
	(77,'codesquad','BAKUTEH','','23893899799','Golden Deer Bakuteh','1234','pack',6.750,'','PURCHASE',100.000,0.000,675.000,'2023-10-10','Puchase Invoice','','DEF','2310-1','2023-10-10',0.000,NULL),
	(78,'codesquad','BIOPLAST1105','','123456789012333','Bioplast 1105 plaster','2023-000001','box',12.000,'','PURCHASE',100.000,0.000,1200.000,'2023-10-12','Puchase Invoice','','MDD','2310-2','2023-10-12',0.000,NULL),
	(79,'codesquad','LOTUS_SEED','','17172233569024','Jin Lu Brand Lotus Seed','2023-1','packs',3.000,'','PURCHASE',100.000,0.000,300.000,'2023-10-12','Puchase Invoice','','IT','2310-3','2023-10-12',0.000,NULL),
	(80,'codesquad','LAKSA','','1234567890123','Golden Deer Kuching Laksa','2023-1','pack',6.450,'','SALES',0.000,10.000,64.500,'2023-10-13','Sales Invoice','','ABC','2310-4','2023-10-13',0.000,NULL),
	(81,'codesquad','BIOPLAST1105','','123456789012333','Bioplast 1105 plaster','2023-000001','box',12.000,'','RETURN NOTE',0.000,1.000,12.000,'2023-10-14','Goods return outward','','MDD','2310-5','2023-10-14',0.000,NULL),
	(82,'codesquad','GLUCOSED','','123456789012333','Glucose-D Glucose','2023-2','pack',36.000,'','SALES',0.000,100.000,3600.000,'2023-10-15','Sales Invoice','','ABC','2310-7','2023-10-15',0.000,NULL),
	(83,'codesquad','WHITEPEPPER','','18992888822','Golden Deer Sarawak White Pepper','2023-3','pack',32.560,'','SALES',0.000,100.000,3256.000,'2023-10-15','Sales Invoice','','DEF','2310-8','2023-10-15',0.000,NULL),
	(84,'codesquad','LAKSA','','1234567890123','Golden Deer Kuching Laksa','2023-1','pack',6.450,'','RETURN NOTE',0.000,2.000,12.900,'2023-10-18','Return for exchange','','MDD','2310-9','2023-10-18',0.000,NULL),
	(85,'codesquad','BAKUTEH','1273888','23893899799','Golden Deer Bakuteh',NULL,'pack',6.750,NULL,'ADJUSTMENT',10.000,0.000,0.000,'2023-10-30','Adjust on hand quantity afer stock take',NULL,NULL,NULL,'2023-10-30',0.000,NULL);

/*!40000 ALTER TABLE `productTxn` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table profitAndLoss
# ------------------------------------------------------------

DROP TABLE IF EXISTS `profitAndLoss`;

CREATE TABLE `profitAndLoss` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` char(30) DEFAULT NULL,
  `year` int(5) DEFAULT '0',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `addNo` varchar(30) DEFAULT '',
  `glName` varchar(255) DEFAULT '',
  `totalText` varchar(255) DEFAULT '',
  `amount` double(15,2) DEFAULT '0.00',
  `date_close` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `PNLType` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `profitAndLoss` WRITE;
/*!40000 ALTER TABLE `profitAndLoss` DISABLE KEYS */;

INSERT INTO `profitAndLoss` (`id`, `companyID`, `year`, `startDate`, `endDate`, `addNo`, `glName`, `totalText`, `amount`, `date_close`, `date_created`, `PNLType`)
VALUES
	(1004,'codesquad',2023,'2023-01-01','2023-12-31','','Credit Sales','',6920.50,'2023-10-31','2023-10-31','REV'),
	(1005,'codesquad',2023,'2023-01-01','2023-12-31','Less :','Sales Return Inward','',12.90,'2023-10-31','2023-10-31','REV'),
	(1006,'codesquad',2023,'2023-01-01','2023-12-31','','Retal Receiving','',2000.00,'2023-10-31','2023-10-31','REV'),
	(1007,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL REVENUE :',8907.60,'2023-10-31','2023-10-31','REV'),
	(1008,'codesquad',2023,'2023-01-01','2023-12-31','','COST OF SALES','RM',0.00,'2023-10-31','2023-10-31','COST'),
	(1009,'codesquad',2023,'2023-01-01','2023-12-31','','Inventory Opening Balance','',27295.00,'2023-10-31','2023-10-31','COST'),
	(1010,'codesquad',2023,'2023-01-01','2023-12-31','Add :','Purchases','',2175.00,'2023-10-31','2023-10-31','COST'),
	(1011,'codesquad',2023,'2023-01-01','2023-12-31','Less :','Purchase Return Outward','',12.00,'2023-10-31','2023-10-31','COST'),
	(1012,'codesquad',2023,'2023-01-01','2023-12-31','Less :','Purchase Debit / Discount Received','',0.00,'2023-10-31','2023-10-31','COST'),
	(1013,'codesquad',2023,'2023-01-01','2023-12-31','Less :','Inventory Closing Balance','',22592.10,'2023-10-31','2023-10-31','COST'),
	(1014,'codesquad',2023,'2023-01-01','2023-12-31','','','GROSS PROFIT :',2041.70,'2023-10-31','2023-10-31','COST'),
	(1015,'codesquad',2023,'2023-01-01','2023-12-31','','','GROSS PROFIT MARGIN :',0.23,'2023-10-31','2023-10-31','COST'),
	(1016,'codesquad',2023,'2023-01-01','2023-12-31','','EXPENDITURE','RM',0.00,'2023-10-31','2023-10-31','EXP'),
	(1017,'codesquad',2023,'2023-01-01','2023-12-31','','Stationeries','',100.00,'2023-10-31','2023-10-31','EXP'),
	(1018,'codesquad',2023,'2023-01-01','2023-12-31','','','TOTAL EXPENSES :',8907.60,'2023-10-31','2023-10-31','EXP'),
	(1019,'codesquad',2023,'2023-01-01','2023-12-31','','','NET PROFIT/(LOSS) BEFORE TAX :',1941.70,'2023-10-31','2023-10-31','EXP'),
	(1020,'codesquad',2023,'2023-01-01','2023-12-31','','','LESS TAX FOR THE YEAR :',0.00,'2023-10-31','2023-10-31','EXP'),
	(1021,'codesquad',2023,'2023-01-01','2023-12-31','','','NET PROFIT AFTER TAX :',1941.70,'2023-10-31','2023-10-31','EXP');

/*!40000 ALTER TABLE `profitAndLoss` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table purchaseInvoice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `purchaseInvoice`;

CREATE TABLE `purchaseInvoice` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` date DEFAULT NULL,
  `productID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseQty` double(15,3) DEFAULT NULL,
  `unitPrice` double(15,3) DEFAULT NULL,
  `discountPercent` double(5,2) DEFAULT NULL,
  `unitDiscount` double(5,2) DEFAULT NULL,
  `itemDiscount` double(15,3) DEFAULT NULL,
  `invType` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxCode` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(5,2) DEFAULT NULL,
  `itemTotal` double(15,3) DEFAULT NULL,
  `itemTaxTotal` double(15,3) DEFAULT NULL,
  `itemNetTotal` double(15,3) DEFAULT NULL,
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `purchaseInvoice` WRITE;
/*!40000 ALTER TABLE `purchaseInvoice` DISABLE KEYS */;

INSERT INTO `purchaseInvoice` (`id`, `companyID`, `supplierID`, `supplierName`, `invoiceNo`, `invoiceDate`, `productID`, `barcode`, `productName`, `productDescription`, `unit`, `purchaseQty`, `unitPrice`, `discountPercent`, `unitDiscount`, `itemDiscount`, `invType`, `taxID`, `taxType`, `taxCode`, `taxRate`, `itemTotal`, `itemTaxTotal`, `itemNetTotal`, `voucherNo`, `jvInit`, `date_created`, `userName`)
VALUES
	(33,'codesquad','DEF','DEF Company','1234','2023-10-10','BAKUTEH','23893899799','Golden Deer Bakuteh','','pack',100.000,6.750,NULL,NULL,0.000,'PUR','FOT','FOT','FOT',0.00,675.000,0.000,675.000,'2310-1','2310','2023-10-10',NULL),
	(34,'codesquad','MDD','MDD SUpplier','2023-000001','2023-10-12','BIOPLAST1105','123456789012333','Bioplast 1105 plaster','','box',100.000,12.000,NULL,NULL,0.000,'PUR','FOT','FOT','FOT',0.00,1200.000,0.000,1200.000,'2310-2','2310','2023-10-12',NULL),
	(35,'codesquad','IT','IT Supplier','2023-1','2023-10-12','LOTUS_SEED','17172233569024','Jin Lu Brand Lotus Seed','','packs',100.000,3.000,NULL,NULL,0.000,'PUR','FOT','FOT','FOT',0.00,300.000,0.000,300.000,'2310-3','2310','2023-10-12',NULL),
	(36,'codesquad','IT','IT Supplier','654321','2023-10-15','*','','Office Computers','','unit',2.000,1300.000,NULL,NULL,0.000,'PUR','FOT','FOT','FOT',0.00,2600.000,0.000,2600.000,'2310-6','2310','2023-10-15',NULL);

/*!40000 ALTER TABLE `purchaseInvoice` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table purchaseInvoiceChange
# ------------------------------------------------------------

DROP TABLE IF EXISTS `purchaseInvoiceChange`;

CREATE TABLE `purchaseInvoiceChange` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` date DEFAULT NULL,
  `productID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseQty` double(15,3) DEFAULT NULL,
  `unitPrice` double(15,3) DEFAULT NULL,
  `discountPercent` double(5,2) DEFAULT NULL,
  `unitDiscount` double(5,2) DEFAULT NULL,
  `itemDiscount` double(15,3) DEFAULT NULL,
  `invType` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxCode` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(5,2) DEFAULT NULL,
  `itemTotal` double(15,3) DEFAULT NULL,
  `itemTaxTotal` double(15,3) DEFAULT NULL,
  `itemNetTotal` double(15,3) DEFAULT NULL,
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `dateChange` date DEFAULT NULL,
  `userChange` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reasons` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table salesInvoice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `salesInvoice`;

CREATE TABLE `salesInvoice` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `invPosted` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceType` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` date DEFAULT NULL,
  `productID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salesQty` double(15,3) DEFAULT NULL,
  `unitPrice` double(15,3) DEFAULT NULL,
  `discountPercent` double(5,2) DEFAULT NULL,
  `itemDiscount` double(5,2) DEFAULT NULL,
  `taxID` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxCode` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(5,2) DEFAULT '0.00',
  `itemTotal` double(15,3) DEFAULT '0.000',
  `taxItemTotal` double(15,3) DEFAULT '0.000',
  `itemNetTotal` double(15,3) DEFAULT '0.000',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` int(5) DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `salesRep` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `txnDate` date NOT NULL,
  `itemTax` double(15,2) NOT NULL,
  `salesQuantity` double(15,3) NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `salesInvoice` WRITE;
/*!40000 ALTER TABLE `salesInvoice` DISABLE KEYS */;

INSERT INTO `salesInvoice` (`id`, `invPosted`, `companyID`, `customerID`, `customerName`, `invoiceType`, `jvInit`, `invoiceNo`, `invoiceDate`, `productID`, `barcode`, `productName`, `productDescription`, `unit`, `salesQty`, `unitPrice`, `discountPercent`, `itemDiscount`, `taxID`, `taxType`, `taxCode`, `taxRate`, `itemTotal`, `taxItemTotal`, `itemNetTotal`, `remark`, `voucherNo`, `term`, `dueDate`, `date_created`, `salesRep`, `remark1`, `remark2`, `remark3`, `remark4`, `remark5`, `remark6`, `txnDate`, `itemTax`, `salesQuantity`, `userName`, `status`, `cost`)
VALUES
	(35,NULL,'codesquad','ABC','ABC COmpany','','2023','2023-1','2023-10-13','LAKSA','1234567890123','Golden Deer Kuching Laksa','','pack',10.000,6.450,NULL,0.00,'FOT','FOT','FOT',0.00,64.500,0.000,64.500,NULL,'2310-4',NULL,'0000-00-00','2023-10-13','','1. Any discrepancy to notify Code Squad Technology','2. Goods sold are not returnable','3. Interest will be charged at 1.5% per month for all overdue account','4. Payment should be made to Code Squad Technology','5. RHB Bank Account No, 1234566. ','6. Payment by bank cheque, cash or bank transfer are acceptable','0000-00-00',0.00,0.000,NULL,NULL,6.45),
	(36,NULL,'codesquad','ABC','ABC COmpany','','2023','2023-2','2023-10-15','GLUCOSED','123456789012333','Glucose-D Glucose','','pack',100.000,36.000,NULL,0.00,'FOT','FOT','FOT',0.00,3600.000,0.000,3600.000,NULL,'2310-7',NULL,'0000-00-00','2023-10-15','','1. Any discrepancy to notify Code Squad Technology','2. Goods sold are not returnable','3. Interest will be charged at 1.5% per month for all overdue account','4. Payment should be made to Code Squad Technology','5. RHB Bank Account No, 1234566. ','6. Payment by bank cheque, cash or bank transfer are acceptable','0000-00-00',0.00,0.000,NULL,NULL,0.00),
	(37,NULL,'codesquad','DEF','DEF Company','','2023','2023-3','2023-10-15','WHITEPEPPER','18992888822','Golden Deer Sarawak White Pepper','','pack',100.000,32.560,NULL,0.00,'FOT','FOT','FOT',0.00,3256.000,0.000,3256.000,NULL,'2310-8',NULL,'0000-00-00','2023-10-15','','1. Any discrepancy to notify Code Squad Technology','2. Goods sold are not returnable','3. Interest will be charged at 1.5% per month for all overdue account','4. Payment should be made to Code Squad Technology','5. RHB Bank Account No, 1234566. ','6. Payment by bank cheque, cash or bank transfer are acceptable','0000-00-00',0.00,0.000,NULL,NULL,0.00);

/*!40000 ALTER TABLE `salesInvoice` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table salesInvoiceChange
# ------------------------------------------------------------

DROP TABLE IF EXISTS `salesInvoiceChange`;

CREATE TABLE `salesInvoiceChange` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `invPosted` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceType` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `jvInit` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` date DEFAULT NULL,
  `productID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salesQty` double(15,3) DEFAULT NULL,
  `unitPrice` double(15,3) DEFAULT NULL,
  `discountPercent` double(5,2) DEFAULT NULL,
  `itemDiscount` double(5,2) DEFAULT NULL,
  `taxID` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxCode` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(5,2) DEFAULT '0.00',
  `itemTotal` double(15,3) DEFAULT '0.000',
  `taxItemTotal` double(15,3) DEFAULT '0.000',
  `itemNetTotal` double(15,3) DEFAULT '0.000',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` int(5) DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `salesRep` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `txnDate` date NOT NULL,
  `itemTax` double(15,2) NOT NULL,
  `salesQuantity` double(15,3) NOT NULL,
  `dateChange` date DEFAULT NULL,
  `userChange` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `reasons` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table socso
# ------------------------------------------------------------

DROP TABLE IF EXISTS `socso`;

CREATE TABLE `socso` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startSalary` double(15,2) DEFAULT NULL,
  `endSalary` double(15,2) DEFAULT NULL,
  `companyRate` double(15,2) DEFAULT NULL,
  `employeeRate` double(15,2) DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortSalary` double(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `socso` WRITE;
/*!40000 ALTER TABLE `socso` DISABLE KEYS */;

INSERT INTO `socso` (`id`, `companyID`, `startSalary`, `endSalary`, `companyRate`, `employeeRate`, `remark`, `sortSalary`)
VALUES
	(2,'codesquad',200.01,299.99,4.55,1.25,'second',200.01),
	(3,'codesquad',100.01,199.99,3.75,1.45,'First Record',100.01),
	(4,'codesquad',300.01,400.00,3.60,3.30,'testing',300.01),
	(5,'codesquad',1000.01,2000.00,1.30,1.10,'SOCSO Rating',1000.01);

/*!40000 ALTER TABLE `socso` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stockLocation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stockLocation`;

CREATE TABLE `stockLocation` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locationID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locationName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locationAddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `stockLocation` WRITE;
/*!40000 ALTER TABLE `stockLocation` DISABLE KEYS */;

INSERT INTO `stockLocation` (`id`, `companyID`, `locationID`, `locationName`, `locationAddress`, `date_created`, `remark`)
VALUES
	(1,'codesquad','1111','Main Store','3478 Jalan Tabuan','2021-12-01','Testing first location'),
	(2,'codesquad','1112','Sekama Store','123, Jalan Sekama','2021-12-01','Testing'),
	(3,'codesquad','1113','Stutong Store','2345, jalan Stutong','2021-12-01',''),
	(4,'codesquad','1214','Padugan Store','3748, jalan Padugan','2021-12-01',''),
	(5,'codesquad','1213','Grenn Store','2387, Green Road','2021-12-01',''),
	(6,'codesquad','1215','Tabuan Store','2345, jalan Stutong Tabuan','2021-12-31','');

/*!40000 ALTER TABLE `stockLocation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supp`;

CREATE TABLE `supp` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nric` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  `position` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `salary` double(15,2) DEFAULT NULL,
  `otRate` double(15,2) DEFAULT NULL,
  `payMethod` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeTaxNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epfNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socsoNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drivingLicenseNo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `childs` int(2) DEFAULT NULL,
  `employDate` date DEFAULT NULL,
  `telNo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hpNo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maritalStatus` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `race` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table suppCustAcct
# ------------------------------------------------------------

DROP TABLE IF EXISTS `suppCustAcct`;

CREATE TABLE `suppCustAcct` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acctType` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastTxnDate` date DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerm` int(10) DEFAULT NULL,
  `creditLimit` double(15,2) DEFAULT NULL,
  `opBalance` double(15,2) DEFAULT NULL,
  `currentBalance` double(15,2) DEFAULT NULL,
  `personContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `tel1` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel2` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `handPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glSub` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `suppCustAcct` WRITE;
/*!40000 ALTER TABLE `suppCustAcct` DISABLE KEYS */;

INSERT INTO `suppCustAcct` (`id`, `companyID`, `supplierID`, `supplierName`, `acctType`, `lastTxnDate`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `email`, `website`, `paymentTerm`, `creditLimit`, `opBalance`, `currentBalance`, `personContact`, `date_created`, `tel1`, `tel2`, `handPhone`, `fax`, `glNo`, `glSub`, `glType`, `companyName`)
VALUES
	(56,'codesquad','ABC','ABC COmpany','CUST',NULL,'111, Lorong 123','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia','percylim@gmail.com','',90,12000.00,NULL,NULL,'Mr, Tar','2023-10-05','+60821238882','','','','8002','200','802',NULL),
	(57,'codesquad','DEF','DEF Company','CUST',NULL,'979, Bayor Bukit Lorong 4','Tabuan Jaya','93350','Kuching','SARAWAK','Malaysia','percylim@gmail.com','',60,3400.00,NULL,NULL,'Mr .Lim','2023-10-05','+60138026481','','','','8002','202','802',NULL),
	(58,'codesquad','MDD','MDD SUpplier','SUPP',NULL,'111, Lorong 123','Jalan Tun Juga','43345','Kuching','Sarawak','Malaysia','percylim@gmail.com','',90,239910.00,NULL,NULL,'','2023-10-05','+60821238882','','','','8001','100','801',NULL),
	(59,'codesquad','IT','IT Supplier','SUPP',NULL,'979, Bayor Bukit Lorong 4','Tabuan Jaya','93350','Kuching','SARAWAK','Malaysia','percylim@gmail.com','',40,45999.00,NULL,NULL,'','2023-10-05','+60138026481','','','','8001','101','801',NULL);

/*!40000 ALTER TABLE `suppCustAcct` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tax
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tax`;

CREATE TABLE `tax` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxCode` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` double(15,2) DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `tax` WRITE;
/*!40000 ALTER TABLE `tax` DISABLE KEYS */;

INSERT INTO `tax` (`id`, `companyID`, `taxID`, `taxType`, `taxCode`, `taxDescription`, `taxRate`, `remark`, `date_created`)
VALUES
	(1,'codesquad','FOT','FOT','FOT','Tax Other Than GST',0.00,'Free From Tax Other Than GST e.g. SST and etc ','2023-04-27'),
	(16,'codesquad','GST-TX','INPUT','TX','Purchase with GST incured supplier',6.00,'Directly attributable to taxable supplies','2022-11-06'),
	(17,'codesquad','GST-IM','INPUT','IM','Import Goods with GST incurred',6.00,'','2022-11-07'),
	(18,'codesquad','GST-BL','INPUT','BL','Purchase with GST incurred but not clainable',6.00,'Disallowance of input Tax','2022-11-07'),
	(19,'codesquad','GST-IS','INPUT','IS','Import under special scheme with GST incurred',0.00,'Approvetrader scheme','2022-11-07'),
	(20,'codesquad','GST-NR','INPUT','NR','Purchase from non-GST-register supplier of input tax',0.00,'','2022-11-07'),
	(21,'codesquad','GST-ZP','INPUT','ZP','Purchase from GST registered supplier with no GST incurred',0.00,'','2022-11-09'),
	(22,'codesquad','GST-EP','INPUT','EP','Purchase  exempted fromGST',0.00,'residential properties or financial servises','2022-11-09'),
	(23,'codesquad','GST-SR','OUTPUT','SR','Standard-rated supplies with GST charged',6.00,'','2022-11-09'),
	(24,'codesquad','GST-ZRL','OUTPUT','ZRL','Local supplier of goods and service which are subject to zero rated  supplies',0.00,'','2022-12-28'),
	(25,'codesquad','GST-ZRE','OUTPUT','ZRE','Exportation goods and service which are subjected zero rated supplies',0.00,'','2022-12-28'),
	(26,'codesquad',' GST-ES43','OUTPUT','ES43','Incidental exampled supplies ',0.00,'','2022-12-28'),
	(27,'codesquad','GST-DS','OUTPUT','DS','Deemed supplies',6.00,'e.g. Gift Rules','2022-12-28'),
	(28,'codesquad',' GST-OS','OUTPUT','OS','Out of scope supplies',0.00,'','2022-12-28'),
	(29,'codesquad',' GST-ES','OUTPUT','ES','exempted sullies under GST',0.00,'','2022-12-28'),
	(30,'codesquad',' GST-RS','OUTPUT','RS','Relief supplies under GST',0.00,'','2022-12-28'),
	(31,'codesquad','GST-GS','OUTPUT','GS','Disregarded supplies',0.00,'','2022-12-28'),
	(32,'codesquad','GST-AJS','OUTPUT','AJS','Any adjustment made to output tax',0.00,'','2022-12-28');

/*!40000 ALTER TABLE `tax` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table taxTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `taxTxn`;

CREATE TABLE `taxTxn` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` char(30) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `taxType` char(10) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `taxCode` char(20) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `taxDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `itemAmount` double(15,2) DEFAULT '0.00',
  `taxRate` double(15,2) DEFAULT '0.00',
  `taxAmount` double(15,2) DEFAULT '0.00',
  `suppCustID` char(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `documentNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `documentType` char(30) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `document_date` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `status` char(10) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `purchaseTaxAmount` double(15,2) DEFAULT '0.00',
  `salesTaxAmount` double(15,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table trialBalance
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trialBalance`;

CREATE TABLE `trialBalance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `companyID` varchar(30) DEFAULT NULL,
  `year` int(5) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `glNo` varchar(10) DEFAULT NULL,
  `glSub` varchar(10) DEFAULT NULL,
  `glType` varchar(10) DEFAULT NULL,
  `glName` varchar(255) DEFAULT NULL,
  `drAmt` double(15,2) DEFAULT '0.00',
  `crAmt` double(15,2) DEFAULT '0.00',
  `date_close` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trialBalance` WRITE;
/*!40000 ALTER TABLE `trialBalance` DISABLE KEYS */;

INSERT INTO `trialBalance` (`id`, `companyID`, `year`, `startDate`, `endDate`, `glNo`, `glSub`, `glType`, `glName`, `drAmt`, `crAmt`, `date_close`, `date_created`)
VALUES
	(977,'codesquad',2023,'2023-01-01','2023-12-31','1000','100','201','Credit Sales',124721.20,0.00,'2023-09-02','2023-09-02'),
	(978,'codesquad',2023,'2023-01-01','2023-12-31','1000','104','101','Opening Stock',0.00,0.00,'2023-09-02','2023-09-02'),
	(979,'codesquad',2023,'2023-01-01','2023-12-31','1001','100','201','Credit Sales',0.00,0.00,'2023-09-02','2023-09-02'),
	(980,'codesquad',2023,'2023-01-01','2023-12-31','1020','100','102','Closing Stock',0.00,0.00,'2023-09-02','2023-09-02'),
	(981,'codesquad',2023,'2023-01-01','2023-12-31','2001','100','201','Credit Sales - 1',18.92,0.00,'2023-09-02','2023-09-02'),
	(982,'codesquad',2023,'2023-01-01','2023-12-31','2001','102','201','Credit Sales - 2',0.00,68.99,'2023-09-02','2023-09-02'),
	(983,'codesquad',2023,'2023-01-01','2023-12-31','2001','103','201','Cash Sales - 3',0.00,70.95,'2023-09-02','2023-09-02'),
	(984,'codesquad',2023,'2023-01-01','2023-12-31','2001','104','201','Credit Sales - 5',0.00,2.00,'2023-09-02','2023-09-02'),
	(985,'codesquad',2023,'2023-01-01','2023-12-31','2002','101','202','Cash Purchase',0.00,272.03,'2023-09-02','2023-09-02'),
	(986,'codesquad',2023,'2023-01-01','2023-12-31','2002','102','202','Credit Purchase',5286.95,0.00,'2023-09-02','2023-09-02'),
	(987,'codesquad',2023,'2023-01-01','2023-12-31','2002','105','204','Goods Return Outward',0.00,0.00,'2023-09-02','2023-09-02'),
	(988,'codesquad',2023,'2023-01-01','2023-12-31','2002','106','204','Purchase Credit Note',20.00,0.00,'2023-09-02','2023-09-02'),
	(989,'codesquad',2023,'2023-01-01','2023-12-31','2003','101','203','Good Return Inward',2000.00,0.00,'2023-09-02','2023-09-02'),
	(990,'codesquad',2023,'2023-01-01','2023-12-31','2003','102','203','Sales Credit Note',75.00,0.00,'2023-09-02','2023-09-02'),
	(991,'codesquad',2023,'2023-01-01','2023-12-31','2005','111','205','Other Income',0.00,503.00,'2023-09-02','2023-09-02'),
	(992,'codesquad',2023,'2023-01-01','2023-12-31','2005','202','204','Discount Received',0.00,0.00,'2023-09-02','2023-09-02'),
	(993,'codesquad',2023,'2023-01-01','2023-12-31','3000','100','301','Staff Monthly Salary',18120.00,0.00,'2023-09-02','2023-09-02'),
	(994,'codesquad',2023,'2023-01-01','2023-12-31','3000','101','301','Administration Expenses stationery',240.00,0.00,'2023-09-02','2023-09-02'),
	(995,'codesquad',2023,'2023-01-01','2023-12-31','3000','302','301','Staff Daily Salary',0.00,0.00,'2023-09-02','2023-09-02'),
	(996,'codesquad',2023,'2023-01-01','2023-12-31','3001','301','301','Office Monthly Rental',1000.00,0.00,'2023-09-02','2023-09-02'),
	(997,'codesquad',2023,'2023-01-01','2023-12-31','3002','101','302','Sales And Marketing Expenses',0.00,0.00,'2023-09-02','2023-09-02'),
	(998,'codesquad',2023,'2023-01-01','2023-12-31','3002','300','302','Venhicle Petrol',560.00,0.00,'2023-09-02','2023-09-02'),
	(999,'codesquad',2023,'2023-01-01','2023-12-31','3004','101','304','Import Duty ',0.00,0.00,'2023-09-02','2023-09-02'),
	(1000,'codesquad',2023,'2023-01-01','2023-12-31','3030','300','303','Labour Cost',0.00,0.00,'2023-09-02','2023-09-02'),
	(1001,'codesquad',2023,'2023-01-01','2023-12-31','3031','300','303','Freight Charger on purchase',100.00,0.00,'2023-09-02','2023-09-02'),
	(1002,'codesquad',2023,'2023-01-01','2023-12-31','4001','101','401','Cash in hand - cash receipt',1870.02,0.00,'2023-09-02','2023-09-02'),
	(1003,'codesquad',2023,'2023-01-01','2023-12-31','4001','104','402','Administration Expenses',0.00,0.00,'2023-09-02','2023-09-02'),
	(1004,'codesquad',2023,'2023-01-01','2023-12-31','4002','301','402','Office Equipment ',25600.00,0.00,'2023-09-02','2023-09-02'),
	(1005,'codesquad',2023,'2023-01-01','2023-12-31','4002','302','406','Accumulated Depreciation - Office Equipment',0.00,0.00,'2023-09-02','2023-09-02'),
	(1006,'codesquad',2023,'2023-01-01','2023-12-31','4002','303','402','Computer ',0.00,0.00,'2023-09-02','2023-09-02'),
	(1007,'codesquad',2023,'2023-01-01','2023-12-31','4002','304','406','Accumulated Depreciation - computer',0.00,0.00,'2023-09-02','2023-09-02'),
	(1008,'codesquad',2023,'2023-01-01','2023-12-31','4002','600','401','AMB Bank Account',0.00,15640.00,'2023-09-02','2023-09-02'),
	(1009,'codesquad',2023,'2023-01-01','2023-12-31','4002','700','401','RHB Bank Padungan Branch',4974.00,0.00,'2023-09-02','2023-09-02'),
	(1010,'codesquad',2023,'2023-01-01','2023-12-31','4005','120','401','Cash On Hand ',1180.00,0.00,'2023-09-02','2023-09-02'),
	(1011,'codesquad',2023,'2023-01-01','2023-12-31','4005','201','401','SCB Bank Account ',0.00,3500.00,'2023-09-02','2023-09-02'),
	(1012,'codesquad',2023,'2023-01-01','2023-12-31','4005','220','401','AMB Bank Bhd.',50995.00,0.00,'2023-09-02','2023-09-02'),
	(1013,'codesquad',2023,'2023-01-01','2023-12-31','4005','330','401','PBB Bank',4000.00,0.00,'2023-09-02','2023-09-02'),
	(1014,'codesquad',2023,'2023-01-01','2023-12-31','4005','440','401','PBB Bank (KCH)',2000.00,0.00,'2023-09-02','2023-09-02'),
	(1015,'codesquad',2023,'2023-01-01','2023-12-31','4005','550','401','HSBC Bank',1000.00,0.00,'2023-09-02','2023-09-02'),
	(1016,'codesquad',2023,'2023-01-01','2023-12-31','4005','660','401','CIMB Bank',0.00,0.00,'2023-09-02','2023-09-02'),
	(1017,'codesquad',2023,'2023-01-01','2023-12-31','4005','880','401','HSBC Bank (KCH)',11106.00,0.00,'2023-09-02','2023-09-02'),
	(1018,'codesquad',2023,'2023-01-01','2023-12-31','4015','200','501','GST Output Tax ',0.00,1.38,'2023-09-02','2023-09-02'),
	(1019,'codesquad',2023,'2023-01-01','2023-12-31','4300','100','401','Code Squard Technology',4817.12,0.00,'2023-09-02','2023-09-02'),
	(1020,'codesquad',2023,'2023-01-01','2023-12-31','4300','130','401','Tech Computer Marketing',4792.32,0.00,'2023-09-02','2023-09-02'),
	(1021,'codesquad',2023,'2023-01-01','2023-12-31','4310','100','501','ABC Company ',0.00,488.42,'2023-09-02','2023-09-02'),
	(1022,'codesquad',2023,'2023-01-01','2023-12-31','5001','101','501','CentralSoft Technology',60707.46,0.00,'2023-09-02','2023-09-02'),
	(1023,'codesquad',2023,'2023-01-01','2023-12-31','5001','110','501','Zhunion Marketing',18999.00,0.00,'2023-09-02','2023-09-02'),
	(1024,'codesquad',2023,'2023-01-01','2023-12-31','5001','601','501','DEF IT Technology',0.00,0.00,'2023-09-02','2023-09-02'),
	(1025,'codesquad',2023,'2023-01-01','2023-12-31','5002','701','501','Cash Purchase Account',0.00,0.00,'2023-09-02','2023-09-02'),
	(1026,'codesquad',2023,'2023-01-01','2023-12-31','5011','100','501','GST Input Tax ',0.00,0.00,'2023-09-02','2023-09-02'),
	(1027,'codesquad',2023,'2023-01-01','2023-12-31','7001','110','701','Capital Account',0.00,200000.00,'2023-09-02','2023-09-02'),
	(1028,'codesquad',2023,'2023-01-01','2023-12-31','7001','120','701','Retained Earning',0.00,500.00,'2023-09-02','2023-09-02');

/*!40000 ALTER TABLE `trialBalance` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
