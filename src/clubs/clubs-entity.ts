import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  score_team: number;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;
}
