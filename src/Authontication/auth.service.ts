import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';
import { CreateUserDto } from 'src/User/create-user-dto';
import { LoginDto } from './login.auth.dto';
import * as bcrypt from 'bcrypt';
 
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
 
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
 
    const token = this.jwtService.sign({  email: user.email,password: user.password });
    return { token, user };
  }
 
  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
 
    const token = this.jwtService.sign({ email: user.email,password: user.password});
    return { token, user };
  }
}
 
 