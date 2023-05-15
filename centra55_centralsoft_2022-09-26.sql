# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: sg1-ss103.a2hosting.com (MySQL 5.5.5-10.5.15-MariaDB-cll-lve)
# Database: centra55_centralsoft
# Generation Time: 2022-09-26 06:22:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;

INSERT INTO `journal` (`id`, `companyID`, `glNo`, `glSub`, `department`, `glName`, `glDescription`, `jeParticular`, `jvInit`, `voucherNo`, `drAmt`, `crAmt`, `userName`, `txnDate`, `voucherType`, `date_created`, `totalDrAmt`, `totalCrAmt`, `opBal`, `curBal`)
VALUES
	(328,'codesquad','1020','100','100','G/L Name-Closing Stock',NULL,'test new RV','','333',110.00,0.00,'Percy Lim','2022-02-12','JV','2022-02-13',NULL,NULL,NULL,NULL),
	(329,'codesquad','5001','100','100','G/L Name-Cash in hand on Sales',NULL,'test new RV','','333',0.00,110.00,'Percy Lim','2022-02-12','JV','2022-02-13',NULL,NULL,NULL,NULL),
	(330,'codesquad','1000','100','300','Credit Sales',NULL,'testing','','JV233',10.00,0.00,'Percy Lim','2022-04-13','JV','2022-04-14',NULL,NULL,NULL,NULL),
	(331,'codesquad','1000','103','100','G/L Name-Credit Sales',NULL,'testing','','JV233',0.00,10.00,'Percy Lim','2022-04-13','JV','2022-04-14',NULL,NULL,NULL,NULL),
	(332,'codesquad','1000','100','300','Credit Sales',NULL,'wwewqe','','JV898773',20.00,0.00,'Percy Lim','2022-04-13','JV','2022-04-14',NULL,NULL,NULL,NULL),
	(333,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'wwewqe','','JV898773',0.00,20.00,'Percy Lim','2022-04-13','JV','2022-04-14',NULL,NULL,NULL,NULL),
	(334,'codesquad','1000','100','300','Credit Sales',NULL,'testing','','JV5433',20.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(335,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'testing','','JV5433',0.00,20.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(336,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'Testing','','1277',30.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(337,'codesquad','4002','700','700','G/L Name-RHB Bank Padungan Branch',NULL,'Testing','','1277',0.00,30.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(338,'codesquad','2001','100','100','G/L Name-Credit Sales',NULL,'testing','','PV1288',0.00,40.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(339,'codesquad','2002','102','200','G/L Name-Credit Purchase',NULL,'testing','','PV1288',40.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(340,'codesquad','4005','201','600','G/L Name-SCB Bank Account ',NULL,'testing','','PV1288',10.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(341,'codesquad','4005','880','700','G/L Name-BSC Bank',NULL,'testing','','PV1288',0.00,10.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(342,'codesquad','2002','101','200','G/L Name-Cash Purchase',NULL,'eting','','JV876',20.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(343,'codesquad','4005','120','600','G/L Name-Cash On Hand',NULL,'eting','','JV876',0.00,20.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(344,'codesquad','1000','100','300','Credit Sales',NULL,'testing','','017724',0.20,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(345,'codesquad','1020','100','100','G/L Name-Closing Stock',NULL,'testing','','017724',0.00,0.20,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(346,'codesquad','1001','100','100','G/L Name-Credit Sales',NULL,'tetsing','','PV3784',0.08,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(347,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'tetsing','','PV3784',0.00,0.10,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(348,'codesquad','4001','101','100','G/L Name-Cash in hand on Sales',NULL,'tetsing','','PV3784',0.02,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(349,'codesquad','2001','100','100','G/L Name-Credit Sales',NULL,'testing','','83323',40.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(350,'codesquad','4001','101','100','G/L Name-Cash in hand on Sales',NULL,'testing','','83323',0.00,40.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(351,'codesquad','1020','100','100','G/L Name-Closing Stock',NULL,'testing','','8721',2.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(352,'codesquad','2002','102','200','G/L Name-Credit Purchase',NULL,'testing','','8721',0.00,2.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(353,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'ewggqe','','JV111A',10.00,0.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(354,'codesquad','2003','100','100','G/L Name-Credit Sales',NULL,'ewggqe','','JV111A',0.00,10.00,'Percy Lim','2022-04-14','JV','2022-04-15',NULL,NULL,NULL,NULL),
	(360,'codesquad','1020','100','100','G/L Name-Closing Stock',NULL,'testing','','JV333',400.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(361,'codesquad','2002','102','200','G/L Name-Credit Purchase',NULL,'testing','','JV333',0.00,400.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(362,'codesquad','2001','200','100','G/L Name-Credit Sales',NULL,'testing','','JV444',2.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(363,'codesquad','2003','100','100','G/L Name-Credit Sales',NULL,'testing','','JV444',0.00,2.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(364,'codesquad','1020','100','100','G/L Name-Closing Stock',NULL,'testing5','','JV555',50.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(365,'codesquad','2002','102','200','G/L Name-Credit Purchase',NULL,'testing5','','JV555',0.00,50.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(366,'codesquad','1001','100','100','G/L Name-Credit Sales',NULL,'1222','','JV666',2.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(367,'codesquad','2002','101','200','G/L Name-Cash Purchase',NULL,'1222','','JV666',0.00,2.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(368,'codesquad','2001','100','100','G/L Name-Credit Sales',NULL,'weqewwe','','JV777',3.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(369,'codesquad','2002','102','200','G/L Name-Credit Purchase',NULL,'weqewwe','','JV777',0.00,3.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(370,'codesquad','2001','100','100','G/L Name-Credit Sales',NULL,'2121','','JV888',20.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(371,'codesquad','4001','101','100','G/L Name-Cash in hand on Sales',NULL,'2121','','JV888',0.00,20.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(372,'codesquad','1000','103','100','redit Sales)',NULL,'asasa','','JV1234',10.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(373,'codesquad','2001','200','100','redit Sales)',NULL,'asasa','','JV1234',0.00,10.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(374,'codesquad','1001','100','100','redit Sales)',NULL,'shhhs','','JV376HB',220.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(375,'codesquad','2002','101','100','redit Sales (try))',NULL,'shhhs','','JV376HB',0.00,220.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(376,'codesquad','2001','100','100','Credit Sales)',NULL,'12``1gfgfg','','JV87UU',20.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(377,'codesquad','2003','100','100','Credit Sales)',NULL,'12``1gfgfg','','JV87UU',0.00,20.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(378,'codesquad','1000','103','100','Credit Sales)',NULL,'22123','','PV123',50.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(379,'codesquad','2002','101','200','Cash Purchase)',NULL,'22123','','PV123',0.00,50.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(380,'codesquad','1020','100','100','Closing Stock)',NULL,'w112','','237',120.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(381,'codesquad','2003','100','100','Credit Sales)',NULL,'w112','','237',0.00,120.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(382,'codesquad','1000','100','300','Credit Sales',NULL,'qsqs','','JV637D',110.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(383,'codesquad','1000','102','100','Cash Sales)',NULL,'qsqs','','JV637D',0.00,110.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(384,'codesquad','4002','700','700','RHB Bank Padungan Branch)',NULL,'21213','','JV3988F',10.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(385,'codesquad','4300','100','100','Code Squard Technology)',NULL,'21213','','JV3988F',0.00,10.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(386,'codesquad','1000','100','300','Credit Sales',NULL,'1111','','JV3766FF',20.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(387,'codesquad','4002','600','600','RHB Bank Account)',NULL,'1111','','JV3766FF',0.00,20.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(388,'codesquad','1000','100','300','Credit Sales',NULL,'wq2q','','JV377T',110.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(389,'codesquad','1000','102','100','Cash Sales)',NULL,'wq2q','','JV377T',0.00,110.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(390,'codesquad','1000','100','300','Credit Sales',NULL,'11`11`','','JV4477F',1100.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(391,'codesquad','1000','102','100','Cash Sales)',NULL,'11`11`','','JV4477F',0.00,1100.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(392,'codesquad','4005','550','700','HSBC Bank)',NULL,'testing','','PV3488',210.00,0.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(393,'codesquad','4005','660','700','CIMB Bank)',NULL,'testing','','PV3488',0.00,210.00,'Percy Lim','2022-04-15','JV','2022-04-16',NULL,NULL,NULL,NULL),
	(456,'codesquad','1020','100','100','Closing Stock',NULL,'wjjjss','','JV243',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(457,'codesquad','2003','100','100','Credit Sales',NULL,'wjjjss','','JV243',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(525,'codesquad','1000','100','300','Credit Sales',NULL,'Testing ','','JV222',123450.00,0.00,'Percy Lim','2022-04-17','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(526,'codesquad','2003','100','100','G/L Name-Credit Sales',NULL,'test edit','','JV222',0.00,123450.00,'Percy Lim','2022-04-17','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(527,'codesquad','4002','600','600','G/L Name-RHB Bank Account',NULL,'test edit','','JV222',100.00,0.00,'Percy Lim','2022-04-17','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(528,'codesquad','5001','100','100','G/L Name-Cash in hand on Sales',NULL,'test edit','','JV222',0.00,100.00,'Percy Lim','2022-04-17','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(564,'codesquad','5001','100','100','G/L Name-Cash in hand on Sales',NULL,'asasasd','','JV111',30.00,0.00,'Percy Lim','2022-02-09','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(565,'codesquad','5001','100','100','G/L Name-Cash in hand on Sales',NULL,'eeew','','JV111',0.00,20.00,'Percy Lim','2022-02-09','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(566,'codesquad','4005','201','600','G/L Name-SCB Bank Account ',NULL,'eeew','','JV111',0.00,10.00,'Percy Lim','2022-02-09','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(567,'codesquad','1001','100','100','Credit Sales',NULL,'testing','','PV4877',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(568,'codesquad','2002','101','100','Credit Sales (try)',NULL,'testing','','4877',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(569,'codesquad','1020','100','100','Closing Stock',NULL,'qweqwqe','','PV2388',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(570,'codesquad','2002','102','200','Credit Purchase',NULL,'qweqwqe','','PV2388',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(583,'codesquad','1000','102','100','Cash Sales',NULL,'212321','','JV999',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(584,'codesquad','2001','100','100','Credit Sales',NULL,'212321','','JV999',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(585,'codesquad','2001','200','100','Credit Sales',NULL,'1213','','JV999',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(586,'codesquad','4001','101','100','Cash in hand on Sales',NULL,'1213','','JV999',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(587,'codesquad','2001','100','100','Credit Sales',NULL,'1`2`','','JV999',1.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(588,'codesquad','2002','102','200','Credit Purchase',NULL,'1`2`','','JV999',0.00,1.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(589,'codesquad','2001','100','100','Credit Sales',NULL,'111','','JV999',10.00,0.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(590,'codesquad','2003','100','100','Credit Sales',NULL,'111','','JV999',0.00,10.00,'Percy Lim','2022-04-16','JV','2022-04-17',NULL,NULL,NULL,NULL),
	(593,'codesquad','1000','102','100','Cash Sales',NULL,'test','','JV335',1.00,0.00,'Percy Lim','2022-07-25','JV','2022-07-26',NULL,NULL,NULL,NULL),
	(594,'codesquad','1000','102','100','Cash Sales',NULL,'test','','JV335',0.00,1.00,'Percy Lim','2022-07-25','JV','2022-07-26',NULL,NULL,NULL,NULL),
	(595,'codesquad','1001','100','100','Credit Sales',NULL,'www','','JV335',10.00,0.00,'Percy Lim','2022-07-25','JV','2022-07-26',NULL,NULL,NULL,NULL),
	(596,'codesquad','2002','101','100','Credit Sales (try)',NULL,'www','','JV335',0.00,10.00,'Percy Lim','2022-07-25','JV','2022-07-26',NULL,NULL,NULL,NULL),
	(597,'codesquad','4002','600','600','AMB Bank Account',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(598,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',1000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(599,'codesquad','4002','600','600','AMB Bank Account',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(600,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',1000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(601,'codesquad','4002','600','600','AMB Bank Account',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(602,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Salary for August 2022 to James Hiu by cheque No. 123456789 dated 23-8-22','','BV220822-12345',1000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(603,'codesquad','4002','600','600','AMB Bank Account',NULL,'testing ','','BV220822-12345',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(604,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'testing ','','BV220822-12345',1000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(605,'codesquad','4002','600','600','AMB Bank Account',NULL,'testing ','','BV220822-12345',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(606,'codesquad','4002','600','600','AMB Bank Account',NULL,'tetsing','','BV220822-12345',0.00,10.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(607,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'tetsing','','BV220822-12345',10.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(608,'codesquad','4002','600','600','AMB Bank Account',NULL,'Month Salary on August 2022 for James Teo','','BV220822-12346',0.00,20.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(609,'codesquad','4002','600','600','AMB Bank Account',NULL,'By Check No. AMB1234567','','BV220822-12346',20.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(610,'codesquad','4002','600','600','AMB Bank Account',NULL,'Try again','','BV220822-12347',0.00,20.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(611,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Try again','','BV220822-12347',20.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(612,'codesquad','4002','600','600','AMB Bank Account',NULL,'Test again','','BV220822-1829',0.00,40.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(613,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Test again','','BV220822-1829',40.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(614,'codesquad','4002','600','600','AMB Bank Account',NULL,'TRY AGAIN','','BV220922-1627',0.00,50.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(615,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'TRY AGAIN','','BV220922-1627',50.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(616,'codesquad','4002','600','600','AMB Bank Account',NULL,'Try new txn','','BV20228-1299',0.00,1000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(617,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Try new txn','','20228-1299',1000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(618,'codesquad','4002','600','600','AMB Bank Account',NULL,'Try Try','','BV390099',0.00,10000.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL),
	(619,'codesquad','3000','100','100','Staff Monthly Salary',NULL,'Try Try','','BV390099',10000.00,0.00,'Percy Lim','2022-08-21','JV',NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
