-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: work4me
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `idApplication` int NOT NULL AUTO_INCREMENT,
  `applicationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved` tinyint(1) NOT NULL,
  `cv` longblob NOT NULL,
  `idVacancyfk` int NOT NULL,
  `idCandidatefk` varchar(30) NOT NULL,
  PRIMARY KEY (`idApplication`),
  KEY `idVacancyfk` (`idVacancyfk`),
  KEY `idCandidatefk` (`idCandidatefk`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`idVacancyfk`) REFERENCES `vacancies` (`idVacant`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`idCandidatefk`) REFERENCES `candidates` (`idCandidate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `idCandidate` varchar(30) NOT NULL,
  `birthday` date NOT NULL,
  `profilePic` longblob,
  `name1` varchar(50) NOT NULL,
  `name2` varchar(50) DEFAULT NULL,
  `lastName1` varchar(50) NOT NULL,
  `lastName2` varchar(50) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `idCityfk` int DEFAULT NULL,
  `confirmedAccount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idCandidate`),
  KEY `candidates_ibfk_1` (`idCityfk`),
  CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`idCityfk`) REFERENCES `cities` (`idCity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES ('1193581153','2001-01-14',NULL,'Martin','Alejandro','Escobar','Espinel','martinale4@hotmail.com','chechonito14','3158857986','Flutter me encanta !!',1,1);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `nameCategory` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Technology');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `idCity` int NOT NULL AUTO_INCREMENT,
  `nameCity` varchar(50) NOT NULL,
  PRIMARY KEY (`idCity`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Palmira');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `tin` varchar(30) NOT NULL,
  `nameCompany` varchar(50) NOT NULL,
  `logo` longblob,
  `name1_R` varchar(50) NOT NULL,
  `name2_R` varchar(50) DEFAULT NULL,
  `lastName1_R` varchar(50) NOT NULL,
  `lastName2_R` varchar(50) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `companyEmail` varchar(70) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`tin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES ('6646213','PG-games',NULL,'Juan','Pablo','Rivera','Gonzalez','Una de rainbow o que','juanpari1766@gmail.com','3015428044','juan0507');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancies`
--

DROP TABLE IF EXISTS `vacancies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacancies` (
  `idVacant` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  `publicationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `salary` float NOT NULL,
  `idCityfk` int DEFAULT NULL,
  `idCategoryfk` int NOT NULL,
  `idCompanyfk` varchar(30) NOT NULL,
  PRIMARY KEY (`idVacant`),
  KEY `idCityfk` (`idCityfk`),
  KEY `idCategoryfk` (`idCategoryfk`),
  KEY `idCompanyfk` (`idCompanyfk`),
  CONSTRAINT `vacancies_ibfk_1` FOREIGN KEY (`idCityfk`) REFERENCES `cities` (`idCity`),
  CONSTRAINT `vacancies_ibfk_2` FOREIGN KEY (`idCategoryfk`) REFERENCES `categories` (`idCategory`),
  CONSTRAINT `vacancies_ibfk_3` FOREIGN KEY (`idCompanyfk`) REFERENCES `companies` (`tin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancies`
--

LOCK TABLES `vacancies` WRITE;
/*!40000 ALTER TABLE `vacancies` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacancies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-07  1:05:06
