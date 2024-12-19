import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validar que el correo no esté en uso
    await this.validateUserEmail(createUserDto.email);

    // Crear y guardar el usuario
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }


  private async validateUserEmail(email: string): Promise<void> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('This email is already in use!');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({
        message: `User with ID ${id} not found!`,
        error: 'Not Found',
      });
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async remove(id: string) {
    const userToRemove = await this.findOne(id);
    return await this.userRepository.remove(userToRemove);
  }
}
