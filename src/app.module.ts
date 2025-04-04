import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Authontication/auth.module';
import { UserModule } from './User/user.module';
import { User } from './User/user.entity';
import { EmployeeModule } from './Employee/employee.module';
import { Employee } from './Employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Srujan@632002',
      database: 'employee',
      entities: [User,Employee],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    EmployeeModule
  ],
})
export class AppModule {}
