import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { HealthAssessment } from './HealthAssessment'; // Import HealthAssessment

@Entity('users') // Specifies the table name in the database
export class User {
  @PrimaryGeneratedColumn('uuid') // Defines the primary key as a UUID
  id!: string;

  @Column({ unique: true }) // Defines an email column, must be unique
  email!: string;

  @Column() // Defines the column to store the hashed password
  passwordHash!: string;

  @Column({ nullable: true }) // Defines an optional first name column
  firstName?: string;

  @Column({ nullable: true }) // Defines an optional last name column
  lastName?: string;

  @CreateDateColumn() // Automatically sets the date when the user is created
  createdAt!: Date;

  @UpdateDateColumn() // Automatically sets the date when the user is updated
  updatedAt!: Date;

  // Add the relationship to HealthAssessment
  @OneToMany(() => HealthAssessment, assessment => assessment.user)
  assessments!: HealthAssessment[]; // An array to hold related assessments
}