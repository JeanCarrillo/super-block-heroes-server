
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Club } from 'src/clubs/clubs-entity';

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

    // reference club class
    @ManyToOne(type => Club)
    club: Club;

    // reference hereos class
    @Column()
    heroes_id:number;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}