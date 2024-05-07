import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(model: Omit<UserEntity, 'isAdmin' | 'id'>) {
    const isExistsByEmail = await this.isUserExistsByUsername(model.email);
    const isExistsByUsername = await this.isUserExistsByUsername(
      model.username,
    );

    if (isExistsByEmail) {
      throw new ConflictException(
        `User with this email: ${model.email} already exists.`,
      );
    } else if (isExistsByUsername) {
      throw new ConflictException(
        `User with this username: ${model.username} already exists.`,
      );
    }

    return this.userRepository.save({
      ...model,
      password: await hash(model.password, 16),
    });
  }

  async isUserExistsByEmail(email: string) {
    return this.userRepository.exists({ where: { email } });
  }

  async isUserExistsByUsername(username: string) {
    return this.userRepository.exists({ where: { username } });
  }
}
