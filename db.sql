-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 06 nov. 2019 à 12:57
-- Version du serveur :  5.7.24
-- Version de PHP :  7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sbheroes`
--

-- --------------------------------------------------------

--
-- Structure de la table `capacity`
--

DROP TABLE IF EXISTS `capacity`;
CREATE TABLE IF NOT EXISTS `capacity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `power` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `capacity`
--

INSERT INTO `capacity` (`id`, `name`, `power`, `created_at`, `updated_at`) VALUES
(1, 'cut', 'slash cut', '2019-11-01', '2019-11-01');

-- --------------------------------------------------------

--
-- Structure de la table `capacity_heroes_hero`
--

DROP TABLE IF EXISTS `capacity_heroes_hero`;
CREATE TABLE IF NOT EXISTS `capacity_heroes_hero` (
  `capacityId` int(11) NOT NULL,
  `heroId` int(11) NOT NULL,
  PRIMARY KEY (`capacityId`,`heroId`),
  KEY `IDX_465b7b9970dde2c82d49506198` (`capacityId`),
  KEY `IDX_5493d58ff7a9cd910ddc51a768` (`heroId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `capacity_monsters_monster`
--

DROP TABLE IF EXISTS `capacity_monsters_monster`;
CREATE TABLE IF NOT EXISTS `capacity_monsters_monster` (
  `capacityId` int(11) NOT NULL,
  `monsterId` int(11) NOT NULL,
  PRIMARY KEY (`capacityId`,`monsterId`),
  KEY `IDX_fe0d0571bc466f855a4456eadf` (`capacityId`),
  KEY `IDX_ae04b9164c3b2f5fbcf3a11624` (`monsterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `club`
--

DROP TABLE IF EXISTS `club`;
CREATE TABLE IF NOT EXISTS `club` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `score_team` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `friend_relation`
--

DROP TABLE IF EXISTS `friend_relation`;
CREATE TABLE IF NOT EXISTS `friend_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `friend_relation_user_id_1_user`
--

DROP TABLE IF EXISTS `friend_relation_user_id_1_user`;
CREATE TABLE IF NOT EXISTS `friend_relation_user_id_1_user` (
  `friendRelationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`friendRelationId`,`userId`),
  KEY `IDX_de6b756f97249a0bd9993ef133` (`friendRelationId`),
  KEY `IDX_774b38aada017a77d81daf27b0` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `friend_relation_user_id_2_user`
--

DROP TABLE IF EXISTS `friend_relation_user_id_2_user`;
CREATE TABLE IF NOT EXISTS `friend_relation_user_id_2_user` (
  `friendRelationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`friendRelationId`,`userId`),
  KEY `IDX_5468b60fba7e0e0d27a667ca12` (`friendRelationId`),
  KEY `IDX_0cb00c2e8ccf6375cd73224e93` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `game_monster_monster`
--

DROP TABLE IF EXISTS `game_monster_monster`;
CREATE TABLE IF NOT EXISTS `game_monster_monster` (
  `gameId` int(11) NOT NULL,
  `monsterId` int(11) NOT NULL,
  PRIMARY KEY (`gameId`,`monsterId`),
  KEY `IDX_3ade279d82d00669fceef8ccd8` (`gameId`),
  KEY `IDX_1c5a7148fe596c658be7cd7f88` (`monsterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `game_user_user`
--

DROP TABLE IF EXISTS `game_user_user`;
CREATE TABLE IF NOT EXISTS `game_user_user` (
  `gameId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`gameId`,`userId`),
  KEY `IDX_1d620d9b8654838cdbc3e9614e` (`gameId`),
  KEY `IDX_db3e5d9815300ab01df5af9287` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `hero`
--

DROP TABLE IF EXISTS `hero`;
CREATE TABLE IF NOT EXISTS `hero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `hero`
--

INSERT INTO `hero` (`id`, `name`, `created_at`, `updated_at`, `img`) VALUES
(3, 'Luigi', '2019-11-07', '2019-11-15', 'assets/img/heroes/Luigi.png'),
(4, 'PacMan', '2019-11-07', '2019-11-21', 'assets/img/heroes/PacMan.png'),
(5, 'Peach', '2019-11-15', '2019-11-09', 'assets/img/heroes/Peach.png'),
(6, 'Pikachu', '2019-11-14', '2019-11-21', 'assets/img/heroes/Pikachu.png'),
(7, 'Plant', '2019-11-07', '2019-11-15', 'assets/img/heroes/Plant.png'),
(8, 'Sonic', '2019-11-21', '2019-11-06', 'assets/img/heroes/Sonic.png'),
(9, 'Squirtle', '2019-11-14', '2019-11-14', 'assets/img/heroes/Squirtle.png');

-- --------------------------------------------------------

--
-- Structure de la table `monster`
--

DROP TABLE IF EXISTS `monster`;
CREATE TABLE IF NOT EXISTS `monster` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `hp` int(11) NOT NULL,
  `background` varchar(25) NOT NULL,
  `speed` int(11) NOT NULL,
  `time_min` int(11) NOT NULL,
  `time_max` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `sprites` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `monster`
--

INSERT INTO `monster` (`id`, `name`, `hp`, `background`, `speed`, `time_min`, `time_max`, `created_at`, `updated_at`, `sprites`) VALUES
(1, 'Koopa Troopa', 100, '1', 1, 1000, 5000, '2019-11-06', '2019-11-14', '`{\"width\":40,\"height\":40,\"moving\":{\"y\":0,\"xMin\":2,\"xMax\":3},\"attacking\":{\"y\":0,\"xMin\":1,\"xMax\":1}}`'),
(2, 'Super Koopa', 100, '1', 1, 1000, 5000, '2019-11-07', '2019-11-07', '`{\"width\":40,\"height\":40,\"moving\":{\"y\":1,\"xMin\":8,\"xMax\":9},\"attacking\":{\"y\":1,\"xMin\":7,\"xMax\":7}}`'),
(3, 'Galoomba', 100, '1', 1, 1000, 5000, '2019-11-06', '2019-11-14', '`{\"width\":40,\"height\":40,\"moving\":{\"y\":1,\"xMin\":8,\"xMax\":9},\"attacking\":{\"y\":1,\"xMin\":7,\"xMax\":7}}`'),
(4, 'Boo', 100, '1', 1, 1000, 5000, '2019-11-07', '2019-11-21', '`{\"width\":25,\"height\":40,\"moving\":{\"y\":20,\"xMin\":0,\"xMax\":1},\"attacking\":{\"y\":20,\"xMin\":2,\"xMax\":3}}`');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) NOT NULL,
  `nickname` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `gold` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `clubId` int(11) DEFAULT NULL,
  `heroId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9bf449f75aa016d6fcf8230f159` (`clubId`),
  KEY `FK_2b13150f04ffbf3a6e4f3a59525` (`heroId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `nickname`, `password`, `gold`, `created_at`, `updated_at`, `clubId`, `heroId`) VALUES
(1, 'player1@email.com', 'player1', 'password', 100, '2019-11-14', '2019-11-14', NULL, 3),
(2, 'player2@email.com', 'player2', 'password', 100, '2019-11-06', '2019-11-14', NULL, 3);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `capacity_heroes_hero`
--
ALTER TABLE `capacity_heroes_hero`
  ADD CONSTRAINT `FK_465b7b9970dde2c82d495061980` FOREIGN KEY (`capacityId`) REFERENCES `capacity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5493d58ff7a9cd910ddc51a768a` FOREIGN KEY (`heroId`) REFERENCES `hero` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `capacity_monsters_monster`
--
ALTER TABLE `capacity_monsters_monster`
  ADD CONSTRAINT `FK_ae04b9164c3b2f5fbcf3a11624c` FOREIGN KEY (`monsterId`) REFERENCES `monster` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fe0d0571bc466f855a4456eadfb` FOREIGN KEY (`capacityId`) REFERENCES `capacity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `friend_relation_user_id_1_user`
--
ALTER TABLE `friend_relation_user_id_1_user`
  ADD CONSTRAINT `FK_774b38aada017a77d81daf27b02` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_de6b756f97249a0bd9993ef1334` FOREIGN KEY (`friendRelationId`) REFERENCES `friend_relation` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `friend_relation_user_id_2_user`
--
ALTER TABLE `friend_relation_user_id_2_user`
  ADD CONSTRAINT `FK_0cb00c2e8ccf6375cd73224e936` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5468b60fba7e0e0d27a667ca129` FOREIGN KEY (`friendRelationId`) REFERENCES `friend_relation` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `game_monster_monster`
--
ALTER TABLE `game_monster_monster`
  ADD CONSTRAINT `FK_1c5a7148fe596c658be7cd7f88f` FOREIGN KEY (`monsterId`) REFERENCES `monster` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3ade279d82d00669fceef8ccd89` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `game_user_user`
--
ALTER TABLE `game_user_user`
  ADD CONSTRAINT `FK_1d620d9b8654838cdbc3e9614e8` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_db3e5d9815300ab01df5af9287a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_2b13150f04ffbf3a6e4f3a59525` FOREIGN KEY (`heroId`) REFERENCES `hero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9bf449f75aa016d6fcf8230f159` FOREIGN KEY (`clubId`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
