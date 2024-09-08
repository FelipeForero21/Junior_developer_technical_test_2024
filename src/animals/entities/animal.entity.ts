import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Corral } from 'src/corrals/entities/corral.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  isHighRisk?: boolean;

  @ManyToOne(() => Corral, (corral) => corral.animals)
  corral: Corral;

  @ManyToMany(() => Animal, { nullable: true })
  @JoinTable()
  restrictedAnimals: Animal[];
}
