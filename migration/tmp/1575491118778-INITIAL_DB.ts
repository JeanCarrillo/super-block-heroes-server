import {MigrationInterface, QueryRunner} from "typeorm";

export class INITIALDB1575491118778 implements MigrationInterface {
    name = 'INITIALDB1575491118778'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `hero` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `sprites` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `monster` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `hp` int NOT NULL, `background` varchar(25) NOT NULL, `speed` int NOT NULL, `sprites` varchar(225) NOT NULL, `time_min` int NOT NULL, `time_max` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `capacity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `description` varchar(255) NOT NULL, `cooldown` int NOT NULL, `duration` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `club` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `score_team` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(25) NOT NULL, `nickname` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `gold` int NOT NULL DEFAULT 0, `clubId` int NULL, `heroId` int NULL, UNIQUE INDEX `IDX_e2364281027b926b879fa2fa1e` (`nickname`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `friend_relation` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `created_at` date NOT NULL, `updated_at` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `capacity_heroes_hero` (`capacityId` int NOT NULL, `heroId` int NOT NULL, INDEX `IDX_465b7b9970dde2c82d49506198` (`capacityId`), INDEX `IDX_5493d58ff7a9cd910ddc51a768` (`heroId`), PRIMARY KEY (`capacityId`, `heroId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `capacity_monsters_monster` (`capacityId` int NOT NULL, `monsterId` int NOT NULL, INDEX `IDX_fe0d0571bc466f855a4456eadf` (`capacityId`), INDEX `IDX_ae04b9164c3b2f5fbcf3a11624` (`monsterId`), PRIMARY KEY (`capacityId`, `monsterId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `friend_relation_user_id_1_user` (`friendRelationId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_de6b756f97249a0bd9993ef133` (`friendRelationId`), INDEX `IDX_774b38aada017a77d81daf27b0` (`userId`), PRIMARY KEY (`friendRelationId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `friend_relation_user_id_2_user` (`friendRelationId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_5468b60fba7e0e0d27a667ca12` (`friendRelationId`), INDEX `IDX_0cb00c2e8ccf6375cd73224e93` (`userId`), PRIMARY KEY (`friendRelationId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game_user_user` (`gameId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_1d620d9b8654838cdbc3e9614e` (`gameId`), INDEX `IDX_db3e5d9815300ab01df5af9287` (`userId`), PRIMARY KEY (`gameId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game_monster_monster` (`gameId` int NOT NULL, `monsterId` int NOT NULL, INDEX `IDX_3ade279d82d00669fceef8ccd8` (`gameId`), INDEX `IDX_1c5a7148fe596c658be7cd7f88` (`monsterId`), PRIMARY KEY (`gameId`, `monsterId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_9bf449f75aa016d6fcf8230f159` FOREIGN KEY (`clubId`) REFERENCES `club`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_2b13150f04ffbf3a6e4f3a59525` FOREIGN KEY (`heroId`) REFERENCES `hero`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `capacity_heroes_hero` ADD CONSTRAINT `FK_465b7b9970dde2c82d495061980` FOREIGN KEY (`capacityId`) REFERENCES `capacity`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `capacity_heroes_hero` ADD CONSTRAINT `FK_5493d58ff7a9cd910ddc51a768a` FOREIGN KEY (`heroId`) REFERENCES `hero`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `capacity_monsters_monster` ADD CONSTRAINT `FK_fe0d0571bc466f855a4456eadfb` FOREIGN KEY (`capacityId`) REFERENCES `capacity`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `capacity_monsters_monster` ADD CONSTRAINT `FK_ae04b9164c3b2f5fbcf3a11624c` FOREIGN KEY (`monsterId`) REFERENCES `monster`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_1_user` ADD CONSTRAINT `FK_de6b756f97249a0bd9993ef1334` FOREIGN KEY (`friendRelationId`) REFERENCES `friend_relation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_1_user` ADD CONSTRAINT `FK_774b38aada017a77d81daf27b02` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_2_user` ADD CONSTRAINT `FK_5468b60fba7e0e0d27a667ca129` FOREIGN KEY (`friendRelationId`) REFERENCES `friend_relation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_2_user` ADD CONSTRAINT `FK_0cb00c2e8ccf6375cd73224e936` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_user_user` ADD CONSTRAINT `FK_1d620d9b8654838cdbc3e9614e8` FOREIGN KEY (`gameId`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_user_user` ADD CONSTRAINT `FK_db3e5d9815300ab01df5af9287a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_monster_monster` ADD CONSTRAINT `FK_3ade279d82d00669fceef8ccd89` FOREIGN KEY (`gameId`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_monster_monster` ADD CONSTRAINT `FK_1c5a7148fe596c658be7cd7f88f` FOREIGN KEY (`monsterId`) REFERENCES `monster`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `game_monster_monster` DROP FOREIGN KEY `FK_1c5a7148fe596c658be7cd7f88f`", undefined);
        await queryRunner.query("ALTER TABLE `game_monster_monster` DROP FOREIGN KEY `FK_3ade279d82d00669fceef8ccd89`", undefined);
        await queryRunner.query("ALTER TABLE `game_user_user` DROP FOREIGN KEY `FK_db3e5d9815300ab01df5af9287a`", undefined);
        await queryRunner.query("ALTER TABLE `game_user_user` DROP FOREIGN KEY `FK_1d620d9b8654838cdbc3e9614e8`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_2_user` DROP FOREIGN KEY `FK_0cb00c2e8ccf6375cd73224e936`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_2_user` DROP FOREIGN KEY `FK_5468b60fba7e0e0d27a667ca129`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_1_user` DROP FOREIGN KEY `FK_774b38aada017a77d81daf27b02`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation_user_id_1_user` DROP FOREIGN KEY `FK_de6b756f97249a0bd9993ef1334`", undefined);
        await queryRunner.query("ALTER TABLE `capacity_monsters_monster` DROP FOREIGN KEY `FK_ae04b9164c3b2f5fbcf3a11624c`", undefined);
        await queryRunner.query("ALTER TABLE `capacity_monsters_monster` DROP FOREIGN KEY `FK_fe0d0571bc466f855a4456eadfb`", undefined);
        await queryRunner.query("ALTER TABLE `capacity_heroes_hero` DROP FOREIGN KEY `FK_5493d58ff7a9cd910ddc51a768a`", undefined);
        await queryRunner.query("ALTER TABLE `capacity_heroes_hero` DROP FOREIGN KEY `FK_465b7b9970dde2c82d495061980`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_2b13150f04ffbf3a6e4f3a59525`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_9bf449f75aa016d6fcf8230f159`", undefined);
        await queryRunner.query("DROP INDEX `IDX_1c5a7148fe596c658be7cd7f88` ON `game_monster_monster`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3ade279d82d00669fceef8ccd8` ON `game_monster_monster`", undefined);
        await queryRunner.query("DROP TABLE `game_monster_monster`", undefined);
        await queryRunner.query("DROP INDEX `IDX_db3e5d9815300ab01df5af9287` ON `game_user_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_1d620d9b8654838cdbc3e9614e` ON `game_user_user`", undefined);
        await queryRunner.query("DROP TABLE `game_user_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_0cb00c2e8ccf6375cd73224e93` ON `friend_relation_user_id_2_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5468b60fba7e0e0d27a667ca12` ON `friend_relation_user_id_2_user`", undefined);
        await queryRunner.query("DROP TABLE `friend_relation_user_id_2_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_774b38aada017a77d81daf27b0` ON `friend_relation_user_id_1_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_de6b756f97249a0bd9993ef133` ON `friend_relation_user_id_1_user`", undefined);
        await queryRunner.query("DROP TABLE `friend_relation_user_id_1_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ae04b9164c3b2f5fbcf3a11624` ON `capacity_monsters_monster`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe0d0571bc466f855a4456eadf` ON `capacity_monsters_monster`", undefined);
        await queryRunner.query("DROP TABLE `capacity_monsters_monster`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5493d58ff7a9cd910ddc51a768` ON `capacity_heroes_hero`", undefined);
        await queryRunner.query("DROP INDEX `IDX_465b7b9970dde2c82d49506198` ON `capacity_heroes_hero`", undefined);
        await queryRunner.query("DROP TABLE `capacity_heroes_hero`", undefined);
        await queryRunner.query("DROP TABLE `game`", undefined);
        await queryRunner.query("DROP TABLE `friend_relation`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e2364281027b926b879fa2fa1e` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `club`", undefined);
        await queryRunner.query("DROP TABLE `capacity`", undefined);
        await queryRunner.query("DROP TABLE `monster`", undefined);
        await queryRunner.query("DROP TABLE `hero`", undefined);
    }

}
