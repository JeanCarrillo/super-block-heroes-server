
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Hero } from 'src/heroes/heroes-entity';
import { Monster } from 'src/monster/monsters-entity';

@Entity()
export class Capacity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Hero)
    @JoinTable()
    heroes: Hero[];

    @ManyToMany(type => Monster)
    @JoinTable()
    monsters: Monster[];

    @Column({length: 25}) 
    name:string;

    @Column()
    power:string;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}