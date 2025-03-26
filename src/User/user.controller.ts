import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user-dto';
import { User } from './user.entity';
 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    const user = await this.userService.create(createUserDto);
    return { message: 'User registered successfully', user };
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
}
 