import {MigrationInterface, QueryRunner} from "typeorm";

export class fixFuckingFriends1578647451891 implements MigrationInterface {
    name = 'fixFuckingFriends1578647451891'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `friend_relation` DROP FOREIGN KEY `FK_a626ff01a97b712525e2b3c0fce`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation` DROP COLUMN `userId`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `friends` text NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `friends`", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation` ADD `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `friend_relation` ADD CONSTRAINT `FK_a626ff01a97b712525e2b3c0fce` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
