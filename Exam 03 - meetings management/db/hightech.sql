-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2021 at 09:00 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hightech`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupId` int(11) NOT NULL,
  `groupName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`groupId`, `groupName`) VALUES
(1, 'UI team'),
(2, 'Web team'),
(3, 'Mobile team');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meetingId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `description` varchar(200) NOT NULL,
  `meetingRoom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meetingId`, `groupId`, `startTime`, `endTime`, `description`, `meetingRoom`) VALUES
(1, 1, '2021-08-09 18:09:33', '2021-08-09 18:09:33', 'first project', 'NY room'),
(2, 2, '2021-08-09 18:09:33', '2021-08-09 18:09:33', 'hello world', 'blue room'),
(3, 3, '2021-08-09 18:09:33', '2021-08-09 18:09:33', 'group 3 meeting', 'large room'),
(6, 1, '2021-08-09 18:21:23', '2021-08-09 18:21:23', 'hello world again', 'NY room'),
(7, 1, '2021-08-09 18:21:23', '2021-08-09 18:21:23', 'hello world again', 'NY room'),
(8, 1, '2021-08-09 15:09:33', '2021-08-09 15:09:33', 'first project', 'NY room'),
(9, 1, '2021-08-09 15:09:33', '2021-08-09 15:09:33', 'second project', 'left room'),
(10, 1, '2021-08-09 20:55:00', '2021-08-09 23:51:00', 'added from safari', 'Ny Rooom'),
(11, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', ''),
(12, 0, '2021-08-09 00:20:00', '2021-08-09 00:20:00', 'added after validation', 'library'),
(13, 0, '2021-08-04 21:55:00', '2021-08-03 21:55:00', 'AAAAAAAAAAAAA', 'BBB'),
(14, 0, '2021-08-05 21:56:00', '2021-08-03 21:56:00', 'AAAAAAAAAAAA', 'CCCCCC'),
(15, 3, '2021-08-06 21:56:00', '2021-08-04 21:56:00', '11111111111', '2222222222'),
(16, 2, '2021-08-20 00:57:00', '2021-09-03 21:57:00', 'EEEEEEEEEEEEEEEE', 'RRRR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `groupId` (`groupId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `meetings` (`groupId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
