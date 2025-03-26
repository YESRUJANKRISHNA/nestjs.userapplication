import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/User/create-user-dto';
import { LoginDto } from './login.auth.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
 
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { token, user } = await this.authService.register(createUserDto);
    return { message: 'User registered successfully', token, user };
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
 