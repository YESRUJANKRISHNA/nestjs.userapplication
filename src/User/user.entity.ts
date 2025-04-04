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
  mobile: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  password: string;

  @Column()
  salary:string;

  @Column()
  role: string;

  @Column({default:false})
  edited:boolean;

  @Column({default:false})
  verifid:boolean;
  
  @Column({default:false})
  submited:boolean;
}
