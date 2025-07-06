import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string; // e.g., Bangalore, Bhopal

  @Column({ nullable: true })
  state!: string; // e.g., Karnataka, Madhya Pradesh
} 