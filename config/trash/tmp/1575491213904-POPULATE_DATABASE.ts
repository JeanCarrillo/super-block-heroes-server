import { MigrationInterface, QueryRunner } from 'typeorm';

export class POPULATEDATABASE1575491213904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            INSERT INTO monster 
                (id, name, hp, background, speed, sprites, time_min, time_max)
            VALUES
                (1, 'Big Bob', 100, '1', 1, '{"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":119},"GetHit":{"start":120,"end":139},"Death":{"start":140,"end":199},"total":199,"paddingBottom":68.87}', 1000, 5000),
                (2, 'Snail Rider', 200, '2', 1, '{"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":59},"GetHit":{"start":60,"end":79},"Death":{"start":80,"end":109},"total":109,"paddingBottom":100}', 1000, 5000),
                (3, 'Sorceror', 300, '3', 1, '{"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":109},"GetHit":{"start":110,"end":129},"Death":{"start":130,"end":164},"total":164,"paddingBottom":100}', 1000, 5000),
                (4, 'Specter', 400, '4', 1, '{"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":74},"GetHit":{"start":75,"end":94},"Death":{"start":95,"end":133},"total":133,"paddingBottom":100}', 1000, 5000);
        `);

    await queryRunner.query(`
            INSERT INTO capacity
                (id, name, description, cooldown, duration)
            VALUES
                (1, "Taunt", "Lures the monster towards the Warrior, during that time he doesn't attack other players", 30000, 0),
                (2, "Frost Blast", "Freezes the monster for 2 seconds", 20000, 2000),
                (3, "Shuriken Fury", "The Ninja can attack the monster from anywhere during 10 seconds", 30000, 10000),
                (4, "Gold Rush", "All players gain +100% gold during 10 seconds", 60000, 10000),
                (5, "Monk's Blessing", "Removes 2 lines from the most in danger player", 20000, 0),
                (6, "Holy Blocks", "The Holy 'I' piece appears for the player currently facing the monster", 30000, 0),
                (7, "King's Grace", "Resets the capacity cooldown of the player currently facing the monster", 5000, 2000);
        `);

    await queryRunner.query(`
            INSERT INTO hero 
                (id, name, sprites)
            VALUES
                (1, 'Warrior', '{"Idle":17}'),
                (2, 'Mage', '{"Idle":17}'),
                (3, 'Ninja', '{"Idle":17}'),
                (4, 'Pirate', '{"Idle":17}'),
                (5, 'Monk', '{"Idle":17}'),
                (6, 'Paladin', '{"Idle":17}'),
                (7, 'King', '{"Idle":17}');
        `);

    await queryRunner.query(`
            INSERT INTO user
                (id, email, nickname, password, gold, clubId, heroId)
            VALUES
                (1, "player1@email.com", "player1", "password", 100, NULL, 3),
                (2, "player2@email.com", "player2", "password", 100, NULL, 3);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
