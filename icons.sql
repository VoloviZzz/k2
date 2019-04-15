-- MySQL dump 10.15  Distrib 10.0.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: m1client
-- ------------------------------------------------------
-- Server version	10.0.34-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `font_awesome`
--

DROP TABLE IF EXISTS `font_awesome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `font_awesome` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=676 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `font_awesome`
--

LOCK TABLES `font_awesome` WRITE;
/*!40000 ALTER TABLE `font_awesome` DISABLE KEYS */;
INSERT INTO `font_awesome` VALUES (1,'fa-glass'),(2,'fa-music'),(3,'fa-search'),(4,'fa-envelope-o'),(5,'fa-heart'),(6,'fa-star'),(7,'fa-star-o'),(8,'fa-user'),(9,'fa-film'),(10,'fa-th-large'),(11,'fa-th'),(12,'fa-th-list'),(13,'fa-check'),(14,'fa-times'),(15,'fa-search-plus'),(16,'fa-search-minus'),(17,'fa-power-off'),(18,'fa-signal'),(19,'fa-cog'),(20,'fa-trash-o'),(21,'fa-home'),(22,'fa-file-o'),(23,'fa-clock-o'),(24,'fa-road'),(25,'fa-download'),(26,'fa-arrow-circle-o-down'),(27,'fa-arrow-circle-o-up'),(28,'fa-inbox'),(29,'fa-play-circle-o'),(30,'fa-repeat'),(31,'fa-refresh'),(32,'fa-list-alt'),(33,'fa-lock'),(34,'fa-flag'),(35,'fa-headphones'),(36,'fa-volume-off'),(37,'fa-volume-down'),(38,'fa-volume-up'),(39,'fa-qrcode'),(40,'fa-barcode'),(41,'fa-tag'),(42,'fa-tags'),(43,'fa-book'),(44,'fa-bookmark'),(45,'fa-print'),(46,'fa-camera'),(47,'fa-font'),(48,'fa-bold'),(49,'fa-italic'),(50,'fa-text-height'),(51,'fa-text-width'),(52,'fa-align-left'),(53,'fa-align-center'),(54,'fa-align-right'),(55,'fa-align-justify'),(56,'fa-list'),(57,'fa-outdent'),(58,'fa-indent'),(59,'fa-video-camera'),(60,'fa-picture-o'),(61,'fa-pencil'),(62,'fa-map-marker'),(63,'fa-adjust'),(64,'fa-tint'),(65,'fa-pencil-square-o'),(66,'fa-share-square-o'),(67,'fa-check-square-o'),(68,'fa-arrows'),(69,'fa-step-backward'),(70,'fa-fast-backward'),(71,'fa-backward'),(72,'fa-play'),(73,'fa-pause'),(74,'fa-stop'),(75,'fa-forward'),(76,'fa-fast-forward'),(77,'fa-step-forward'),(78,'fa-eject'),(79,'fa-chevron-left'),(80,'fa-chevron-right'),(81,'fa-plus-circle'),(82,'fa-minus-circle'),(83,'fa-times-circle'),(84,'fa-check-circle'),(85,'fa-question-circle'),(86,'fa-info-circle'),(87,'fa-crosshairs'),(88,'fa-times-circle-o'),(89,'fa-check-circle-o'),(90,'fa-ban'),(91,'fa-arrow-left'),(92,'fa-arrow-right'),(93,'fa-arrow-up'),(94,'fa-arrow-down'),(95,'fa-share'),(96,'fa-expand'),(97,'fa-compress'),(98,'fa-plus'),(99,'fa-minus'),(100,'fa-asterisk'),(101,'fa-exclamation-circle'),(102,'fa-gift'),(103,'fa-leaf'),(104,'fa-fire'),(105,'fa-eye'),(106,'fa-eye-slash'),(107,'fa-exclamation-triangle'),(108,'fa-plane'),(109,'fa-calendar'),(110,'fa-random'),(111,'fa-comment'),(112,'fa-magnet'),(113,'fa-chevron-up'),(114,'fa-chevron-down'),(115,'fa-retweet'),(116,'fa-shopping-cart'),(117,'fa-folder'),(118,'fa-folder-open'),(119,'fa-arrows-v'),(120,'fa-arrows-h'),(121,'fa-bar-chart'),(122,'fa-twitter-square'),(123,'fa-facebook-square'),(124,'fa-camera-retro'),(125,'fa-key'),(126,'fa-cogs'),(127,'fa-comments'),(128,'fa-thumbs-o-up'),(129,'fa-thumbs-o-down'),(130,'fa-star-half'),(131,'fa-heart-o'),(132,'fa-sign-out'),(133,'fa-linkedin-square'),(134,'fa-thumb-tack'),(135,'fa-external-link'),(136,'fa-sign-in'),(137,'fa-trophy'),(138,'fa-github-square'),(139,'fa-upload'),(140,'fa-lemon-o'),(141,'fa-phone'),(142,'fa-square-o'),(143,'fa-bookmark-o'),(144,'fa-phone-square'),(145,'fa-twitter'),(146,'fa-facebook'),(147,'fa-github'),(148,'fa-unlock'),(149,'fa-credit-card'),(150,'fa-rss'),(151,'fa-hdd-o'),(152,'fa-bullhorn'),(153,'fa-bell'),(154,'fa-certificate'),(155,'fa-hand-o-right'),(156,'fa-hand-o-left'),(157,'fa-hand-o-up'),(158,'fa-hand-o-down'),(159,'fa-arrow-circle-left'),(160,'fa-arrow-circle-right'),(161,'fa-arrow-circle-up'),(162,'fa-arrow-circle-down'),(163,'fa-globe'),(164,'fa-wrench'),(165,'fa-tasks'),(166,'fa-filter'),(167,'fa-briefcase'),(168,'fa-arrows-alt'),(169,'fa-users'),(170,'fa-link'),(171,'fa-cloud'),(172,'fa-flask'),(173,'fa-scissors'),(174,'fa-files-o'),(175,'fa-paperclip'),(176,'fa-floppy-o'),(177,'fa-square'),(178,'fa-bars'),(179,'fa-list-ul'),(180,'fa-list-ol'),(181,'fa-strikethrough'),(182,'fa-underline'),(183,'fa-table'),(184,'fa-magic'),(185,'fa-truck'),(186,'fa-pinterest'),(187,'fa-pinterest-square'),(188,'fa-google-plus-square'),(189,'fa-google-plus'),(190,'fa-money'),(191,'fa-caret-down'),(192,'fa-caret-up'),(193,'fa-caret-left'),(194,'fa-caret-right'),(195,'fa-columns'),(196,'fa-sort'),(197,'fa-sort-desc'),(198,'fa-sort-asc'),(199,'fa-envelope'),(200,'fa-linkedin'),(201,'fa-undo'),(202,'fa-gavel'),(203,'fa-tachometer'),(204,'fa-comment-o'),(205,'fa-comments-o'),(206,'fa-bolt'),(207,'fa-sitemap'),(208,'fa-umbrella'),(209,'fa-clipboard'),(210,'fa-lightbulb-o'),(211,'fa-exchange'),(212,'fa-cloud-download'),(213,'fa-cloud-upload'),(214,'fa-user-md'),(215,'fa-stethoscope'),(216,'fa-suitcase'),(217,'fa-bell-o'),(218,'fa-coffee'),(219,'fa-cutlery'),(220,'fa-file-text-o'),(221,'fa-building-o'),(222,'fa-hospital-o'),(223,'fa-ambulance'),(224,'fa-medkit'),(225,'fa-fighter-jet'),(226,'fa-beer'),(227,'fa-h-square'),(228,'fa-plus-square'),(229,'fa-angle-double-left'),(230,'fa-angle-double-right'),(231,'fa-angle-double-up'),(232,'fa-angle-double-down'),(233,'fa-angle-left'),(234,'fa-angle-right'),(235,'fa-angle-up'),(236,'fa-angle-down'),(237,'fa-desktop'),(238,'fa-laptop'),(239,'fa-tablet'),(240,'fa-mobile'),(241,'fa-circle-o'),(242,'fa-quote-left'),(243,'fa-quote-right'),(244,'fa-spinner'),(245,'fa-circle'),(246,'fa-reply'),(247,'fa-github-alt'),(248,'fa-folder-o'),(249,'fa-folder-open-o'),(250,'fa-smile-o'),(251,'fa-frown-o'),(252,'fa-meh-o'),(253,'fa-gamepad'),(254,'fa-keyboard-o'),(255,'fa-flag-o'),(256,'fa-flag-checkered'),(257,'fa-terminal'),(258,'fa-code'),(259,'fa-reply-all'),(260,'fa-star-half-o'),(261,'fa-location-arrow'),(262,'fa-crop'),(263,'fa-code-fork'),(264,'fa-chain-broken'),(265,'fa-question'),(266,'fa-info'),(267,'fa-exclamation'),(268,'fa-superscript'),(269,'fa-subscript'),(270,'fa-eraser'),(271,'fa-puzzle-piece'),(272,'fa-microphone'),(273,'fa-microphone-slash'),(274,'fa-shield'),(275,'fa-calendar-o'),(276,'fa-fire-extinguisher'),(277,'fa-rocket'),(278,'fa-maxcdn'),(279,'fa-chevron-circle-left'),(280,'fa-chevron-circle-right'),(281,'fa-chevron-circle-up'),(282,'fa-chevron-circle-down'),(283,'fa-html5'),(284,'fa-css3'),(285,'fa-anchor'),(286,'fa-unlock-alt'),(287,'fa-bullseye'),(288,'fa-ellipsis-h'),(289,'fa-ellipsis-v'),(290,'fa-rss-square'),(291,'fa-play-circle'),(292,'fa-ticket'),(293,'fa-minus-square'),(294,'fa-minus-square-o'),(295,'fa-level-up'),(296,'fa-level-down'),(297,'fa-check-square'),(298,'fa-pencil-square'),(299,'fa-external-link-square'),(300,'fa-share-square'),(301,'fa-compass'),(302,'fa-caret-square-o-down'),(303,'fa-caret-square-o-up'),(304,'fa-caret-square-o-right'),(305,'fa-eur'),(306,'fa-gbp'),(307,'fa-usd'),(308,'fa-inr'),(309,'fa-jpy'),(310,'fa-rub'),(311,'fa-krw'),(312,'fa-btc'),(313,'fa-file'),(314,'fa-file-text'),(315,'fa-sort-alpha-asc'),(316,'fa-sort-alpha-desc'),(317,'fa-sort-amount-asc'),(318,'fa-sort-amount-desc'),(319,'fa-sort-numeric-asc'),(320,'fa-sort-numeric-desc'),(321,'fa-thumbs-up'),(322,'fa-thumbs-down'),(323,'fa-youtube-square'),(324,'fa-youtube'),(325,'fa-xing'),(326,'fa-xing-square'),(327,'fa-youtube-play'),(328,'fa-dropbox'),(329,'fa-stack-overflow'),(330,'fa-instagram'),(331,'fa-flickr'),(332,'fa-adn'),(333,'fa-bitbucket'),(334,'fa-bitbucket-square'),(335,'fa-tumblr'),(336,'fa-tumblr-square'),(337,'fa-long-arrow-down'),(338,'fa-long-arrow-up'),(339,'fa-long-arrow-left'),(340,'fa-long-arrow-right'),(341,'fa-apple'),(342,'fa-windows'),(343,'fa-android'),(344,'fa-linux'),(345,'fa-dribbble'),(346,'fa-skype'),(347,'fa-foursquare'),(348,'fa-trello'),(349,'fa-female'),(350,'fa-male'),(351,'fa-gratipay'),(352,'fa-sun-o'),(353,'fa-moon-o'),(354,'fa-archive'),(355,'fa-bug'),(356,'fa-vk'),(357,'fa-weibo'),(358,'fa-renren'),(359,'fa-pagelines'),(360,'fa-stack-exchange'),(361,'fa-arrow-circle-o-right'),(362,'fa-arrow-circle-o-left'),(363,'fa-caret-square-o-left'),(364,'fa-dot-circle-o'),(365,'fa-wheelchair'),(366,'fa-vimeo-square'),(367,'fa-try'),(368,'fa-plus-square-o'),(369,'fa-space-shuttle'),(370,'fa-slack'),(371,'fa-envelope-square'),(372,'fa-wordpress'),(373,'fa-openid'),(374,'fa-university'),(375,'fa-graduation-cap'),(376,'fa-yahoo'),(377,'fa-google'),(378,'fa-reddit'),(379,'fa-reddit-square'),(380,'fa-stumbleupon-circle'),(381,'fa-stumbleupon'),(382,'fa-delicious'),(383,'fa-digg'),(384,'fa-pied-piper-pp'),(385,'fa-pied-piper-alt'),(386,'fa-drupal'),(387,'fa-joomla'),(388,'fa-language'),(389,'fa-fax'),(390,'fa-building'),(391,'fa-child'),(392,'fa-paw'),(393,'fa-spoon'),(394,'fa-cube'),(395,'fa-cubes'),(396,'fa-behance'),(397,'fa-behance-square'),(398,'fa-steam'),(399,'fa-steam-square'),(400,'fa-recycle'),(401,'fa-car'),(402,'fa-taxi'),(403,'fa-tree'),(404,'fa-spotify'),(405,'fa-deviantart'),(406,'fa-soundcloud'),(407,'fa-database'),(408,'fa-file-pdf-o'),(409,'fa-file-word-o'),(410,'fa-file-excel-o'),(411,'fa-file-powerpoint-o'),(412,'fa-file-image-o'),(413,'fa-file-archive-o'),(414,'fa-file-audio-o'),(415,'fa-file-video-o'),(416,'fa-file-code-o'),(417,'fa-vine'),(418,'fa-codepen'),(419,'fa-jsfiddle'),(420,'fa-life-ring'),(421,'fa-circle-o-notch'),(422,'fa-rebel'),(423,'fa-empire'),(424,'fa-git-square'),(425,'fa-git'),(426,'fa-hacker-news'),(427,'fa-tencent-weibo'),(428,'fa-qq'),(429,'fa-weixin'),(430,'fa-paper-plane'),(431,'fa-paper-plane-o'),(432,'fa-history'),(433,'fa-circle-thin'),(434,'fa-header'),(435,'fa-paragraph'),(436,'fa-sliders'),(437,'fa-share-alt'),(438,'fa-share-alt-square'),(439,'fa-bomb'),(440,'fa-futbol-o'),(441,'fa-tty'),(442,'fa-binoculars'),(443,'fa-plug'),(444,'fa-slideshare'),(445,'fa-twitch'),(446,'fa-yelp'),(447,'fa-newspaper-o'),(448,'fa-wifi'),(449,'fa-calculator'),(450,'fa-paypal'),(451,'fa-google-wallet'),(452,'fa-cc-visa'),(453,'fa-cc-mastercard'),(454,'fa-cc-discover'),(455,'fa-cc-amex'),(456,'fa-cc-paypal'),(457,'fa-cc-stripe'),(458,'fa-bell-slash'),(459,'fa-bell-slash-o'),(460,'fa-trash'),(461,'fa-copyright'),(462,'fa-at'),(463,'fa-eyedropper'),(464,'fa-paint-brush'),(465,'fa-birthday-cake'),(466,'fa-area-chart'),(467,'fa-pie-chart'),(468,'fa-line-chart'),(469,'fa-lastfm'),(470,'fa-lastfm-square'),(471,'fa-toggle-off'),(472,'fa-toggle-on'),(473,'fa-bicycle'),(474,'fa-bus'),(475,'fa-ioxhost'),(476,'fa-angellist'),(477,'fa-cc'),(478,'fa-ils'),(479,'fa-meanpath'),(480,'fa-buysellads'),(481,'fa-connectdevelop'),(482,'fa-dashcube'),(483,'fa-forumbee'),(484,'fa-leanpub'),(485,'fa-sellsy'),(486,'fa-shirtsinbulk'),(487,'fa-simplybuilt'),(488,'fa-skyatlas'),(489,'fa-cart-plus'),(490,'fa-cart-arrow-down'),(491,'fa-diamond'),(492,'fa-ship'),(493,'fa-user-secret'),(494,'fa-motorcycle'),(495,'fa-street-view'),(496,'fa-heartbeat'),(497,'fa-venus'),(498,'fa-mars'),(499,'fa-mercury'),(500,'fa-transgender'),(501,'fa-transgender-alt'),(502,'fa-venus-double'),(503,'fa-mars-double'),(504,'fa-venus-mars'),(505,'fa-mars-stroke'),(506,'fa-mars-stroke-v'),(507,'fa-mars-stroke-h'),(508,'fa-neuter'),(509,'fa-genderless'),(510,'fa-facebook-official'),(511,'fa-pinterest-p'),(512,'fa-whatsapp'),(513,'fa-server'),(514,'fa-user-plus'),(515,'fa-user-times'),(516,'fa-bed'),(517,'fa-viacoin'),(518,'fa-train'),(519,'fa-subway'),(520,'fa-medium'),(521,'fa-y-combinator'),(522,'fa-optin-monster'),(523,'fa-opencart'),(524,'fa-expeditedssl'),(525,'fa-battery-full'),(526,'fa-battery-three-quarters'),(527,'fa-battery-half'),(528,'fa-battery-quarter'),(529,'fa-battery-empty'),(530,'fa-mouse-pointer'),(531,'fa-i-cursor'),(532,'fa-object-group'),(533,'fa-object-ungroup'),(534,'fa-sticky-note'),(535,'fa-sticky-note-o'),(536,'fa-cc-jcb'),(537,'fa-cc-diners-club'),(538,'fa-clone'),(539,'fa-balance-scale'),(540,'fa-hourglass-o'),(541,'fa-hourglass-start'),(542,'fa-hourglass-half'),(543,'fa-hourglass-end'),(544,'fa-hourglass'),(545,'fa-hand-rock-o'),(546,'fa-hand-paper-o'),(547,'fa-hand-scissors-o'),(548,'fa-hand-lizard-o'),(549,'fa-hand-spock-o'),(550,'fa-hand-pointer-o'),(551,'fa-hand-peace-o'),(552,'fa-trademark'),(553,'fa-registered'),(554,'fa-creative-commons'),(555,'fa-gg'),(556,'fa-gg-circle'),(557,'fa-tripadvisor'),(558,'fa-odnoklassniki'),(559,'fa-odnoklassniki-square'),(560,'fa-get-pocket'),(561,'fa-wikipedia-w'),(562,'fa-safari'),(563,'fa-chrome'),(564,'fa-firefox'),(565,'fa-opera'),(566,'fa-internet-explorer'),(567,'fa-television'),(568,'fa-contao'),(569,'fa-500px'),(570,'fa-amazon'),(571,'fa-calendar-plus-o'),(572,'fa-calendar-minus-o'),(573,'fa-calendar-times-o'),(574,'fa-calendar-check-o'),(575,'fa-industry'),(576,'fa-map-pin'),(577,'fa-map-signs'),(578,'fa-map-o'),(579,'fa-map'),(580,'fa-commenting'),(581,'fa-commenting-o'),(582,'fa-houzz'),(583,'fa-vimeo'),(584,'fa-black-tie'),(585,'fa-fonticons'),(586,'fa-reddit-alien'),(587,'fa-edge'),(588,'fa-credit-card-alt'),(589,'fa-codiepie'),(590,'fa-modx'),(591,'fa-fort-awesome'),(592,'fa-usb'),(593,'fa-product-hunt'),(594,'fa-mixcloud'),(595,'fa-scribd'),(596,'fa-pause-circle'),(597,'fa-pause-circle-o'),(598,'fa-stop-circle'),(599,'fa-stop-circle-o'),(600,'fa-shopping-bag'),(601,'fa-shopping-basket'),(602,'fa-hashtag'),(603,'fa-bluetooth'),(604,'fa-bluetooth-b'),(605,'fa-percent'),(606,'fa-gitlab'),(607,'fa-wpbeginner'),(608,'fa-wpforms'),(609,'fa-envira'),(610,'fa-universal-access'),(611,'fa-wheelchair-alt'),(612,'fa-question-circle-o'),(613,'fa-blind'),(614,'fa-audio-description'),(615,'fa-volume-control-phone'),(616,'fa-braille'),(617,'fa-assistive-listening-systems'),(618,'fa-american-sign-language-interpreting'),(619,'fa-deaf'),(620,'fa-glide'),(621,'fa-glide-g'),(622,'fa-sign-language'),(623,'fa-low-vision'),(624,'fa-viadeo'),(625,'fa-viadeo-square'),(626,'fa-snapchat'),(627,'fa-snapchat-ghost'),(628,'fa-snapchat-square'),(629,'fa-pied-piper'),(630,'fa-first-order'),(631,'fa-yoast'),(632,'fa-themeisle'),(633,'fa-google-plus-official'),(634,'fa-font-awesome'),(635,'fa-handshake-o'),(636,'fa-envelope-open'),(637,'fa-envelope-open-o'),(638,'fa-linode'),(639,'fa-address-book'),(640,'fa-address-book-o'),(641,'fa-address-card'),(642,'fa-address-card-o'),(643,'fa-user-circle'),(644,'fa-user-circle-o'),(645,'fa-user-o'),(646,'fa-id-badge'),(647,'fa-id-card'),(648,'fa-id-card-o'),(649,'fa-quora'),(650,'fa-free-code-camp'),(651,'fa-telegram'),(652,'fa-thermometer-full'),(653,'fa-thermometer-three-quarters'),(654,'fa-thermometer-half'),(655,'fa-thermometer-quarter'),(656,'fa-thermometer-empty'),(657,'fa-shower'),(658,'fa-bath'),(659,'fa-podcast'),(660,'fa-window-maximize'),(661,'fa-window-minimize'),(662,'fa-window-restore'),(663,'fa-window-close'),(664,'fa-window-close-o'),(665,'fa-bandcamp'),(666,'fa-grav'),(667,'fa-etsy'),(668,'fa-imdb'),(669,'fa-ravelry'),(670,'fa-eercast'),(671,'fa-microchip'),(672,'fa-snowflake-o'),(673,'fa-superpowers'),(674,'fa-wpexplorer'),(675,'fa-meetup');
/*!40000 ALTER TABLE `font_awesome` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-17  4:56:20
