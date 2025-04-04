import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/User/create-user-dto';
import { LoginDto } from './login.auth.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { User } from 'src/User/user.entity';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body()authdata: CreateUserDto) {
  return this.authService.register(authdata);
  }
  

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
