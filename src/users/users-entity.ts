
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Club } from 'src/clubs/clubs-entity';
import { Hero } from 'src/heroes/heroes-entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25}) 
    email:string;

    @Column({ length: 25 })
    nickname:string;

    @Column({length: 25}) 
    password:string;

    @Column()
    gold:number;

    @ManyToOne(type => Club)
    club: Club;

    @ManyToOne(type => Hero)
    hero: Hero;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}