-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2021 at 04:26 PM
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
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationID`) VALUES
(6, 4),
(2, 4),
(2, 5),
(2, 1),
(8, 4),
(8, 9),
(10, 5),
(10, 8),
(10, 3),
(8, 1),
(8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(600) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `uuid`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
(1, 'b0ad93dc-19c7-4dd9-9c17-8ea882cdf067', 'Morad', 'Mohammamd', 'morad', 'ef607f1ea327f357ad919f5a9aeb74e1c6f76da56617e7d7e1abf0b06683de75778807501702ae0147aebbbe63d867dc8ffbd4edd3ec1333ffd395591c0da92f', 1),
(2, '5800f210-920a-427f-bc6b-01b67939572b', 'Khaled', 'Zbidat', 'khaledz', '6b1d6a2c21f18697e062f5abab5ad4493dc30fd7d9a017806ea456064a5234f4178d32ba8b46e68821da00e286ce3f8b2dc17ffd22c0c6db67fa2a6d21f2bf99', 0),
(3, '712efc59-188d-4630-9894-a8ee7c83328b', 'Mohammad', 'Siam', 'abusimo', '67efa317e3d2dca18dcda68644dc6cfa02d1c33225fd1d0bf16a1eedfe92e96a5ca5dbc1c542c73dcc0f4aa3b1b17ee29ada715626ea4e6bd743691f94c8fce1', 0),
(4, 'c9e031b6-c6f0-40ce-969c-d60c78bcbc24', 'Odai', 'Wattad', 'odaiw', 'd549833f85f6626688991dbc1a75bef6e2b9924c24a8c62867f63b0cf59c593c2484d36639a30ccd465261bf7a7ed75967628ae40a852ec30e0a19cacd15898c', 0),
(5, '3faade03-76d2-45e3-8eb7-d03e064aa64e', 'Mohammad', 'Abu Mokh', 'mohamokh', 'de17742607abf2c6ddd522a13e312b04ad03b98c2ab3d6009a9d12885f1c1acbd12f1eb3733b13c146b3719bb0697fb0ded7d59bd90c0d57b1d22e1bd0fe77bf', 0),
(6, 'dd1a8e2f-909d-4239-8666-f23b896601c9', 'Adham', 'aldda', 'addamd', 'f388e30200c44ff3edf334e933d7a3d97912a2a371b0e62a8b3e576a7eba4340f505fc70f7d336ce5feccbfd0f0987141e261667b3b0926ac652a816162356d7', 0),
(7, '80ec53af-608e-46b2-91a6-5e53f0888f4d', 'ahmad', 'mahmoud', 'ahmadm', '61446459c223430654156e0ce93a4eb71e1826c8bdcab4cf7f7f02181ef619c2dbb8f111e923f2c72c34c64c19195817ac13aab09b4d159d6d778df249359ae3', 0),
(8, '60f7b6a7-bdfb-473a-9565-bf5aeb18d217', 'morad2', 'abu alkeaan', 'morad2', 'ef607f1ea327f357ad919f5a9aeb74e1c6f76da56617e7d7e1abf0b06683de75778807501702ae0147aebbbe63d867dc8ffbd4edd3ec1333ffd395591c0da92f', 0),
(9, 'd654bcd9-c3fa-4016-a174-cdd812249594', 'مراد', 'ابو القيعان', 'مراد', 'ef607f1ea327f357ad919f5a9aeb74e1c6f76da56617e7d7e1abf0b06683de75778807501702ae0147aebbbe63d867dc8ffbd4edd3ec1333ffd395591c0da92f', 0),
(10, 'e3c985b9-f016-47e8-9d71-af42047406ba', 'morad', 'm7md', 'morad3', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(11, '076d066e-380c-4df4-ae99-fdd900222714', 'morad', 'morad', 'morad4', 'ef607f1ea327f357ad919f5a9aeb74e1c6f76da56617e7d7e1abf0b06683de75778807501702ae0147aebbbe63d867dc8ffbd4edd3ec1333ffd395591c0da92f', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `destination` varchar(25) NOT NULL,
  `price` double NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `picFileName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `price`, `start`, `end`, `picFileName`) VALUES
(1, 'visit Camp Nou Stadium and the beautiful city of Barcelona, FCBarcelona well give you a dose of fun on the weekend', 'Barcelona', 1000, '2021-10-23', '2021-10-28', '77d97b04-838c-4e5a-b602-3cb10162000c.jpg'),
(2, 'visit Spain and the capital Madrid, you well see a lot of hestoric places and others new like Real Madrid FC Stadium Santiago Bernabeu', 'Madrid', 800, '2021-10-23', '2021-10-28', '17283bc0-f44d-4d45-a67b-d6022f693e7e.jpg'),
(3, 'London is one of the most popular places in the world, a lot of traditions there and many beautiful places and people from all arround the world\nQueen, Palace, BigBen, and many other places', 'London', 800, '2021-10-23', '2021-10-28', 'c9b37df5-69db-4567-9430-e3422a797ffc.jpg'),
(4, 'The most beautiful place in the world that everyone dreams to live there or even only visit it.', 'Maldives', 1500, '2021-10-23', '2021-10-28', '4b2ede17-f512-4f86-a580-81e17c002e4a.jpg'),
(5, 'A unique city between two continents, one of the world most visited places.\nYou well find there many breathtaking things like mosques, food, tradition and hestory and many others..', 'Istanbul', 1100, '2021-10-23', '2021-10-28', '6522b616-8bfe-426d-8260-b63f3605c14b.jpg'),
(6, 'We certain that you see spider-man movies and dreamed to visit new york and see the skyscrapers there in Manhattan and the future technologies in NY', 'New York', 1350, '2021-11-17', '2021-11-22', 'd6eed6bd-fbbc-41e6-b985-530c692bdb77.jpeg'),
(7, 'If you love beach and \"Samba\" so you love to visit Brazil or more accurately Rio\'s CopaCabana beach.\nSports, life, Samba, Beach is Brazilian things', 'Rio de Janeiro', 1300, '2021-11-01', '2021-11-12', '46eb1aa1-8ee5-4b9f-9796-a9eaf783aaf7.jpg'),
(8, 'If you want to see one of the most strangest things in the world so you want to have a cool vacation in Egypt, precisely Giza Pyramids near Cairo.\nThese huge things that was built in ancient era in the desert without an advanced technologies of today is literally a Miracle', 'Cairo', 900, '2021-11-01', '2021-11-12', '04b8c9b0-c01f-4492-9127-e9d0db5e7d9d.jpg'),
(9, 'We are sure that you love pizza, pasta, and other Italian food, so we recommend you to visit Roma -the Capital of Italy-.\nThis city is one of the most popular tourists destinations in the world where you can find their many Romanian historical buildings like the Colosseum.', 'Roma ', 975, '2021-09-24', '2021-09-24', '3b5ac41c-9c88-44c1-9642-28906d960590.jpg'),
(10, 'A huge and beautiful city where you can see the future and the most advanced techs there..', 'Tokyo', 750, '2021-10-01', '2021-10-08', '6fbb017c-80fc-4eb8-9c0d-6ea53cbaa69e.webp'),
(11, 'Milano is a beautiful place its the world-leading and the capital of Fashion ', 'Milano', 700, '2021-10-01', '2021-10-08', 'ef9525ce-41e0-46fb-b383-2bf0c40eaa08.jpg'),
(12, 'Singapore is a very beautiful city', 'Singapore', 1000, '2021-10-05', '2021-10-12', '144428af-cbf8-4a9e-ae1f-27cfdeaea6eb.jpg'),
(13, 'Haifa is one of the most beautiful cities near the Mediterranean Sea', 'Haifa', 600, '2021-10-10', '2021-10-17', '582156e6-bd10-4070-91c9-e8f9552fb9c0.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_5` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
