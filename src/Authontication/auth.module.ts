import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.contoller';
import { UserModule } from 'src/User/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
 
@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: 'your_secret_key', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
 