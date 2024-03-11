import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidV4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { Expose } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { DbType, db } from 'src/types';

@Injectable()
export class UserService {
  private db: DbType = db;

  create(dto: CreateUserDto) {
    const id = uuidV4();
    const dateNow = Date.now();
    const newUser = {
      ...dto,
      id,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    };

    this.db.users[id] = { ...newUser };
    return newUser;
  }

  updatePassword(id: string, dto: UpdateUserDto) {
    if (this.db.users[id] === undefined) {
      throw new NotFoundException("record with this ID doesn't exist");
    } else {
      if (this.db.users[id].password === dto.oldPassword) {
        const newUser: UserEntity = {
          ...this.db.users[id],
          updatedAt: Date.now(),
          version: this.db.users[id].version + 1,
          password: dto.newPassword,
        };
        this.db.users[id] = { ...newUser };
        return newUser;
      } else {
        throw new ForbiddenException('old password is wrong');
      }
    }
  }
  @Expose()
  findAll() {
    return Object.values(this.db.users);
  }

  findOne(id: string) {
    if (this.db.users[id] === undefined) {
      throw new NotFoundException('user not found');
    }

    return this.db.users[id];
  }

  remove(id: string) {
    if (this.db.users[id] === undefined)
      throw new NotFoundException('user not found');

    delete this.db.users[id];
    return true;
  }
}
