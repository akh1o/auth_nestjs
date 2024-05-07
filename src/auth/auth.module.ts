import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
