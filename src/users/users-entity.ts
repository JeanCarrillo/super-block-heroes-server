
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25}) 
    email:string;

    @Column({ length: 25 })
    pseudo:string;

    @Column({length: 25}) 
    password:string;

    @Column()
    gold:number;

    // reference club class
    @Column()
    club_id:number;

    // reference hereos class
    @Column()
    heroes_id:number;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}