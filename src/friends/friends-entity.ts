
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../users/users-entity';

@Entity()
export class FriendRelation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => User)
    @JoinTable()
    user_id_1: User[];

    @ManyToMany(type => User)
    @JoinTable()
    user_id_2: User[];
}
