import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  qualification: string;

  @Column()
  position: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  edited: boolean;

  @Column({ default: false })
  submitted: boolean;

  @Column({ nullable: true }) 
  filePath: string; 
}
