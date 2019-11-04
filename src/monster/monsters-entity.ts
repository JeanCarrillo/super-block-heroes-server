
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25}) 
    name:string;

    @Column()
    pv:number;

    @Column({length: 25}) 
    background:string;

    @Column()
    speed:number;

    @Column()
    timeMin:number;

    @Column()
    timeMax:number;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}