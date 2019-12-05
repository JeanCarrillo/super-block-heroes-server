import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Capacity } from 'src/capacities/capacities-entity';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 255 })
  sprites: string;

  @ManyToMany(type => Capacity, { cascade: true })
  @JoinTable({
    name: 'hero_capacities_capacity',
    joinColumn: { name: 'hero_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'capacity_id', referencedColumnName: 'id' },
  })
  capacities: Capacity[];
  // @Column('date')
  // created_at: Date;

  // @Column('date')
  // updated_at: Date;
}
