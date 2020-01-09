import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitationColumn1578576920879 implements MigrationInterface {
    name = 'AddInvitationColumn1578576920879'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `hero` DROP COLUMN `sprites`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `hero` ADD `sprites` varchar(255) NOT NULL", undefined);
    }

}
