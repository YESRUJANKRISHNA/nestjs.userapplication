
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';
import { CreateUserDto } from 'src/User/create-user-dto';
import { LoginDto } from './login.auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/User/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authdata: CreateUserDto): Promise<any> {
    console.log('Received authdata:', authdata);

    const hashedPassword = await bcrypt.hash(authdata.password, 10);
   return this.userService.createUser({ ...authdata, password: hashedPassword });
  

  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
    }
    if(user.role!==loginDto.role){
      throw new UnauthorizedException("Invalid credentials");
    }

const payload = { id: user.id, email: user.email, role: user.role };
const access_token = this.jwtService.sign(payload);   
return {
message: 'Login successful',
access_token,  
user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
