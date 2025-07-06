import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  specialty!: string; // e.g., "General Medicine", "Ayurvedic", "Homeopathy"

  @Column()
  type!: string; // "allopathic", "ayurvedic", "homeopathic"

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  city!: string;
}