import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { UsersService } from '../../users/services/users.service';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(dto: RegisterDto) {
    await this.userService.create(dto);
  }

  // TODO: Token
  async login(dto: LoginDto, user: UserEntity) {
    const userExists = await this.userService.isUserExistsByUsername(
      dto.username,
    );
    if (!userExists) {
      throw new BadRequestException('Username or Password is not correct');
    }

    const passwordCorrect = await compare(dto.password, user.password);
    if (!passwordCorrect) {
      throw new BadRequestException('Username or Password is not correct');
    }

    return true;
  }
}
