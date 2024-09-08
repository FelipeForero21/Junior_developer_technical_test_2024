import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Animal } from 'src/animals/entities/animal.entity';

@Entity()
export class Corral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column({ default: false })
  isHighRisk: boolean;

  @OneToMany(() => Animal, (animal) => animal.corral)
  animals: Animal[];
}
