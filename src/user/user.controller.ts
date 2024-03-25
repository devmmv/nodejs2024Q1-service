import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    const user: any = await this.userService.create(dto);
    user.createdAt = Number(user.createdAt);
    user.updatedAt = Number(user.updatedAt);

    return new UserEntity(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users: unknown[] = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserEntity> {
    const user: unknown = await this.userService.findOne(id);
    return new UserEntity(user);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user: any = await this.userService.updatePassword(id, dto);
    user.createdAt = Number(user.createdAt);
    user.updatedAt = Number(user.updatedAt);
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.userService.remove(id);
  }
}
