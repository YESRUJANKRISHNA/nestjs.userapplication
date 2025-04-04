
import { Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user-dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body()userdata: Partial<User>): Promise<User> {
    return this.userService.createUser(userdata);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

@Patch(":id/edit")
async edit(@Param('id') id:number,@Body() edited:boolean): Promise<string>{

  return this.userService.edit(id,edited);

}

@Delete(":id")
async deletedata(@Param('id') id:number): Promise<boolean>{

  return this.userService.deleteUser(id);
}

@Patch(":id/verify")
async verifydata(@Param('id')id:number,@Body() verified:boolean): Promise<string> {
return this.userService.verifyUser(id,verified);
}
@Patch(":id/submit")
async submitdata(@Param('id')id:number,@Body() submitted:boolean):Promise<string>{
return this.userService.submitUser(id,submitted);
}
}
