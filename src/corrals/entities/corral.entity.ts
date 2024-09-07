import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Corral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
}
