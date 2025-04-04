import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { retry } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }


  async deleteUser(id:number):Promise<boolean>{

    const res:DeleteResult= await this.userRepository.delete(id);
    return(res.affected||0)>0;

  }

  async edit(id:number,edited: boolean) : Promise<string>{

const editing=await this.userRepository.findOne({ where: {id}});
if(!editing){
  throw new NotFoundException(`user${id}is not found.`);
}
Object.assign(editing,edited);
editing.edited=true;
await this.userRepository.save(editing);
return `employee ${id} is succesfuly edited`;
  }
async submitUser(id:number,submitted:boolean) : Promise<string>{
const submit = await this.userRepository.findOne({where:{id}});
if(!submit){
  throw new NotFoundException(`user${id} is not found`);

}
submit.submited=true;
await this.userRepository.save(submit);
return `user ${id} is succesfully submitted.`;
}

async verifyUser(id:number, verified:boolean):Promise<string>{
  const verifie= await this.userRepository.findOne({where:{id}})
  if(!verifie){
    throw new NotFoundException(`user${id} is not found`)
  }
  verifie.verifid=true;
  await this.userRepository.update(id,verifie);
  return `user ${id} is succesfully verified.`;
}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
