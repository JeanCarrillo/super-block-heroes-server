import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  hp: number;

  @Column({ length: 25 })
  background: string;

  @Column()
  speed: number;

  @Column({ length: 225 })
  sprites: string;

  @Column()
  time_min: number;

  @Column()
  time_max: number;

  // @Column('date')
  // created_at: Date;

  // @Column('date')
  // updated_at: Date;
}
