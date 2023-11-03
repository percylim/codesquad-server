# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: dev-codesquad.cobtsowwpvts.ap-southeast-1.rds.amazonaws.com (MySQL 5.7.42-log)
# Database: codesquaddb
# Generation Time: 2023-11-02 04:34:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_create` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adminID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adminName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `companyID`, `password`, `date_create`, `phone`, `adminID`, `adminName`, `email`, `companyName`)
VALUES
	(20,'codesquad','f81850a3adddf97f817c905d01ab4b98','2021-10-12','+60821238882','Percy','Percy Lim','percylim@gmail.com','Code Squad Technology'),
	(21,'cscompany','d40c471cb61b068c6ee2c45b978a3404','2021-10-20','+60821238882','percy','Percy Lim','percylim@gmail.com','CS Company'),
	(23,'zhunionholding','487b6e6920309ea699ca37e7523bd187','2021-10-26','+60821238882','percy','Percy Lim','percylim@gmail.com','Zhunion Holding Sdn Bhd'),
	(24,'centralsoft','d358785f82b828c694d367d215c323ef','2023-08-01','+60821238882','percy','Percy Lim','percylim@gmail.com','CentralSoft Technology');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table companyCTRL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `companyCTRL`;

CREATE TABLE `companyCTRL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `databaseName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verifyDate` int(11) DEFAULT NULL,
  `verifyCode` int(11) DEFAULT NULL,
  `approveCode` int(11) DEFAULT NULL,
  `approveDate` int(11) DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `companyCTRL` WRITE;
/*!40000 ALTER TABLE `companyCTRL` DISABLE KEYS */;

INSERT INTO `companyCTRL` (`id`, `companyID`, `companyName`, `databaseName`, `date_created`, `verifyDate`, `verifyCode`, `approveCode`, `approveDate`, `address1`, `address2`, `postcode`, `city`, `state`, `country`, `email`, `phone`, `expiryDate`)
VALUES
	(19,'codesquad','Code Squad Technology','codesquad','2021-10-12',NULL,NULL,NULL,NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','+60821238882',NULL),
	(20,'cscompany','CS Company','cscompany','2021-10-20',NULL,NULL,NULL,NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','+60821238882',NULL),
	(22,'zhunionholding','Zhunion Holding Sdn Bhd','zhunionholding','2021-10-26',NULL,NULL,NULL,NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','+60821238882',NULL),
	(24,'centralsoft','CentralSoft Technology','centralsoft','2023-08-01',NULL,NULL,NULL,NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','+60821238882',NULL);

/*!40000 ALTER TABLE `companyCTRL` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table glType
# ------------------------------------------------------------

DROP TABLE IF EXISTS `glType`;

CREATE TABLE `glType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `glType` int(11) DEFAULT NULL,
  `glTypeName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `txnDate` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `glType` WRITE;
/*!40000 ALTER TABLE `glType` DISABLE KEYS */;

INSERT INTO `glType` (`id`, `glType`, `glTypeName`, `amount`, `txnDate`)
VALUES
	(3,201,'Sales',NULL,NULL),
	(4,202,'Purchase',NULL,NULL),
	(5,203,'Return Inward / Sales Credit Note / Discount / Commission',NULL,NULL),
	(6,205,'Other Incomes',NULL,NULL),
	(7,301,'Administration Expenses',NULL,NULL),
	(8,302,'Sales And Marketing Expenses',NULL,NULL),
	(9,303,'Purchase Expenses',NULL,NULL),
	(10,304,'General Expenses',NULL,NULL),
	(11,401,'Current Assets',NULL,NULL),
	(12,402,'Fixed Assets',NULL,NULL),
	(13,403,'Other Assets',NULL,NULL),
	(14,501,'Current Liabilities',NULL,NULL),
	(16,503,'Long-Term Liabilities',NULL,NULL),
	(17,601,'Preliminary Expenses',NULL,NULL),
	(18,701,'Owner’s Equity/Capital Account',NULL,NULL),
	(19,204,'Return Outward / Purchase Debit Note / Discount / commission',NULL,NULL),
	(20,404,'Intangible Assets',NULL,NULL),
	(22,406,'Depreciation',NULL,NULL),
	(24,408,'Accruals',NULL,NULL),
	(25,801,'Account Payable',NULL,NULL),
	(26,802,'Account Receivable',NULL,NULL),
	(27,804,'Opening Stock',NULL,NULL);

/*!40000 ALTER TABLE `glType` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
