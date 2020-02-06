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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToMany(type => Capacity, { cascade: true })
  @JoinTable({
    name: 'hero_capacities_capacity',
    joinColumn: { name: 'hero_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'capacity_id', referencedColumnName: 'id' },
  })
  capacity: Capacity;
  // @Column('date')
  // created_at: Date;

  // @Column('date')
  // updated_at: Date;
}
