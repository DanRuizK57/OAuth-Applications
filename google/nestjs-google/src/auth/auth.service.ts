import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/authResponse.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }
  
  async authenticateWithGoogle(googleUser: CreateUserDto): Promise<AuthResponseDto> {
    // const googleUser = await this.getUserByToken(accessToken);

    // Usamos el UserService para buscar o crear al usuario
    let databaseUser = await this.userService.findByEmail(googleUser.email);
    if (!databaseUser) {
      databaseUser = await this.userService.create(googleUser);
    }

    // Generamos el JWT
    const jwtToken: string = await this.generateToken(databaseUser);

    const authResponseDto: AuthResponseDto = {
      user: databaseUser,
      token: jwtToken
    }

    return authResponseDto;
  }
  
  async generateToken(user: User): Promise<string> {
    const payload: PayloadDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
      
    return this.jwtService.sign(payload);
  }
  
}
