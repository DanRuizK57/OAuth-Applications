import { Controller, Post, Res, Request, Get, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('google/callback')
  async callback(@Body() createUserDto: CreateUserDto , @Res() res: Response) {
    try {

      const authResponse = await this.authService.authenticateWithGoogle(createUserDto);

      // Devolver el objeto AuthResponseDto con los datos del usuario y el token JWT
      return res.status(200).json(authResponse);

    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error instanceof BadRequestException) {
        return res.status(error.getStatus()).json({
          message: error.message,
        });
      }

      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }

}
