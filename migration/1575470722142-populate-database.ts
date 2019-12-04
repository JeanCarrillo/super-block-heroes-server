import {MigrationInterface, QueryRunner} from "typeorm";

export class populateDatabase1575469877599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(`
            INSERT INTO monster 
                (id, name, hp, background, speed, sprites, time_min, time_max, created_at, updated_at)
            VALUES
                (1, 'Big Bob', 100, '1', 1, '{"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":119},"GetHit":{"start":120,"end":139},"Death":{"start":140,"end":199},"total":199,"paddingBottom":68.87}', 1000, 5000, '2019-11-06', '2019-11-14'),
                (2, 'Snail Rider', 200, '2', 1, '{"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":59},"GetHit":{"start":60,"end":79},"Death":{"start":80,"end":109},"total":109,"paddingBottom":100}', 1000, 5000, '2019-11-07', '2019-11-07'),
                (3, 'Sorceror', 300, '3', 1, '{"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":109},"GetHit":{"start":110,"end":129},"Death":{"start":130,"end":164},"total":164,"paddingBottom":100}', 1000, 5000, '2019-11-06', '2019-11-14'),
                (4, 'Specter', 400, '4', 1, '{"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":74},"GetHit":{"start":75,"end":94},"Death":{"start":95,"end":133},"total":133,"paddingBottom":100}', 1000, 5000, '2019-11-07', '2019-11-21');
        `);

        await queryRunner.query(`
            INSERT INTO capacity
                (id, name, description, cooldown, duration, created_at, updated_at)
            VALUES
                (1, "cut", "slash cut", 5000, 2000, "2019-11-01", "2019-11-01");
        `);

        await queryRunner.query(`
            INSERT INTO hero 
                (id, name, sprites, created_at, updated_at)
            VALUES
                (1, 'Warrior', '{"Idle":17}', '2019-11-07', '2019-11-15'),
                (2, 'Mage', '{"Idle":17}', '2019-11-07', '2019-11-15'),
                (3, 'Ninja', '{"Idle":17}', '2019-11-07', '2019-11-15'),
                (4, 'Pirate', '{"Idle":17}', '2019-11-07', '2019-11-15'),
                (5, 'Satyr', '{"Idle":17}', '2019-11-07', '2019-11-15'),
                (6, 'King', '{"Idle":17}', '2019-11-07', '2019-11-15');
        `);

        await queryRunner.query(`
            INSERT INTO user
                (id, email, nickname, password, gold, clubId, heroId, created_at, updated_at)
            VALUES
                (1, "player1@email.com", "player1", "password", 100, NULL, 3, "2019-11-14", "2019-11-14"),
                (2, "player2@email.com", "player2", "password", 100, NULL, 3, "2019-11-06", "2019-11-14");
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
