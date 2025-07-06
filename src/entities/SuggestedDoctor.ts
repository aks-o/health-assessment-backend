import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('suggested_doctors')
export class SuggestedDoctor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  subSpecialty!: string;

  @Column()
  city!: string;

  @Column()
  area!: string;

  @Column({ nullable: true })
  contact!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  reason!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: false })
  reviewed!: boolean;
} 