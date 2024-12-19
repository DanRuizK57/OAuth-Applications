import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    const user = await this.userService.create(createUserDto);
    return {
      'message': 'User created successfully',
      user
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    const deletedUser = await this.userService.remove(id);
    return {
      'message': 'User deleted successfully',
      'user': deletedUser
    }
  }
}
