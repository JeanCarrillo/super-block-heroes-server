import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  // CreateDateColumn,
  // UpdateDateColumn,
  // BeforeInsert,
} from 'typeorm';
import { Club } from '../clubs/clubs-entity';
import { Hero } from '../heroes/heroes-entity';
// import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, unique: false })
  email: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  nickname: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int', default: 0 })
  gold: number;

  // @Column({ default: null, nullable: true })
  @ManyToOne(type => Club)
  club: Club;

  // @Column({ default: 1, nullable: false })
  // TODO: ajouter la valeur par défaut d'un héro
  @ManyToOne(type => Hero)
  hero: Hero;
}

// @CreateDateColumn({
//   name: 'created_at',
//   default: () => `now()`,
//   nullable: false,
// })
// createdAt: Date;

// @UpdateDateColumn({
//   name: 'updated_at',
//   default: () => `now()`,
//   nullable: false,
// })
// updatedAt: Date;
