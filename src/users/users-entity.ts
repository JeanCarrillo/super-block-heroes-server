import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Club } from '../clubs/clubs-entity';
import { Hero } from '../heroes/heroes-entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: false, default: '' })
  email: string;

  @Column({ length: 25, unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  gold: number;

  // @Column({ default: null, nullable: true })
  @ManyToOne(type => Club)
  club: Club;

  // @Column({ default: 1, nullable: false })
  // TODO: ajouter la valeur par défaut d'un héro
  @ManyToOne(type => Hero)
  hero: Hero;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
