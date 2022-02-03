-- phpMyAdmin SQL Dump
-- version 4.9.9
-- https://www.phpmyadmin.net/
--
-- Host: db5001055811.hosting-data.io
-- Generation Time: Feb 03, 2022 at 08:55 PM
-- Server version: 5.7.33-log
-- PHP Version: 7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbs909718`
--

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`) VALUES
(0, 'The Move'),
(1, 'C++ Network Scanner GUI'),
(2, 'Expense App - Scinomix'),
(3, 'Z-Axis Tester'),
(4, 'LIMS'),
(5, 'Pump'),
(6, 'Scinoimx Wordpress'),
(7, 'DBA App'),
(8, 'iZaLyt'),
(9, 'Sign Language Smart Home Control'),
(10, 'Fade Mirror'),
(11, 'WAVV Mobile'),
(12, 'Flutter VIOP Kit'),
(13, 'Desi Rides'),
(14, 'Camera Plugin Update'),
(15, 'Music Mash'),
(16, 'Golf Trax'),
(17, 'Tenders - Decide where to Eat'),
(18, 'Joke Cam - camera tells jokes');

-- --------------------------------------------------------

--
-- Table structure for table `item_skill`
--

CREATE TABLE `item_skill` (
  `skill_name` varchar(250) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_skill`
--

INSERT INTO `item_skill` (`skill_name`, `item_id`) VALUES
('C++', 1),
('Mobile', 0),
('iOS', 0),
('Node', 0),
('NoSQL', 0),
('Payment Portals', 0),
('Android', 0),
('Networks', 1),
('Android', 2),
('iOS', 2),
('Mobile', 2),
('NoSQL', 2),
('Web Dev', 2),
('C++', 3),
('Embedded Systems', 3),
('Linux', 3),
('PHP', 3),
('Web Dev', 3),
('.Net', 4),
('C#', 4),
('C++', 5),
('Embedded Systems', 5),
('Linux', 5),
('Networks', 5),
('Node', 5),
('Web Dev', 5),
('Flutter', 2),
('Flutter', 0),
('Firebase', 0),
('Firebase', 2),
('PHP', 6),
('Web Dev', 6),
('Wordpress', 6),
('.Net', 7),
('PHP', 7),
('SQL', 7),
('Visual Basic', 7),
('Web Dev', 7),
('Android', 8),
('Bluetooth', 8),
('iOS', 8),
('Java', 8),
('Mobile', 8),
('Swift', 8),
('C++', 9),
('Linux', 9),
('Machine Learning', 9),
('Networks', 9),
('Python', 9),
('Embedded Systems', 10),
('Linux', 10),
('Microcontrollers', 10),
('Mobile', 10),
('Networks', 10),
('Web Dev', 10),
('Android', 11),
('Flutter', 11),
('iOS', 11),
('Java', 11),
('Kotlin', 11),
('Mobile', 11),
('Objective-C', 11),
('Swift', 11),
('Android', 12),
('Flutter', 12),
('iOS', 12),
('Kotlin', 12),
('Java', 12),
('Mobile', 12),
('Swift', 12),
('Android', 13),
('Firebase', 13),
('Flutter', 13),
('iOS', 13),
('Java', 13),
('Kotlin', 13),
('Mobile', 13),
('Swift', 13),
('Android', 14),
('Flutter', 14),
('iOS', 14),
('Java', 14),
('Mobile', 14),
('Objective-C', 14),
('Flutter', 15),
('Node', 15),
('Payment Portals', 13),
('Firebase', 16),
('iOS', 16),
('Swift', 16),
('Payment Portals', 16),
('Node', 16),
('Web Dev', 16),
('Android', 17),
('Firebase', 17),
('Flutter', 17),
('iOS', 17),
('Mobile', 17),
('Flutter', 18),
('Mobile', 18);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`name`) VALUES
('.Net'),
('Android'),
('Bluetooth'),
('C'),
('C#'),
('C++'),
('Embedded Systems'),
('Firebase'),
('Flutter'),
('iOS'),
('Java'),
('Kotlin'),
('Linux'),
('Machine Learning'),
('Microcontrollers'),
('Mobile'),
('Networks'),
('Node'),
('NoSQL'),
('Objective-C'),
('Payment Portals'),
('PHP'),
('Python'),
('SQL'),
('Swift'),
('Unity'),
('Visual Basic'),
('Web Dev'),
('Wordpress');

-- --------------------------------------------------------

--
-- Table structure for table `skill_tag`
--

CREATE TABLE `skill_tag` (
  `skill_name` varchar(250) DEFAULT NULL,
  `tag_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skill_tag`
--

INSERT INTO `skill_tag` (`skill_name`, `tag_name`) VALUES
('.Net', 'C#'),
('.Net', 'Windows'),
('Android', 'Android'),
('Android', 'Android Studio'),
('Android', 'Apps'),
('Android', 'Cow'),
('Android', 'Flutter'),
('Android', 'Java'),
('Android', 'Kotlin'),
('Android', 'Mobile'),
('Android', 'Mobile Development'),
('Android', 'Phone'),
('Bluetooth', 'BLE LTE'),
('C', 'C'),
('C', 'C++'),
('C', 'Linux'),
('C', 'Low level'),
('C', 'Microcontrollers'),
('C#', '.Net'),
('C#', 'Windows'),
('C++', 'Linux'),
('C++', 'Low level'),
('C++', 'Microcontrollers'),
('Embedded Systems', 'C'),
('Embedded Systems', 'C++'),
('Embedded Systems', 'Linux'),
('Firebase', 'NoSQL'),
('Flutter', 'Android'),
('Flutter', 'Dart'),
('Flutter', 'iOS'),
('Flutter', 'Java'),
('Flutter', 'Kotlin'),
('Flutter', 'Mobile'),
('Flutter', 'Objective-C'),
('Flutter', 'Swift'),
('iOS', 'Apps'),
('iOS', 'Appstore'),
('iOS', 'Dart'),
('iOS', 'Firebase'),
('iOS', 'Flutter'),
('iOS', 'Mobile'),
('iOS', 'Mobile Development'),
('iOS', 'Phone'),
('iOS', 'Unity'),
('Java', 'Android'),
('Java', 'Android Studio'),
('Java', 'Apps'),
('Java', 'Java'),
('Java', 'Mobile'),
('Java', 'Mobile Development'),
('Java', 'Phone'),
('Kotlin', 'Android'),
('Kotlin', 'Android Studio'),
('Kotlin', 'Apps'),
('Kotlin', 'Kotlin'),
('Kotlin', 'Mobile'),
('Kotlin', 'Mobile Development'),
('Kotlin', 'Phone'),
('Linux', 'C'),
('Linux', 'C++'),
('Linux', 'Embedded Systems'),
('Machine Learning', 'AI'),
('Machine Learning', 'Deep Learning'),
('Machine Learning', 'Neural Networks '),
('Microcontrollers', 'C'),
('Microcontrollers', 'C++'),
('Mobile', 'Android'),
('Mobile', 'Apps'),
('Mobile', 'Appstore'),
('Mobile', 'Firebase'),
('Mobile', 'Flutter'),
('Mobile', 'iOS'),
('Mobile', 'Kotlin'),
('Mobile', 'Swift'),
('Networks', 'Node'),
('Networks', 'Sockets'),
('Networks', 'TCP'),
('Networks', 'UDP'),
('Node', 'Backend'),
('Node', 'Full stack'),
('Node', 'Web Dev'),
('Node', 'Website'),
('NoSQL', 'SQL'),
('Objective-C', 'iOS'),
('Objective-C', 'Mobile'),
('Objective-C', 'Swift'),
('Payment Portals', 'Backend'),
('Payment Portals', 'Stripe'),
('PHP', 'SQL'),
('Python', 'Jupyter Notebook'),
('Python', 'Python'),
('SQL', 'Node'),
('SQL', 'PHP'),
('Swift', 'Apps'),
('Swift', 'Mobile'),
('Swift', 'Mobile Development'),
('Swift', 'Phone'),
('Unity', 'Game Engine'),
('Unity', 'Games'),
('Unity', 'iOS'),
('Unity', 'Mobile'),
('Visual Basic', '.Net'),
('Web Dev', 'CSS'),
('Web Dev', 'HTML'),
('Web Dev', 'Javascript'),
('Web Dev', 'Node'),
('Web Dev', 'PHP'),
('Web Dev', 'SQL'),
('Wordpress', 'php');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`name`) VALUES
('.Net'),
('AI'),
('Android'),
('Android Studio'),
('Apps'),
('Appstore'),
('Backend'),
('BLE LTE'),
('C'),
('C#'),
('C++'),
('Cow'),
('CSS'),
('Dart'),
('Deep Learning'),
('Embedded Systems'),
('Firebase'),
('Flutter'),
('Full stack'),
('Game Engine'),
('Games'),
('HTML'),
('iOS'),
('Java'),
('Javascript'),
('Jupyter Notebook'),
('Kotlin'),
('Linux'),
('Low level'),
('Microcontrollers'),
('Mobile'),
('Mobile Development'),
('Neural Networks '),
('Node'),
('NoSQL'),
('Objective-C'),
('Phone'),
('PHP'),
('Python'),
('Sockets'),
('SQL'),
('Stripe'),
('Swift'),
('TCP'),
('UDP'),
('Unity'),
('Web Dev'),
('Website'),
('Windows');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_skill`
--
ALTER TABLE `item_skill`
  ADD KEY `item_id` (`item_id`),
  ADD KEY `skill_name` (`skill_name`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `skill_tag`
--
ALTER TABLE `skill_tag`
  ADD UNIQUE KEY `uq_skill_tag` (`skill_name`,`tag_name`),
  ADD KEY `tag_name` (`tag_name`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`name`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_skill`
--
ALTER TABLE `item_skill`
  ADD CONSTRAINT `item_skill_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `item_skill_ibfk_2` FOREIGN KEY (`skill_name`) REFERENCES `skill` (`name`);

--
-- Constraints for table `skill_tag`
--
ALTER TABLE `skill_tag`
  ADD CONSTRAINT `skill_tag_ibfk_1` FOREIGN KEY (`tag_name`) REFERENCES `tag` (`name`),
  ADD CONSTRAINT `skill_tag_ibfk_2` FOREIGN KEY (`skill_name`) REFERENCES `skill` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
