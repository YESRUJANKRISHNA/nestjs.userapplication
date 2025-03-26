import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
 
    @Column({ unique: true })
    mobileno: string;
 
    @Column({ unique: true, nullable: false })
    username: string;
 
    @Column()
    password: string;
}
 