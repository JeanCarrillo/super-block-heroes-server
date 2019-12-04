import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/users-entity';
import { Monster } from '../monster/monsters-entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @ManyToMany(type => User)
  @JoinTable()
  user: User[];

  @ManyToMany(type => Monster)
  @JoinTable()
  monster: Monster[];

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;
}
