
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25}) 
    name:string;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}