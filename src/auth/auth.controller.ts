import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services';
import { LoginDto, RegisterDto } from './dto';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  register(@Body() dto: RegisterDto) {
    this.authService.register(dto).then(() => {
      return '/login';
    });
  }

  @Post('/login')
  login(@Body() dto: LoginDto, @User() user: UserEntity) {
    return this.authService.login(dto, user);
  }
}
