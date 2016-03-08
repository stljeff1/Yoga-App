-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2016 at 02:10 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `yoga-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE IF NOT EXISTS `assets` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `locator` varchar(500) NOT NULL,
  `fk_type` int(11) NOT NULL,
  `is_primary_asset` tinyint(1) DEFAULT NULL,
  `notes` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=134 ;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`ID`, `locator`, `fk_type`, `is_primary_asset`, `notes`) VALUES
(5, '/yoga-app/images/tadasana.jpg', 1, 1, NULL),
(6, '/yoga-app/images/uttanasana.jpg', 1, 1, NULL),
(7, '/yoga-app/images/virabhadrasana-I.jpg', 1, 1, NULL),
(8, '/yoga-app/images/dandasana.jpg', 1, 1, NULL),
(9, '/yoga-app/images/trikonasana.jpg', 1, 1, NULL),
(10, '/yoga-app/images/utkatasana.jpg', 1, 1, NULL),
(11, '/yoga-app/images/sarvangasana.jpg', 1, 1, NULL),
(12, '/yoga-app/images/chaturanga-dandasana.jpeg', 1, 1, NULL),
(14, '/yoga-app/images/urdhva-mukha-svanasana.jpg', 1, 1, NULL),
(15, '/yoga-app/images/vrksasana.jpg', 1, 1, NULL),
(16, '/yoga-app/images/virabadrasana-2-2web1.jpg', 1, 1, NULL),
(17, '/yoga-app/images/virabhadrasana-3.jpg', 1, 1, NULL),
(19, 'dNtmxrgOMGs', 2, NULL, NULL),
(20, 'http://www.yogajournal.com/pose/mountain-pose/', 3, NULL, NULL),
(21, 'NmU5OJbn19U', 2, NULL, NULL),
(22, '1oumWGKg2mE', 2, NULL, NULL),
(23, 'IL1ZsJabR4o', 2, NULL, NULL),
(24, 'MymnYf3LD18', 2, NULL, NULL),
(25, '/yoga-app/images/utthita-parsvakonasana.jpg', 1, 1, NULL),
(26, 'Jj8bSFEVXaE', 2, NULL, NULL),
(27, 'X6Es-H3oO18', 2, NULL, NULL),
(28, '_qj4VeAOPBw', 2, NULL, NULL),
(40, '/yoga-app/images/parsvottanasana-bks.jpg', 1, 1, NULL),
(41, '/yoga-app/images/virasana-iyengar-2.jpg', 1, 1, NULL),
(43, 'pPx7UvdUCI0', 2, NULL, NULL),
(44, '/yoga-app/images/Bharadvaj-I-iyengar.jpg', 1, 1, NULL),
(45, '/yoga-app/images/Bharadvaj-2.jpg', 1, 1, NULL),
(47, '8HhbnNQPwaQ', 2, NULL, NULL),
(48, '8YzXzl0VNbM', 2, NULL, NULL),
(49, 'DhtM6DnQLLM', 2, NULL, NULL),
(50, 'LyK7zmrRcwo', 2, NULL, NULL),
(52, '/yoga-app/images/adho-mukha-svanasana.jpg', 1, 1, NULL),
(53, 'Wb4F6T-Bs-U', 2, NULL, NULL),
(54, 'JAYbQ8CIKD4', 2, NULL, NULL),
(55, '/yoga-app/images/parivritta-trikonasan-bks.jpg', 1, 1, NULL),
(56, '/yoga-app/images/Ardha-chandrasana.jpg', 1, 1, NULL),
(57, 'vVPiPR7T6J4', 2, NULL, NULL),
(58, 'b0S66n3U56o', 2, NULL, NULL),
(59, 'uevvGHbbSkc', 2, NULL, NULL),
(62, 'https://cynthia-bates.squarespace.com/practice/2016/2/1/uttanasana', 3, NULL, '-1'),
(63, 'https://cynthia-bates.squarespace.com/practice/2016/1/31/adho-mukha-svanasana', 3, NULL, '-1'),
(64, 'https://cynthia-bates.squarespace.com/practice/2016/1/31/urdhva-mukha-svanasana', 3, NULL, '-1'),
(65, 'https://cynthia-bates.squarespace.com/practice/2016/1/31/virabhadrasana-i', 3, NULL, '-1'),
(66, 'https://cynthia-bates.squarespace.com/practice/2016/1/25/gmi0x26hv411cswn24nbh07t477s7q', 3, NULL, '-1'),
(71, 'BBQXoy0Hzfa', 4, NULL, '-1'),
(72, 'BBXLQ0SBXq-', 4, NULL, '-1'),
(73, 'BBaeFMZB9Wu', 4, NULL, '-1'),
(74, 'BBZcJ34n08Q', 4, NULL, '-1'),
(75, 'BBYfpjDJXVc', 4, NULL, '-1'),
(76, 'BBYX6xsGNip', 4, NULL, '-1'),
(77, 'BBXDpSiLTto', 4, NULL, '-1'),
(78, 'BBVxq93uqv3', 4, NULL, '-1'),
(79, 'BBTAscTG62-', 4, NULL, '-1'),
(80, 'BBQqSEWBpWc', 4, NULL, '-1'),
(81, 'BBQiTdqLMvV', 4, NULL, '-1'),
(82, 'BBQHzfJohJV', 4, NULL, '-1'),
(83, 'BBPqYGJMSqs', 4, NULL, '-1'),
(84, 'BBPepMuj0PA', 4, NULL, '-1'),
(85, 'BBNVRfhoP-N', 4, NULL, '-1'),
(86, 'BBNA9ZvG2Ld', 4, NULL, '-1'),
(87, 'BBM9qUIAUaD', 4, NULL, '-1'),
(88, 'BBMU-YIrTtU', 4, NULL, '-1'),
(89, 'BBJGvEGypZ1', 4, NULL, '-1'),
(90, 'BBIm5dkh3ny', 4, NULL, '-1'),
(91, 'BBH5-0GoWTR', 4, NULL, '-1'),
(92, 'BACV2fbgU0w', 4, NULL, '-1'),
(93, 'BBWkbdNFvcI', 4, NULL, '-1'),
(94, 'BBVhrSQq6Tp', 4, NULL, '-1'),
(95, '6bqF7kQ3UC', 4, NULL, '-1'),
(96, '_nDmHtjdnP', 4, NULL, '-1'),
(97, 'BBfbjg9hevu', 4, NULL, 'Press the thighs, support the abdomen '),
(98, 'BBbdfQxAiUv', 4, NULL, '-1'),
(99, 'BBfEl4ph0_M', 4, NULL, '-1'),
(100, 'BBec_iJomcv', 4, NULL, '-1'),
(101, 'BBFFykknbPf', 4, NULL, '-1'),
(102, 'BBFF3wAODh9', 4, NULL, '-1'),
(103, 'BBFS3_lQlvl', 4, NULL, '-1'),
(104, 'BBDm6MNPgIB', 4, NULL, '-1'),
(105, '/yoga-app/images/Parighasana.jpg', 1, 1, NULL),
(106, '/yoga-app/images/090-halasana-iyengar.jpg', 1, 1, NULL),
(107, 'BBELlDSnHIB', 4, NULL, '-1'),
(108, 'BBDBXQbq_Bj', 4, NULL, '-1'),
(109, 'BBDDNfeq_E5', 4, NULL, '-1'),
(110, 'BBDC6egK_EM', 4, NULL, '-1'),
(111, 'BBCRVReipJ8', 4, NULL, '-1'),
(112, 'BBBHo48NRD1', 4, NULL, '-1'),
(113, 'BA9bbA2sxns', 4, NULL, '-1'),
(114, 'BA7nUnyG6-I', 4, NULL, '-1'),
(115, 'BA7WIGtAsQT', 4, NULL, '-1'),
(116, 'BA7YA-cIPxp', 4, NULL, '-1'),
(117, 'BA4aiquBpel', 4, NULL, '-1'),
(118, 'BA1_07yhpdv', 4, NULL, '-1'),
(119, 'oI9BIRzV5yc', 2, NULL, '-1'),
(120, 'yatVhLyDOsM', 2, NULL, '-1'),
(121, 'BAkDSCnIupS', 4, NULL, '-1'),
(122, '9tv0jNgPWh4', 2, NULL, '-1'),
(123, '6VcaOvk5-uE', 2, NULL, '-1'),
(124, '_cbDRnELjn', 4, NULL, '-1'),
(125, '6qcvqBEZkQ', 4, NULL, '-1'),
(126, '5SoWxKHzQm', 4, NULL, '-1'),
(127, '5QHhU3nzei', 4, NULL, '-1'),
(128, '5GF8FjnzWb', 4, NULL, '-1'),
(129, 'BBgJV29nzZr', 4, NULL, '-1'),
(130, '78Uh7WkZn-', 4, NULL, '-1'),
(131, 'j4vAbakZgM', 4, NULL, '-1'),
(132, 'YjUqzAkZnB', 4, NULL, '-1'),
(133, 'BAhzr9kQq_P', 4, NULL, '-1');

-- --------------------------------------------------------

--
-- Table structure for table `asset_to_tag`
--

CREATE TABLE IF NOT EXISTS `asset_to_tag` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `fk_asset` int(3) NOT NULL,
  `fk_tag` int(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

--
-- Dumping data for table `asset_to_tag`
--

INSERT INTO `asset_to_tag` (`ID`, `fk_asset`, `fk_tag`) VALUES
(2, 19, 1),
(3, 21, 2),
(4, 22, 1),
(5, 23, 2),
(6, 24, 2),
(7, 26, 3),
(8, 27, 2),
(9, 28, 5),
(11, 43, 31),
(12, 43, 32),
(13, 47, 31),
(14, 47, 34),
(15, 48, 34),
(18, 49, 1),
(19, 50, 2),
(21, 53, 34),
(22, 54, 3),
(23, 54, 31),
(24, 57, 31),
(25, 57, 35),
(26, 58, 31),
(27, 59, 31),
(28, 62, 1),
(29, 63, 36),
(30, 64, 36),
(31, 65, 36),
(32, 66, 36),
(45, 71, 31),
(46, 71, 3),
(47, 71, 44),
(48, 71, 45),
(49, 72, 46),
(50, 73, 44),
(51, 73, 47),
(52, 74, 31),
(53, 74, 47),
(54, 74, 44),
(55, 74, 48),
(56, 76, 31),
(57, 77, 35),
(58, 78, 31),
(59, 80, 49),
(60, 80, 30),
(61, 81, 44),
(62, 83, 35),
(63, 85, 44),
(64, 86, 31),
(65, 88, 44),
(66, 88, 31),
(67, 88, 47),
(68, 89, 46),
(69, 91, 50),
(70, 93, 3),
(71, 94, 35),
(72, 96, 31),
(73, 97, 48),
(74, 98, 31),
(75, 98, 3),
(76, 102, 48),
(77, 102, 44),
(78, 102, 3),
(79, 103, 31),
(80, 103, 48),
(81, 104, 44),
(82, 104, 31),
(83, 107, 47),
(84, 108, 51),
(85, 109, 51),
(86, 110, 52),
(87, 111, 48),
(88, 114, 44),
(89, 114, 46),
(90, 114, 3),
(91, 116, 48),
(92, 117, 49),
(93, 117, 46),
(94, 118, 49),
(95, 118, 46),
(96, 119, 35),
(97, 122, 31),
(98, 124, 31),
(99, 125, 48),
(100, 128, 3),
(101, 129, 53),
(102, 129, 45);

-- --------------------------------------------------------

--
-- Table structure for table `asset_type`
--

CREATE TABLE IF NOT EXISTS `asset_type` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `asset_type`
--

INSERT INTO `asset_type` (`ID`, `type`) VALUES
(1, 'image'),
(2, 'video'),
(3, 'external_url'),
(4, 'instagram_post'),
(5, 'instagram_post');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(35) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `category_name`) VALUES
(1, 'standing'),
(2, 'forward bend'),
(3, 'back bend'),
(4, 'inversion');

-- --------------------------------------------------------

--
-- Table structure for table `fake`
--

CREATE TABLE IF NOT EXISTS `fake` (
  `ID` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `fake`
--

INSERT INTO `fake` (`ID`, `name`) VALUES
(1, 'jeff'),
(2, 'joe'),
(3, 'jim'),
(4, 'john'),
(5, 'jane');

-- --------------------------------------------------------

--
-- Table structure for table `poses`
--

CREATE TABLE IF NOT EXISTS `poses` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `sanskrit_name` varchar(50) DEFAULT NULL,
  `english_name` varchar(50) NOT NULL,
  `fk_category` varchar(255) NOT NULL,
  `primary_asset` int(3) NOT NULL,
  `loy_order` int(5) NOT NULL,
  `fk_tags` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `poses`
--

INSERT INTO `poses` (`ID`, `sanskrit_name`, `english_name`, `fk_category`, `primary_asset`, `loy_order`, `fk_tags`) VALUES
(6, 'Tadasana', 'Standing Morntain Pose', '[1]', 5, 1, ''),
(7, 'Uttanasana', 'Intense Stretch', '[1,2]', 6, 20, ''),
(8, 'Virabhadrasana 1', 'Warrior 1', '[1,3]', 7, 7, ''),
(9, 'Dandasana', 'Staff Pose', '[2]', 8, 35, ''),
(10, 'Trikonasana', 'Triangle', '[1,2]', 9, 3, ''),
(11, 'Utkatasana', 'Chair Pose', '[1]', 10, 17, ''),
(12, 'Salamba Sarvangasana', 'Full Body Pose', '[4]', 11, 87, ''),
(13, 'Chaturanga Dandasana', 'Four-Limbed Staff Pose', '[3]', 12, 29, ''),
(15, 'Urdva Mukha Svasana', 'Upward facing Dog', '[3]', 14, 32, ''),
(16, 'Vrksasana', 'Tree Pose', '[1]', 15, 2, ''),
(17, 'Virabhadrasana 2', 'Warrior 2', '[1]', 16, 8, ''),
(18, 'Virabhadrasana 3', 'Warrior 3', '[1]', 17, 9, ''),
(22, 'Utthita Parsvakonasana', 'Side Angle Pose', '[1]', 25, 5, ''),
(35, 'Parsvotanasana', 'Intense Side Stretch', '', 0, 12, ''),
(36, 'Virasana', 'Hero Pose', '', 0, 40, ''),
(37, 'Bharadvajasana 1', '(named after a sage)', '', 0, 112, ''),
(38, 'Bharadvajasana 2', '(named after a sage)', '', 0, 113, ''),
(39, 'Adho Mukha Svanasana', 'Downward Facing Dog', '', 0, 33, ''),
(40, 'Parivritta Trikonasana', 'Revolved Triangle Pose', '', 0, 4, ''),
(41, 'Arda Chandrasana', 'Half Moon Pose', '', 0, 10, ''),
(42, 'Parighasana', 'Gate Pose', '', 0, 14, ''),
(43, 'Halasana', 'Plow Pose', '', 0, 91, '');

-- --------------------------------------------------------

--
-- Table structure for table `posetypes`
--

CREATE TABLE IF NOT EXISTS `posetypes` (
  `ID` int(2) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `posetypes`
--

INSERT INTO `posetypes` (`ID`, `type`) VALUES
(1, 'Standing'),
(2, 'Forward Bend'),
(3, 'Back Bend'),
(4, 'Abdominal'),
(5, 'Seated'),
(6, 'Twist'),
(7, 'Inversion'),
(8, 'Restorative');

-- --------------------------------------------------------

--
-- Table structure for table `pose_to_asset`
--

CREATE TABLE IF NOT EXISTS `pose_to_asset` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `fk_pose` int(3) NOT NULL,
  `fk_asset` int(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=147 ;

--
-- Dumping data for table `pose_to_asset`
--

INSERT INTO `pose_to_asset` (`ID`, `fk_pose`, `fk_asset`) VALUES
(11, 6, 5),
(12, 7, 6),
(13, 8, 7),
(14, 9, 8),
(15, 10, 9),
(16, 11, 10),
(17, 12, 11),
(18, 13, 12),
(19, 15, 14),
(20, 16, 15),
(21, 17, 16),
(22, 18, 17),
(23, 6, 19),
(24, 6, 20),
(25, 6, 21),
(26, 8, 22),
(27, 8, 23),
(28, 17, 24),
(29, 22, 25),
(30, 8, 26),
(31, 18, 27),
(32, 17, 28),
(33, 21, 28),
(44, 35, 40),
(45, 36, 41),
(46, 35, 42),
(47, 11, 43),
(48, 37, 44),
(49, 38, 45),
(50, 37, 46),
(51, 38, 47),
(52, 37, 47),
(53, 37, 48),
(54, 22, 28),
(56, 35, 49),
(57, 10, 50),
(58, 37, 51),
(59, 39, 52),
(60, 39, 53),
(61, 7, 53),
(62, 39, 54),
(63, 40, 55),
(64, 41, 56),
(65, 7, 57),
(66, 41, 57),
(67, 40, 57),
(68, 39, 58),
(69, 15, 58),
(70, 40, 59),
(73, 7, 62),
(74, 39, 63),
(75, 15, 64),
(76, 8, 65),
(77, 9, 66),
(82, 35, 71),
(83, 7, 72),
(84, 39, 73),
(85, 7, 74),
(86, 11, 75),
(87, 12, 76),
(88, 39, 77),
(89, 7, 78),
(90, 17, 79),
(91, 10, 80),
(92, 39, 81),
(93, 39, 82),
(94, 18, 83),
(95, 7, 84),
(96, 7, 85),
(97, 15, 86),
(98, 18, 87),
(99, 7, 88),
(100, 12, 89),
(101, 41, 90),
(102, 39, 91),
(103, 41, 92),
(104, 41, 93),
(105, 41, 94),
(106, 7, 95),
(107, 17, 96),
(108, 13, 97),
(109, 8, 98),
(110, 6, 99),
(111, 6, 100),
(112, 40, 101),
(113, 40, 102),
(114, 41, 103),
(115, 7, 104),
(116, 42, 105),
(117, 43, 106),
(118, 42, 107),
(119, 40, 108),
(120, 39, 109),
(121, 15, 110),
(122, 7, 111),
(123, 10, 112),
(124, 42, 113),
(125, 39, 114),
(126, 16, 115),
(127, 42, 116),
(128, 41, 117),
(129, 12, 118),
(130, 16, 119),
(131, 16, 120),
(132, 11, 121),
(133, 40, 122),
(134, 42, 123),
(135, 6, 124),
(136, 41, 125),
(137, 12, 126),
(138, 43, 127),
(139, 15, 128),
(140, 43, 129),
(141, 36, 130),
(142, 42, 131),
(143, 16, 132),
(144, 6, 133),
(145, 35, 133),
(146, 7, 133);

-- --------------------------------------------------------

--
-- Table structure for table `pose_to_category`
--

CREATE TABLE IF NOT EXISTS `pose_to_category` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `fk_pose` int(3) NOT NULL,
  `fk_category` int(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `pose_to_category`
--

INSERT INTO `pose_to_category` (`ID`, `fk_pose`, `fk_category`) VALUES
(2, 6, 1),
(3, 7, 1),
(4, 7, 2),
(5, 8, 1),
(6, 8, 3),
(7, 9, 2),
(8, 10, 1),
(9, 10, 2),
(10, 11, 1),
(11, 13, 3),
(12, 14, 3),
(13, 15, 3),
(14, 16, 1),
(15, 17, 1),
(16, 18, 1),
(17, 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pose_to_tag`
--

CREATE TABLE IF NOT EXISTS `pose_to_tag` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `fk_pose` int(3) NOT NULL,
  `fk_tag` int(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `pose_to_tag`
--

INSERT INTO `pose_to_tag` (`ID`, `fk_pose`, `fk_tag`) VALUES
(16, 16, 23),
(17, 6, 23),
(18, 10, 23),
(19, 22, 23),
(20, 8, 23),
(21, 17, 23),
(22, 18, 23),
(23, 11, 23),
(24, 7, 23),
(25, 7, 24),
(26, 13, 25),
(27, 15, 25),
(28, 9, 26),
(29, 12, 27),
(30, 35, 23),
(31, 35, 24),
(32, 36, 26),
(33, 36, 30),
(34, 37, 26),
(35, 37, 33),
(36, 38, 26),
(37, 38, 33),
(38, 39, 23),
(39, 39, 24),
(40, 40, 23),
(41, 0, 23),
(42, 41, 23),
(43, 42, 23),
(44, 43, 27);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `tagName` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`ID`, `tagName`) VALUES
(1, 'John Schumacher'),
(2, 'Geeta Iyengar'),
(3, 'heel on-wall'),
(4, 'Dr. Rajlaxmi'),
(5, 'stick'),
(23, 'Standing'),
(24, 'Forward Bend'),
(25, 'Back Bend'),
(26, 'Seated'),
(27, 'Inversion'),
(30, 'knee health'),
(31, 'with chair'),
(32, 'Carrie Owerko'),
(33, 'Twist'),
(34, 'Lois Steinberg'),
(35, 'wall'),
(36, 'Instructional'),
(44, 'rope wall'),
(45, 'sandbags'),
(46, 'Restorative'),
(47, 'straps'),
(48, 'blocks'),
(49, 'tressle'),
(50, 'harness'),
(51, 'classic'),
(52, 'classic'),
(53, 'compression');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
