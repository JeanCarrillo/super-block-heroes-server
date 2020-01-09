import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInvitationColumn1578498060181 implements MigrationInterface {
  name = 'AddInvitationColumn1578498060181';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `user` ADD `invitations` text NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `hero` DROP COLUMN `sprites`',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `user` DROP COLUMN `invitations`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `hero` ADD `sprites` varchar(255) NOT NULL',
      undefined,
    );
  }
}
