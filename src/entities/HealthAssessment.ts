import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; // Import the User entity

@Entity('health_assessments') // Specifies the table name in the database
export class HealthAssessment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string; // Foreign key column

    @ManyToOne(() => User, user => user.assessments, { onDelete: 'CASCADE' }) // Define the relationship
    @JoinColumn({ name: 'userId' }) // Specify the foreign key column name
    user!: User; // Property to access the related User object

    @Column('int')
    rating!: number; // e.g., a rating from 1 to 5

    @Column({ type: 'text', nullable: true }) // Allow null values for notes
    notes?: string; // Optional notes

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}