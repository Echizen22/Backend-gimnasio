import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { JwtPayload } from './interfaces/jwt-payload';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginResponse, User } from './interfaces/login-response';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponse> {

    const { dni, password } = loginAuthDto;
    
    const usuario = await this.usuarioService.findOne(dni);

    if( !usuario ) 
      throw new UnauthorizedException('Dni incorrecto');

    if( !bcrypt.compareSync( password, usuario.password ) )
      throw new UnauthorizedException('Contraseña incorrecta');

    if ( usuario.estado === 'B' ) {
      throw new UnauthorizedException('Lo sentimos, pero no puedes iniciar sesión en este momento. Parece que tu cuenta en My Gym está actualmente inactiva.');
    }

    const { password:_ , ...rest} = usuario.toJSON();

    


    return {
      user: rest as User,
      token: this.getJwtToken({ id: usuario._id }),
    };
  }

  async register( registerUserDto: RegisterUserDto ): Promise<LoginResponse> {

    const user = await this.usuarioService.create( registerUserDto );

    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  getJwtToken(payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  findAll() {
    return this.usuarioService.findAll();
  }

  async findUserById( id: string ) {
    const user = await this.usuarioService.findOne( id );
    const { password, ...rest } = user.toJSON();
    return rest;
  }
}
