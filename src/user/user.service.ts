import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidV4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { Expose } from 'class-transformer';
import * as fs from 'fs';
import * as path from 'path';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private db: UserEntity[];
  dbPath = '../../DB/userData.json';

  constructor() {
    fs.promises
      .readFile(path.join(__dirname, this.dbPath), 'utf-8')
      .then((data) => {
        this.db = JSON.parse(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private saveDb() {
    fs.promises.writeFile(
      path.join(__dirname, this.dbPath),
      JSON.stringify(this.db),
    );
  }

  create(dto: CreateUserDto) {
    const dateNow = Date.now();
    const newUser = {
      ...dto,
      id: uuidV4(),
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    };

    this.db.push(newUser);
    this.saveDb();
    return newUser;
  }

  updatePassword(id: string, dto: UpdateUserDto) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException("record with this ID doesn't exist");
    } else {
      if (this.db[userIndex].password === dto.oldPassword) {
        const newUser: UserEntity = {
          ...this.db[userIndex],
          updatedAt: Date.now(),
          version: this.db[userIndex].version + 1,
          password: dto.newPassword,
        };
        this.db[userIndex] = newUser;
        this.saveDb();
        return newUser;
      } else {
        throw new ForbiddenException('old password is wrong');
      }
    }
  }
  @Expose()
  findAll() {
    return this.db;
  }

  findOne(id: string) {
    const user = this.db.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  remove(id: string) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException('user not found');
    this.db.splice(userIndex, 1);
    this.saveDb();
    return true;
  }
}
