import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  patientId!: string;

  @Column('json')
  medicalData!: object;

  @Column()
  documentType!: string;

  @Column()
  documentPath!: string;

  @Column('timestamp')
  uploadDate!: Date;

  @Column('json')
  analysisResults!: object;
}