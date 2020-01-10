import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixFuckingFriends1578647451891 implements MigrationInterface {
  name = 'fixFuckingFriends1578647451891';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `user` ADD `friends` text NOT NULL',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `user` DROP COLUMN `friends`',
      undefined,
    );
  }
}
